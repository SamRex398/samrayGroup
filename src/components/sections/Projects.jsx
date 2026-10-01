import { MapPin } from "lucide-react";
import { Eyebrow, StatusBadge } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { IMG } from "../../lib/images";
import { FeaturedInitiative } from "./FeaturedInitiative";

const PROJECTS = [
  {
    place: "Egypt",
    name: "Zohr Field",
    tag: "Upstream · Gas",
    status: "Operational",
    copy: "Investment stake in the largest gas field discovered in the Mediterranean Sea.",
    img: IMG.rig,
  },
  {
    place: "Tunisia",
    name: "Helm Field",
    tag: "Upstream · Offshore",
    status: "Operational",
    copy: "Tunisia's first producing offshore asset, developed with international partners.",
    img: IMG.rig,
    filter: "grayscale(50%) sepia(10%)",
  },
  {
    place: "Nigeria",
    name: "Agri-processing hub",
    tag: "Agriculture",
    status: "Development",
    copy: "1,100+ hectares of cultivation supplying major African food companies.",
    img: IMG.farm,
  },
];

export function Projects() {
  return (
    <section id="projects" className="bg-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 tracking-tight text-textprimary">
            Projects across the continent
          </h2>
        </Reveal>

        <div className="mt-14">
          <FeaturedInitiative />
        </div>

        <div className="font-mono text-xs tracking-widest uppercase text-textmuted mb-6">
          Track record
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="bg-white rounded-card border border-borderc shadow-card hover:shadow-cardhover transition-all duration-300 overflow-hidden h-full flex flex-col group">
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ filter: p.filter }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="font-mono text-[11px] tracking-widest text-primary">{p.tag}</div>
                  <div className="flex items-center gap-2 mt-3 text-textmuted text-xs">
                    <MapPin size={12} /> {p.place}
                  </div>
                  <h3 className="font-semibold text-xl mt-2 text-textprimary">{p.name}</h3>
                  <p className="mt-2 text-sm text-textsecondary leading-relaxed flex-1">{p.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
