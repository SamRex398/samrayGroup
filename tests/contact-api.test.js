import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createContactServer } from "../server.js";

const origin = "https://www.samraygroup.com";
const validEnquiry = {
  name: "Ada Obi",
  organization: "Example Ltd",
  email: "ada@example.com",
  interest: "Energy",
  message: "I would like to discuss a project.",
  website: "",
};

const servers = new Set();

afterEach(async () => {
  await Promise.all([...servers].map((server) => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  })));
  servers.clear();
});

async function startApi({ fetchImpl, env = {} } = {}) {
  const server = createContactServer({
    env: {
      RESEND_API_KEY: "test-key",
      CONTACT_TO_EMAIL: "as@samraygroup.com,info@samraygroup.com",
      CONTACT_FROM_EMAIL: "Samray Website <website@samraygroup.com>",
      ALLOWED_ORIGINS: origin,
      ...env,
    },
    fetchImpl: fetchImpl || (async () => new Response(null, { status: 200 })),
    logger: { error() {} },
  });
  servers.add(server);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return `http://127.0.0.1:${server.address().port}`;
}

async function postEnquiry(baseUrl, payload = validEnquiry, headers = {}) {
  return fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

test("delivers a valid enquiry to Resend with reply-to and no browser secret", async () => {
  let resendRequest;
  const baseUrl = await startApi({
    fetchImpl: async (url, options) => {
      resendRequest = { url, options };
      return new Response(null, { status: 200 });
    },
  });

  const response = await postEnquiry(baseUrl);
  const mail = JSON.parse(resendRequest.options.body);

  assert.equal(response.status, 202);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
  assert.equal(resendRequest.url, "https://api.resend.com/emails");
  assert.equal(resendRequest.options.headers.Authorization, "Bearer test-key");
  assert.deepEqual(mail.to, ["as@samraygroup.com", "info@samraygroup.com"]);
  assert.equal(mail.reply_to, validEnquiry.email);
  assert.match(mail.text, /I would like to discuss a project\./);
  assert.equal(mail.website, undefined);
});

test("rejects invalid enquiry data without calling Resend", async () => {
  let called = false;
  const baseUrl = await startApi({
    fetchImpl: async () => {
      called = true;
      return new Response(null, { status: 200 });
    },
  });

  const response = await postEnquiry(baseUrl, { ...validEnquiry, interest: "Unexpected" });

  assert.equal(response.status, 400);
  assert.equal(called, false);
});

test("accepts the honeypot response without sending email", async () => {
  let called = false;
  const baseUrl = await startApi({
    fetchImpl: async () => {
      called = true;
      return new Response(null, { status: 200 });
    },
  });

  const response = await postEnquiry(baseUrl, { ...validEnquiry, website: "bot filled this" });

  assert.equal(response.status, 202);
  assert.equal(called, false);
});

test("rejects origins outside the configured website origins", async () => {
  let called = false;
  const baseUrl = await startApi({ fetchImpl: async () => { called = true; } });

  const response = await postEnquiry(baseUrl, validEnquiry, { Origin: "https://attacker.example" });

  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test("rate limits repeated enquiries from the same client", async () => {
  let delivered = 0;
  const baseUrl = await startApi({
    fetchImpl: async () => {
      delivered += 1;
      return new Response(null, { status: 200 });
    },
  });

  const responses = [];
  for (let index = 0; index < 6; index += 1) {
    responses.push(await postEnquiry(baseUrl));
  }

  assert.deepEqual(responses.map((response) => response.status), [202, 202, 202, 202, 202, 429]);
  assert.equal(delivered, 5);
});

test("reports provider failures without claiming the enquiry was sent", async () => {
  const baseUrl = await startApi({
    fetchImpl: async () => new Response(null, { status: 401 }),
  });

  const response = await postEnquiry(baseUrl);

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    error: "We could not send your enquiry right now. Please try again later.",
  });
});
