import { Check } from "lucide-react";
import { Eyebrow } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { IMG } from "../../lib/images";

const PROOF_POINTS = [
  "Zohr Field — the largest gas field in the Mediterranean, offshore Egypt",
  "Helm Field — Tunisia's first producing offshore asset",
  "Long-standing partnerships with major IOCs and indigenous operators",
];

export function About() {
  return (
    <section id="about" className="bg-paper py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>About Samray Group</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl mt-4 tracking-tight text-textink">
              A dynamic force in African infrastructure
            </h2>
            <p className="mt-6 text-textink/65 leading-relaxed">
              Samray Group invests in and operates infrastructure across energy, agriculture,
              sports, and media. Our subsidiaries hold gas asset investments and a proven record
              across the oil and gas industry — including work with major International Oil
              Companies and indigenous players in Nigeria and Africa.
            </p>
            <ul className="mt-8 space-y-4">
              {PROOF_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-textink/75">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-copper/10 text-copper flex items-center justify-center">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="rounded-3xl overflow-hidden relative h-full min-h-[420px]">
              <img
                src={IMG.rig}
                alt="Offshore gas platform representative of Samray's upstream operations"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" aria-hidden="true" />
              <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 text-paper">
                <div>
                  <div className="font-mono text-xs tracking-widest text-teal">FIELD RECORD</div>
                  <p className="font-display text-2xl sm:text-3xl mt-4 leading-snug max-w-lg">
                    Our extensive experience with IOCs and indigenous players has led to
                    successful project completions across two continents.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-line">
                  <div>
                    <div className="font-display text-2xl">Egypt</div>
                    <div className="text-xs text-paper/60 mt-1">Zohr Field, Mediterranean Sea</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl">Tunisia</div>
                    <div className="text-xs text-paper/60 mt-1">Helm Field, first producing asset</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
