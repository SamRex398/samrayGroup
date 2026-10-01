import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { scrollToId } from "../../lib/scroll";
import { IMG } from "../../lib/images";

const STATS = [
  ["1,100+", "hectares under cultivation"],
  ["3", "countries with active gas assets"],
  ["20+", "years of combined leadership experience"],
  ["4", "sectors: energy, agriculture, sports, media"],
];

export function Hero() {
  return (
    <section id="top" className="relative bg-hero-gradient text-white overflow-hidden pt-20">
      <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMG.heroRig}
          alt=""
          className="w-full h-full object-cover opacity-[0.16] mix-blend-luminosity"
          loading="eager"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24 lg:pt-32 lg:pb-32">
        <Reveal>
          <Eyebrow dark>Samray Energy Solutions Ltd</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display font-semibold text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-6xl mt-5 max-w-3xl tracking-tight">
            Engineering Africa's energy value chain, end to end.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-white/75 text-lg leading-relaxed">
            We invest in, engineer, and operate across upstream, midstream, and downstream
            energy — with a track record built on Africa's largest producing gas fields.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button onClick={() => scrollToId("projects")}>
              Explore our work <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl">
            {STATS.map(([n, l]) => (
              <div key={l} className="bg-white/[0.06] px-5 py-6">
                <div className="font-display font-semibold text-2xl sm:text-3xl text-white">{n}</div>
                <div className="text-xs text-white/60 mt-1 leading-snug font-mono">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
