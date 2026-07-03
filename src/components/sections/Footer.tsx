import { scrollToId } from "../../lib/scroll";
import { useModal } from "../ui/modal-context";

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
    <footer className="bg-ink text-paper border-t border-line pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-semibold">
              Samray <span className="text-copper">Group</span>
            </div>
            <p className="mt-4 text-sm text-paper/50 max-w-xs leading-relaxed">
              Investing in infrastructure and operations across energy, agriculture, sports, and
              media.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div className="font-mono text-xs tracking-widest text-paper/40 uppercase">{c.h}</div>
              <ul className="mt-4 space-y-3">
                {c.items.map(([label, id]) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToId(id)}
                      className="text-sm text-paper/60 hover:text-paper transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-mono text-xs tracking-widest text-paper/40 uppercase">Contact</div>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  onClick={() => open("contact")}
                  className="text-sm text-paper/60 hover:text-paper transition-colors text-left"
                >
                  Get in touch
                </button>
              </li>
              <li>
                <button
                  onClick={() => open("roles")}
                  className="text-sm text-paper/60 hover:text-paper transition-colors text-left"
                >
                  Open roles
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-4 text-xs text-paper/40">
          <div>© {new Date().getFullYear()} Samray Group. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
