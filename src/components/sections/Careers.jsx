import { Briefcase } from "lucide-react";
import { Reveal } from "../ui/reveal";

export function Careers() {
  return (
    <section id="careers" className="bg-hero-gradient text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="rounded-card bg-white/[0.07] border border-white/15 p-10 sm:p-14">
            <div className="w-11 h-11 rounded-xl bg-gold/20 text-solargold flex items-center justify-center mb-6">
              <Briefcase size={20} />
            </div>
            <h2 className="font-display font-semibold text-3xl tracking-tight max-w-xl">
              Join a dynamic team building Africa&apos;s energy future
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
              We&apos;re growing across upstream, midstream, and downstream operations. If you want
              to work on real infrastructure with real impact, we want to hear from you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
