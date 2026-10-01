import { Droplet, Wheat, Trophy, Camera, type LucideIcon } from "lucide-react";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";

interface Sector {
  icon: LucideIcon;
  name: string;
  copy: string;
  gold?: boolean;
}

const SECTORS: Sector[] = [
  {
    icon: Droplet,
    name: "Energy",
    copy: "Upstream, midstream, and downstream investment and operations across oil and gas.",
    gold: true,
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
    <section id="sectors" className="bg-surface-alt py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>Where we operate</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 max-w-xl tracking-tight text-textprimary">
            Four sectors, one investment discipline
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={i * 90}>
              <div className="group bg-white rounded-card border border-borderc shadow-card hover:shadow-cardhover hover:-translate-y-0.5 transition-all duration-300 p-7 h-full">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    s.gold ? "bg-gold/15 text-[#8a6a00]" : "bg-primary/10 text-primary"
                  }`}
                >
                  <s.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg mt-5 text-textprimary">{s.name}</h3>
                <p className="mt-2 text-sm text-textsecondary leading-relaxed">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
