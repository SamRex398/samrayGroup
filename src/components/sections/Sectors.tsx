import { Droplet, Wheat, Trophy, Camera, type LucideIcon } from "lucide-react";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";

interface Sector {
  icon: LucideIcon;
  name: string;
  copy: string;
}

const SECTORS: Sector[] = [
  {
    icon: Droplet,
    name: "Energy",
    copy: "Upstream, midstream, and downstream investment and operations across oil and gas.",
  },
  {
    icon: Wheat,
    name: "Agriculture",
    copy: "Cultivating and processing crops across 1,100+ hectares in western Nigeria for major food companies.",
  },
  {
    icon: Trophy,
    name: "Sports",
    copy: "Operating training facilities and scholarship programs for elite athletes, coaches, and referees.",
  },
  {
    icon: Camera,
    name: "Media",
    copy: "3D visuals, high-resolution graphics, and strategic content for brand and communications work.",
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="bg-ink text-paper py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>Where we operate</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 max-w-xl tracking-tight">
            Four sectors, one investment discipline
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={i * 90}>
              <div className="group rounded-2xl border border-line p-7 h-full hover:border-copper/50 hover:bg-surface transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-surface2 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                  <s.icon size={20} />
                </div>
                <h3 className="font-display text-lg mt-5">{s.name}</h3>
                <p className="mt-2 text-sm text-paper/55 leading-relaxed">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
