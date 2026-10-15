"use client";

import Link from "next/link";
import { HamburgerButton } from "./MobileNav";

export default function TopBar({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="h-14 border-b border-surface-dim bg-white flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <HamburgerButton />

        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-1.5 text-xs text-muted overflow-x-auto">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                {i > 0 && (
                  <svg width="10" height="10" viewBox="0 0 10 10" className="text-muted/40 flex-shrink-0">
                    <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-purple-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-ink leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-muted leading-tight">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="text-[10px] sm:text-[11px] font-semibold text-muted bg-surface-dim px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-surface-hover transition-colors whitespace-nowrap">
          Need Help?
        </button>
      </div>
    </header>
  );
}
