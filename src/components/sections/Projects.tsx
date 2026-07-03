import { MapPin, ArrowRight } from "lucide-react";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { useModal } from "../ui/modal-context";
import { IMG } from "../../lib/images";

interface Project {
  place: string;
  name: string;
  tag: string;
  copy: string;
  img: string;
  filter?: string;
}

const PROJECTS: Project[] = [
  {
    place: "Egypt",
    name: "Zohr Field",
    tag: "Upstream · Gas",
    copy: "Investment stake in the largest gas field discovered in the Mediterranean Sea.",
    img: IMG.rig,
  },
  {
    place: "Tunisia",
    name: "Helm Field",
    tag: "Upstream · Offshore",
    copy: "Tunisia's first producing offshore asset, developed with international partners.",
    img: IMG.rig,
    filter: "grayscale(60%) sepia(15%)",
  },
  {
    place: "Nigeria",
    name: "Agri-processing hub",
    tag: "Agriculture",
    copy: "1,100+ hectares of cultivation supplying major African food companies.",
    img: IMG.farm,
  },
];

export function Projects() {
  const { open } = useModal();

  return (
    <section id="projects" className="bg-paper py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 tracking-tight text-textink">
            Projects across the continent
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <button
                onClick={() => open("contact")}
                className="text-left w-full rounded-2xl bg-ink text-paper overflow-hidden h-full flex flex-col hover:-translate-y-1 transition-transform duration-300 group"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ filter: p.filter }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="font-mono text-[11px] tracking-widest text-teal/90">{p.tag}</div>
                  <div className="flex items-center gap-2 mt-3 text-paper/50 text-xs">
                    <MapPin size={12} /> {p.place}
                  </div>
                  <h3 className="font-display text-xl mt-2">{p.name}</h3>
                  <p className="mt-2 text-sm text-paper/55 leading-relaxed flex-1">{p.copy}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-copper-light font-medium">
                    Inquire about this project <ArrowRight size={13} />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
