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
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-[fadeIn_.2s_ease_forwards]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-paper text-textink rounded-t-3xl sm:rounded-3xl w-full ${
          wide ? "sm:max-w-2xl" : "sm:max-w-md"
        } max-h-[90vh] overflow-y-auto p-7 sm:p-9 shadow-2xl animate-[slideUp_.25s_ease_forwards]`}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-textink/50 hover:text-textink hover:bg-textink/5 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="font-mono text-xs tracking-widest uppercase text-copper">{subtitle}</div>
        <h3 id="modal-title" className="font-display text-2xl sm:text-3xl mt-2 tracking-tight pr-8">
          {title}
        </h3>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
