import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";

const STAGES = [
  {
    tag: "01 · UPSTREAM",
    title: "Exploration & production",
    copy: "Gas asset investment and production, including stakes in Egypt's Zohr Field — the largest gas field in the Mediterranean.",
  },
  {
    tag: "02 · MIDSTREAM",
    title: "Transport & processing",
    copy: "Moving and processing hydrocarbons between production sites and end markets, in partnership with major IOCs and indigenous operators.",
  },
  {
    tag: "03 · DOWNSTREAM",
    title: "Refining & distribution",
    copy: "Delivering finished energy products to industry and communities across Nigeria and the wider African market.",
  },
];

export function ValueChain() {
  return (
    <section id="value-chain" className="bg-surface-alt py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>How energy moves through us</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 max-w-2xl tracking-tight text-textprimary">
            One connected chain, from wellhead to market
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          {/* Animated flow line — encodes the real sequence of the business */}
          <svg
            className="hidden md:block absolute top-[26px] left-0 w-full h-6"
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="20" y1="12" x2="1180" y2="12" stroke="#F4BE18" strokeOpacity="0.35" strokeWidth="2" />
            <line className="flow-dash" x1="20" y1="12" x2="1180" y2="12" stroke="#F4BE18" strokeWidth="2" />
          </svg>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {STAGES.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="bg-white rounded-card border border-borderc shadow-card p-7 h-full">
                  <div className="w-3 h-3 rounded-full bg-gold ring-4 ring-white shadow-[0_0_0_1px_#D9E2EF] mb-6" />
                  <div className="font-mono text-xs tracking-widest text-primary">{s.tag}</div>
                  <h3 className="font-semibold text-xl mt-3 text-textprimary">{s.title}</h3>
                  <p className="mt-3 text-textsecondary text-sm leading-relaxed">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
