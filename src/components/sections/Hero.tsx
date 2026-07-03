import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { scrollToId } from "../../lib/scroll";
import { useModal } from "../ui/modal-context";
import { IMG } from "../../lib/images";

const STATS: [string, string][] = [
  ["1,100+", "hectares under cultivation"],
  ["3", "countries with active gas assets"],
  ["20+", "years of combined leadership experience"],
  ["4", "sectors: energy, agriculture, sports, media"],
];

export function Hero() {
  const { open } = useModal();

  return (
    <section id="top" className="relative bg-ink text-paper overflow-hidden grain">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMG.heroRig}
          alt=""
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 lg:pt-48 lg:pb-36">
        <Reveal>
          <Eyebrow>Samray Energy Solutions Ltd</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display font-medium text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem] mt-5 max-w-4xl tracking-tight">
            Powering Africa&apos;s energy value chain, end to end.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-paper/70 text-lg leading-relaxed">
            We invest in and operate across upstream, midstream, and downstream energy —
            with a track record built on Africa&apos;s largest producing gas fields.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button onClick={() => scrollToId("projects")}>
              Explore our work <ArrowRight size={16} />
            </Button>
            <Button variant="ghost" onClick={() => open("roles")}>
              See open roles
            </Button>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line max-w-3xl">
            {STATS.map(([n, l]) => (
              <div key={l} className="bg-surface/80 backdrop-blur-sm px-5 py-6">
                <div className="font-display text-2xl sm:text-3xl text-paper">{n}</div>
                <div className="text-xs text-paper/50 mt-1 leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
