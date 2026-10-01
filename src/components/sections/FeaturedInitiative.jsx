import { Zap } from "lucide-react";
import { Eyebrow, StatusBadge } from "../ui/typography";
import { Reveal } from "../ui/reveal";
import { IMG } from "../../lib/images";

/**
 * A currently-signed initiative gets top billing above the historical project
 * grid — it's verifiable, current, and the strongest proof point on the site.
 */
export function FeaturedInitiative() {
  return (
    <Reveal>
      <div className="rounded-card bg-white border border-borderc shadow-card overflow-hidden mb-10 lg:mb-12">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-56 lg:h-auto order-1 lg:order-2">
            <img
              src={IMG.solar}
              alt="Solar panel array representative of the Central African Republic hybridization program"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepblue/30 lg:bg-gradient-to-r lg:from-white/0 lg:to-transparent" />
          </div>

          <div className="p-8 sm:p-10 lg:p-12 order-2 lg:order-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 flex-wrap">
              <Eyebrow>Latest initiative</Eyebrow>
              <StatusBadge status="Development" />
            </div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl mt-4 tracking-tight text-textprimary">
              Central African Republic: 16-town solar-diesel hybridization
            </h3>
            <p className="mt-4 text-textsecondary leading-relaxed">
              Sixteen provincial towns in the Central African Republic run today on aged,
              costly, unreliable diesel generation, largely disconnected from the national
              grid. This program hybridizes those 16 diesel stations with solar PV and
              battery storage — a distributed portfolio, not a single plant — retaining the
              gensets for firming and backup, to provide power to cities.
            </p>
            <p className="mt-4 text-sm text-textmuted leading-relaxed">
              A consortium with Samray Energy Solutions Ltd as lead sponsor has signed an
              agreement with the Ministry of Energy &amp; Hydraulic Resources of the Central
              African Republic.
            </p>
            <div className="mt-7 inline-flex items-center gap-1.5 text-xs text-textmuted font-mono tracking-wide">
              <Zap size={13} className="text-[#8a6a00]" /> 16 SITES · SOLAR + BESS + DIESEL FIRMING
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
