"use client";

import { createContext, useContext, useState, useCallback } from "react";

type MobileNavContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const MobileNavContext = createContext<MobileNavContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export function useMobileNav() {
  return useContext(MobileNavContext);
}

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <MobileNavContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function HamburgerButton() {
  const { isOpen, toggle } = useMobileNav();

  return (
    <button
      onClick={toggle}
      className="lg:hidden p-2 -ml-2 text-muted hover:text-ink transition-colors rounded-lg"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        {isOpen ? (
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path d="M3 5H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M3 10H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M3 15H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}

export function MobileOverlay() {
  const { isOpen, close } = useMobileNav();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={close}
      aria-hidden="true"
    />
  );
}
