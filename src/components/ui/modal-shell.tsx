import * as React from "react";
import { X } from "lucide-react";

interface ModalShellProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}

export function ModalShell({ title, subtitle, onClose, children, wide }: ModalShellProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="absolute inset-0 bg-deepblue/60 backdrop-blur-sm animate-[fadeIn_.18s_ease_forwards]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-surface text-textprimary rounded-t-2xl sm:rounded-2xl w-full ${
          wide ? "sm:max-w-2xl" : "sm:max-w-md"
        } max-h-[90vh] overflow-y-auto p-7 sm:p-9 shadow-2xl border border-borderc animate-[slideUp_.22s_ease_forwards]`}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center text-textmuted hover:text-textprimary hover:bg-surface-alt transition-colors"
        >
          <X size={18} />
        </button>
        <div className="font-mono text-xs tracking-widest uppercase text-primary">{subtitle}</div>
        <h3 id="modal-title" className="font-display font-semibold text-2xl sm:text-3xl mt-2 tracking-tight pr-8 text-textprimary">
          {title}
        </h3>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
