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
    <section id="value-chain" className="bg-ink text-paper py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>How energy moves through us</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 max-w-2xl tracking-tight">
            One connected chain, from wellhead to market
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          {/* Animated flow line — desktop only; encodes the real sequence of the business */}
          <svg
            className="hidden md:block absolute top-[38px] left-0 w-full h-6"
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="40" y1="12" x2="1160" y2="12" stroke="#2E9C93" strokeOpacity="0.25" strokeWidth="2" />
            <line className="flow-dash" x1="40" y1="12" x2="1160" y2="12" stroke="#2E9C93" strokeWidth="2" />
          </svg>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
            {STAGES.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-teal ring-4 ring-ink relative z-10 mb-6" />
                  <div className="font-mono text-xs tracking-widest text-teal/90">{s.tag}</div>
                  <h3 className="font-display text-xl mt-3">{s.title}</h3>
                  <p className="mt-3 text-paper/60 text-sm leading-relaxed">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
