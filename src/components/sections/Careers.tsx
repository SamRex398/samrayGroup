import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Reveal } from "../ui/reveal";
import { useModal } from "../ui/modal-context";

export function Careers() {
  const { open } = useModal();

  return (
    <section id="careers" className="bg-ink text-paper py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-surface to-surface2 border border-line p-10 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="w-11 h-11 rounded-xl bg-copper/15 text-copper flex items-center justify-center mb-6">
                <Briefcase size={20} />
              </div>
              <h2 className="font-display text-3xl tracking-tight">
                Join a dynamic team building Africa&apos;s energy future
              </h2>
              <p className="mt-4 text-paper/60 leading-relaxed">
                We&apos;re growing across upstream, midstream, and downstream operations. If you want
                to work on real infrastructure with real impact, we want to hear from you.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button onClick={() => open("roles")}>
                See open roles <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
