import * as React from "react";
import { Check, Mail } from "lucide-react";
import { ModalShell } from "./modal-shell";
import { useModal } from "./modal-context";

interface Role {
  title: string;
  team: string;
  location: string;
}

const ROLES: Role[] = [
  { title: "Reservoir Engineer", team: "Upstream", location: "Lagos, Nigeria" },
  { title: "HSE Officer", team: "Midstream", location: "Port Harcourt, Nigeria" },
  { title: "Agronomy Lead", team: "Agriculture", location: "Ogun State, Nigeria" },
  { title: "3D Motion Designer", team: "Media", location: "Lagos, Nigeria (Hybrid)" },
];

export function RolesModal() {
  const { close } = useModal();
  const [applied, setApplied] = React.useState<Record<string, boolean>>({});

  function apply(title: string) {
    setApplied((a) => ({ ...a, [title]: true }));
    window.location.href = `mailto:careers@samraygroup.com?subject=${encodeURIComponent(
      `Application: ${title}`
    )}`;
  }

  return (
    <ModalShell title="Open roles" subtitle="Careers" onClose={close} wide>
      <div className="space-y-3">
        {ROLES.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between gap-4 rounded-xl border border-borderc px-5 py-4 hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="font-semibold text-base text-textprimary">{r.title}</div>
              <div className="text-xs text-textmuted mt-1 font-mono tracking-wide">
                {r.team.toUpperCase()} · {r.location}
              </div>
            </div>
            <button
              onClick={() => apply(r.title)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                applied[r.title] ? "bg-success/10 text-success" : "bg-primary text-white hover:bg-deepblue-light"
              }`}
            >
              {applied[r.title] ? (
                <>
                  <Check size={14} /> Email drafted
                </>
              ) : (
                <>
                  <Mail size={14} /> Apply
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-textmuted leading-relaxed">
        Applying opens a pre-filled email to careers@samraygroup.com. Don&apos;t see the right role?
        Use the contact form to introduce yourself.
      </p>
    </ModalShell>
  );
}
