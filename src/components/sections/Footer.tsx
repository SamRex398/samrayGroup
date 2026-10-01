import { scrollToId } from "../../lib/scroll";
import { useModal } from "../ui/modal-context";
import { LOGO } from "../../lib/images";

interface FooterCol {
  h: string;
  items: [string, string][];
}

const COLS: FooterCol[] = [
  {
    h: "Company",
    items: [
      ["About", "about"],
      ["Value chain", "value-chain"],
      ["Sectors", "sectors"],
      ["Careers", "careers"],
    ],
  },
  {
    h: "Sectors",
    items: [
      ["Energy", "sectors"],
      ["Agriculture", "sectors"],
      ["Sports", "sectors"],
      ["Media", "sectors"],
    ],
  },
];

export function Footer() {
  const { open } = useModal();

  return (
    <footer className="bg-deepblue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <img src={LOGO.dark} alt="Samray Energy Solutions" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
              Investing in infrastructure and operations across energy, agriculture, sports, and
              media.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div className="font-mono text-xs tracking-widest text-white/40 uppercase">{c.h}</div>
              <ul className="mt-4 space-y-3">
                {c.items.map(([label, id]) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToId(id)}
                      className="text-sm text-white/60 hover:text-white transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-mono text-xs tracking-widest text-white/40 uppercase">Contact</div>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  onClick={() => open("contact")}
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  Get in touch
                </button>
              </li>
              <li>
                <button
                  onClick={() => open("roles")}
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  Open roles
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Samray Energy Solutions. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
