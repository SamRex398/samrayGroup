import * as React from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { scrollToId } from "../../lib/scroll";
import { useModal } from "../ui/modal-context";

const LINKS = ["About", "Value chain", "Sectors", "Projects", "Careers"];

export function Nav() {
  const { open } = useModal();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToId("top")}
          className="font-display text-lg font-semibold text-paper tracking-tight"
        >
          Samray <span className="text-copper">Energy</span>
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollToId(l.toLowerCase().replace(" ", "-"))}
              className="text-sm text-paper/70 hover:text-paper transition-colors"
            >
              {l}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" className="!px-5 !py-2.5" onClick={() => open("contact")}>
            Talk to us <ArrowRight size={16} />
          </Button>
        </div>

        <button
          className="md:hidden text-paper"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ink border-t border-line px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => {
                scrollToId(l.toLowerCase().replace(" ", "-"));
                setMobileOpen(false);
              }}
              className="text-base text-paper/80 text-left"
            >
              {l}
            </button>
          ))}
          <Button
            className="mt-2 w-full"
            onClick={() => {
              open("contact");
              setMobileOpen(false);
            }}
          >
            Talk to us <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </header>
  );
}
