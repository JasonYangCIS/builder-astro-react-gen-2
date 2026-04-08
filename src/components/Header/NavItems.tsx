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
  onlyDesktopNav?: boolean;
  onlyMobileMenu?: boolean;
}

export function NavItems({ entries, onlyDesktopNav, onlyMobileMenu }: NavItemsProps) {
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
      {/* Desktop nav — hidden when onlyMobileMenu */}
      {!onlyMobileMenu && (
        <nav className="nav-desktop" aria-label="Main navigation">
          {entries.map((entry) => (
            <a key={entry.id} href={entry.url} className="nav-link">
              {entry.text}
            </a>
          ))}
        </nav>
      )}

      {/* Mobile hamburger + drawer — hidden when onlyDesktopNav */}
      {!onlyDesktopNav && (
        <>
          <button
            className="hamburger-btn"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {mobileOpen && (
            <div
              className="mobile-backdrop"
              aria-hidden="true"
              onClick={closeMobileMenu}
            />
          )}

          <nav
            id="mobile-navigation"
            className={`mobile-drawer${mobileOpen ? " mobile-drawer--open" : ""}`}
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
      )}
    </>
  );
}
