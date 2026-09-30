import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { scrollToId } from "../../lib/scroll";
import { LOGO } from "../../lib/images";

const LINKS = ["About", "Value chain", "Sectors", "Projects", "Careers"];

export function Nav() {
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
        "fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300",
        scrolled
          ? "shadow-[0_1px_0_rgba(217,226,239,1),0_4px_16px_-8px_rgba(26,35,126,0.12)]"
          : "border-b border-borderc"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="flex items-center"
          aria-label="Samray Energy Solutions — home"
        >
          <img src={LOGO.light} alt="Samray Energy Solutions" className="h-8 sm:h-9 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((l) => {
            const id = l.toLowerCase().replace(" ", "-");
            return (
              <a
                key={l}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
                className="text-sm font-medium text-textsecondary hover:text-primary transition-colors"
              >
                {l}
              </a>
            );
          })}
        </nav>

        <button
          className="md:hidden text-textprimary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-borderc px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => {
            const id = l.toLowerCase().replace(" ", "-");
            return (
              <a
                key={l}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                  setMobileOpen(false);
                }}
                className="text-base text-textsecondary text-left"
              >
                {l}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
