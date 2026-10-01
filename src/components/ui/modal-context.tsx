import * as React from "react";

export type ModalKind = "contact" | "roles" | null;

interface ModalContextValue {
  modal: ModalKind;
  open: (kind: Exclude<ModalKind, null>) => void;
  close: () => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}

export function ModalRoot({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = React.useState<ModalKind>(null);
  const value = React.useMemo(
    () => ({ modal, open: (k: Exclude<ModalKind, null>) => setModal(k), close: () => setModal(null) }),
    [modal]
  );
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
