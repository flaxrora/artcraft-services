import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui";
import {
  craftAppName,
  craftAppPath,
  craftShotUrl,
  type CraftApp,
} from "@/lib/crafting-apps";
import { AppTab, AppWordmark, appThemeClass } from "./app-wordmark";

// Lineup cell: color tab + category, the hero screenshot, wordmark, pitch,
// and (unless compact) platform/status chips. The whole cell is the link; a
// hairline in the app's color draws across the top on hover.
export default function AppCard({
  app,
  index,
  compact = false,
}: {
  app: CraftApp;
  index: string;
  compact?: boolean;
}) {
  const [hero] = app.shots;
  return (
    <Link
      href={craftAppPath(app)}
      data-reveal
      className={twMerge(
        "group relative flex h-full flex-col bg-bg",
        appThemeClass(app),
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-(--app) transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-3">
        <AppTab>{index}</AppTab>
        <p className="hud-label truncate text-faint">{app.category}</p>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-sunken">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={craftShotUrl(app, hero)}
          alt={hero.alt}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={twMerge("flex flex-1 flex-col", compact ? "p-6" : "p-6 md:p-8")}>
        <h3 className="leading-none">
          <AppWordmark
            app={app}
            className={compact ? "text-2xl" : "text-3xl sm:text-4xl"}
          />
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{app.pitch}</p>
        {!compact && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            <Badge label={app.status} className="text-(--app-ink)" />
            {app.platforms.map((platform) => (
              <Badge key={platform} label={platform} />
            ))}
          </div>
        )}
        <span className="hud-label mt-auto flex items-center gap-1.5 pt-6 text-muted group-hover:text-ink">
          Explore {craftAppName(app)}
          <ArrowUpRightIcon
            aria-hidden
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
