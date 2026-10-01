import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { CraftApp } from "@/lib/crafting-apps";

// Scopes the app's color identity (`--app`, `--app-ink` in globals.css).
export function appThemeClass(app: CraftApp): string {
  return `app-${app.slug}`;
}

// Text wordmark: the display face throughout, "Craft" picked out in the
// app's ink color. Needs an appThemeClass ancestor (or pass `themed`).
export function AppWordmark({
  app,
  themed = false,
  className,
}: {
  app: CraftApp;
  themed?: boolean;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "font-display font-medium tracking-[-0.03em] text-ink-strong",
        themed && appThemeClass(app),
        className,
      )}
    >
      {app.prefix}
      <ColorAccent>Craft</ColorAccent>
    </span>
  );
}

// The Crafting Apps pages' contrast word: same face as the headline, set in
// the app's ink color (the site accent outside an app scope) instead of the
// serif italic used elsewhere on the site.
export function ColorAccent({ children }: { children: ReactNode }) {
  return (
    <span className="text-[var(--app-ink,var(--accent-ink))]">{children}</span>
  );
}

// Saturated index tab in the app's color (black text passes AA on all five).
export function AppTab({ children }: { children: ReactNode }) {
  return (
    <span className="hud-label bg-(--app) px-2 py-1 font-bold text-black">
      {children}
    </span>
  );
}
