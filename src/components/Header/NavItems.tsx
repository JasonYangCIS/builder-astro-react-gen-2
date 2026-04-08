"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

export interface NavEntry {
  id: string;
  text: string;
  url: string;
}

interface NavItemsProps {
  entries: NavEntry[];
}

export function NavItems({ entries }: NavItemsProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, closeMobileMenu]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
        {entries.map((entry) => (
          <a
            key={entry.id}
            href={entry.url}
            className="nav-link"
          >
            {entry.text}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="hamburger-btn md:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="mobile-backdrop md:hidden"
          aria-hidden="true"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile drawer */}
      <nav
        id="mobile-navigation"
        className={`mobile-drawer md:hidden ${mobileOpen ? "mobile-drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <ul className="mobile-nav-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={entry.url}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {entry.text}
              </a>
            </li>
          ))}
          {entries.length === 0 && (
            <li className="mobile-nav-empty">No navigation items</li>
          )}
        </ul>
      </nav>
    </>
  );
}
