import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const CONTACT_PATH = "/api/contact";
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ALLOWED_INTERESTS = new Set([
  "General enquiry",
  "Energy",
  "Project information",
  "Project finance",
  "Technical partnership",
  "Partnership",
  "Power purchase",
  "Technical services",
  "Agriculture",
  "Sports",
  "Careers",
  "Other",
]);

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function getAllowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isValidEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidSender(value) {
  if (/[\r\n]/.test(value)) return false;
  const formatted = /^(?:[^<>]*\s)?<([^<>\s@]+@[^<>\s@]+)>$/.exec(value);
  return isValidEmail(formatted ? formatted[1] : value);
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { error: "Submit a valid enquiry." };
  }

  const fields = ["name", "organization", "email", "interest", "message", "website"];
  if (fields.some((field) => typeof payload[field] !== "string")) {
    return { error: "Complete all required fields." };
  }

  const enquiry = Object.fromEntries(
    fields.map((field) => [field, payload[field].trim()])
  );
  const controls = /[\u0000-\u001F\u007F]/;
  if (
    !enquiry.name ||
    enquiry.name.length > 120 ||
    controls.test(enquiry.name) ||
    !enquiry.organization ||
    enquiry.organization.length > 160 ||
    controls.test(enquiry.organization) ||
    !isValidEmail(enquiry.email) ||
    controls.test(enquiry.email) ||
    !ALLOWED_INTERESTS.has(enquiry.interest) ||
    controls.test(enquiry.interest) ||
    !enquiry.message ||
    enquiry.message.length > 5000 ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(enquiry.message) ||
    enquiry.website.length > 200
  ) {
    return { error: "Check your enquiry details and try again." };
  }

  return { enquiry };
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Request body is too large.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function getClientKey(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim().slice(0, 80);
  }
  return request.socket.remoteAddress || "unknown";
}

export function createContactServer({
  env = process.env,
  fetchImpl = fetch,
  clock = Date.now,
  logger = console,
} = {}) {
  const attempts = new Map();

  return createServer(async (request, response) => {
    const headers = { "Referrer-Policy": "no-referrer" };
    let url;
    try {
      url = new URL(request.url, "http://localhost");
    } catch {
      sendJson(response, 400, { error: "Invalid request." }, headers);
      return;
    }

    if (url.pathname === "/health" && request.method === "GET") {
      sendJson(response, 200, { ok: true }, headers);
      return;
    }
    if (url.pathname !== CONTACT_PATH) {
      sendJson(response, 404, { error: "Not found." }, headers);
      return;
    }

    const allowedOrigins = getAllowedOrigins(env);
    const origin = request.headers.origin;
    if (origin && !allowedOrigins.includes(origin)) {
      sendJson(response, 403, { error: "This website is not allowed to submit enquiries." }, headers);
      return;
    }
    if (origin) headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";

    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        ...headers,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "600",
      });
      response.end();
      return;
    }
    if (request.method !== "POST") {
      sendJson(response, 405, { error: "Method not allowed." }, { ...headers, Allow: "POST, OPTIONS" });
      return;
    }
    if (String(request.headers["content-type"] || "").toLowerCase().split(";")[0].trim() !== "application/json") {
      sendJson(response, 415, { error: "Submit the enquiry as JSON." }, headers);
      return;
    }

    const now = clock();
    for (const [key, entry] of attempts) {
      if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) attempts.delete(key);
    }
    const clientKey = getClientKey(request);
    const attempt = attempts.get(clientKey);
    if (attempt && now - attempt.startedAt < RATE_LIMIT_WINDOW_MS && attempt.count >= RATE_LIMIT_MAX) {
      sendJson(response, 429, { error: "Too many enquiries. Please try again later." }, {
        ...headers,
        "Retry-After": String(Math.ceil((RATE_LIMIT_WINDOW_MS - (now - attempt.startedAt)) / 1000)),
      });
      return;
    }
    if (attempt && now - attempt.startedAt < RATE_LIMIT_WINDOW_MS) {
      attempt.count += 1;
    } else {
      attempts.set(clientKey, { startedAt: now, count: 1 });
    }

    let payload;
    try {
      payload = await readJson(request);
    } catch (error) {
      const status = error.status || 400;
      sendJson(response, status, { error: status === 413 ? error.message : "Submit a valid JSON enquiry." }, headers);
      return;
    }

    const validation = validatePayload(payload);
    if (validation.error) {
      sendJson(response, 400, { error: validation.error }, headers);
      return;
    }
    if (validation.enquiry.website) {
      sendJson(response, 202, { ok: true }, headers);
      return;
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL || !allowedOrigins.length) {
      logger.error("Contact delivery is not configured. Set the Resend, recipient, sender, and origin environment variables.");
      sendJson(response, 503, { error: "Enquiry delivery is temporarily unavailable." }, headers);
      return;
    }
    const recipients = String(CONTACT_TO_EMAIL)
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    if (
      recipients.length === 0 ||
      recipients.some((address) => !isValidEmail(address)) ||
      !isValidSender(CONTACT_FROM_EMAIL)
    ) {
      logger.error("Contact delivery has an invalid recipient or sender email configuration.");
      sendJson(response, 503, { error: "Enquiry delivery is temporarily unavailable." }, headers);
      return;
    }

    const { name, organization, email, interest, message } = validation.enquiry;
    const text = [
      "A new enquiry was submitted through the Samray Group website.",
      "",
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Email: ${email}`,
      `Area of interest: ${interest}`,
      "",
      "Message:",
      message,
    ].join("\n");

    try {
      const resendResponse = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: recipients,
          reply_to: email,
          subject: `Samray website enquiry: ${interest}`,
          text,
        }),
      });
      if (!resendResponse.ok) {
        logger.error(`Resend rejected a contact enquiry with status ${resendResponse.status}.`);
        sendJson(response, 502, { error: "We could not send your enquiry right now. Please try again later." }, headers);
        return;
      }
      sendJson(response, 202, { ok: true }, headers);
    } catch (error) {
      logger.error("Unable to reach Resend while delivering a contact enquiry.", error);
      sendJson(response, 502, { error: "We could not send your enquiry right now. Please try again later." }, headers);
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT) || 10000;
  const server = createContactServer();
  server.listen(port, "0.0.0.0", () => {
    console.log(`Samray contact API listening on port ${port}.`);
  });
}
