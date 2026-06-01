// providers/confirm-provider.tsx
"use client";

import { createContext, useContext, useRef, useState } from "react";
import { WarningBox } from "@/component/global/dialog/warningBox";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;    // teks yang harus diketik user
  actionLabel?: string;    // label tombol konfirmasi
  consequences?: string[]; // daftar konsekuensi
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  function confirm(opts: ConfirmOptions): Promise<boolean> {
    setOptions(opts);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  function handleConfirm() {
    resolveRef.current?.(true);
    setOptions(null);
  }

  function handleClose() {
    resolveRef.current?.(false);
    setOptions(null);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <WarningBox
        isOpen={options !== null}
        onClose={handleClose}
        onConfirm={handleConfirm}
        {...options}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
  return ctx.confirm;
}
