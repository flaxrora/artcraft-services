import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDownToLineIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  TerminalIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import DiscordButton from "@/components/discord-button";
import { GitHubIcon } from "@/components/icons";
import { SectionShell, SectionEyebrow } from "@/components/landing/section-shell";
import { Badge, Button, CopyButton } from "@/components/ui";
import { CRAFT_DESKTOP_PLATFORMS } from "@/lib/crafting-app-releases";
import {
  CRAFTING_APPS,
  craftAppBuildCommand,
  craftAppIndex,
  craftAppName,
  craftAppRelease,
  craftAppRepo,
  craftReleaseDownloads,
  craftReleasePageUrl,
  craftReleasesUrl,
  craftShotSourceUrl,
  craftShotUrl,
  formatList,
  type CraftApp,
  type CraftDownload,
} from "@/lib/crafting-apps";
import AppCard from "./app-card";
import { AppDownloadButtons } from "./app-downloads";
import { ColorAccent } from "./app-wordmark";

// Body sections of an /apps/<slug> page, in page order. Server components;
// the client islands are the CopyButton and the OS-aware download buttons.

const DOWNLOAD_GROUPS = [...CRAFT_DESKTOP_PLATFORMS, "Other"] as const;

const CELL_HEADING_CLASSES =
  "mt-4 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-ink-strong sm:text-4xl";

// The hero carries shot 01. Window captures lead with a full-width shot,
// then pair; portrait pages (layout spreads) sit four across.
export function AppGallery({ app, index }: { app: CraftApp; index: string }) {
  const [, ...shots] = app.shots;
  const portrait = shots.every((shot) => shot.portrait);
  return (
    <SectionShell id="gallery">
      <SectionEyebrow
        index={index}
        label="Screenshots"
        annotation={`Captured in ${craftAppName(app)}`}
      />
      <div
        data-reveal-group
        className={twMerge(
          "grid gap-px bg-line",
          portrait ? "grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2",
        )}
      >
        {shots.map((shot, i) => (
          <figure
            key={shot.file}
            data-reveal
            className={twMerge("bg-bg", !portrait && i === 0 && "md:col-span-2")}
          >
            <a
              href={craftShotSourceUrl(app, shot)}
              target="_blank"
              rel="noopener noreferrer"
              className={twMerge(
                "group relative block overflow-hidden bg-bg-sunken",
                shot.portrait ? "aspect-[7/9]" : "aspect-[16/10]",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={craftShotUrl(app, shot)}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="hud-label absolute right-3 bottom-3 flex items-center gap-1 bg-bg/80 px-2 py-1 text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                Full size
                <ArrowUpRightIcon aria-hidden className="h-3 w-3" />
              </span>
            </a>
            <figcaption
              className={twMerge(
                "flex items-center justify-between gap-4 border-t border-line py-3",
                portrait ? "px-4 md:px-6" : "px-6 md:px-10",
              )}
            >
              <span className="hud-label text-muted">{shot.caption}</span>
              <span className="hud-label text-faint">
                {String(i + 2).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

// Installers (or, until there are any, the Discord waitlist) beside
// build-from-source. Versions and files come from crafting-app-releases.ts;
// a null release there flips the left cell to the waitlist.
export function AppGetIt({ app, index }: { app: CraftApp; index: string }) {
  const name = craftAppName(app);
  const command = craftAppBuildCommand(app);
  const desktop = app.platforms.filter((platform) => platform !== "Web");
  const release = craftAppRelease(app);
  const downloads = release ? craftReleaseDownloads(app, release) : [];

  return (
    <SectionShell id="get-it">
      <SectionEyebrow
        index={index}
        label={`Get ${name}`}
        annotation="Free · Open source"
      />
      <div className="grid gap-px bg-line md:grid-cols-2">
        <div data-reveal className="flex flex-col bg-bg p-6 md:p-10">
          <p className="hud-label text-faint">Installers</p>
          {release ? (
            <>
              <h3 className={CELL_HEADING_CLASSES}>
                Download <ColorAccent>{name}</ColorAccent>.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Version {release.version}, free. Questions or feedback?
                The team is in the ArtCraft Discord.
              </p>
              <AppDownloadButtons
                recommended={downloads.filter((download) => download.recommended)}
                version={release.version}
              />
              <AllDownloads downloads={downloads} />
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <ExternalLink href={craftReleasePageUrl(app, release)}>
                  Release notes on GitHub
                </ExternalLink>
                <ExternalLink href={craftReleasesUrl(app)}>
                  All releases
                </ExternalLink>
              </div>
            </>
          ) : (
            <>
              <h3 className={CELL_HEADING_CLASSES}>
                Installers are <ColorAccent>on the way</ColorAccent>.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Native installers for {formatList(desktop)} are coming. Join
                the ArtCraft Discord to get them first, try early builds and
                talk with the team building {name}.
              </p>
              <DiscordButton size="lg" className="mt-8">
                Get notified on Discord
              </DiscordButton>
            </>
          )}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-10">
            {app.platforms.map((platform) => (
              <Badge key={platform} label={platform} />
            ))}
          </div>
        </div>

        <div data-reveal className="flex min-w-0 flex-col bg-bg p-6 md:p-10">
          <p className="hud-label text-faint">Build from source</p>
          <h3 className={CELL_HEADING_CLASSES}>
            Run it <ColorAccent>today</ColorAccent>.
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Needs Rust {app.rustVersion} or newer. New to Rust? Install it with{" "}
            <a
              href="https://rustup.rs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-current"
            >
              rustup
            </a>
            , then run:
          </p>
          <figure className="mt-6 border border-line bg-bg-sunken">
            <div className="flex items-center justify-between border-b border-line pl-4">
              <figcaption className="hud-label flex items-center gap-2 text-faint">
                <TerminalIcon aria-hidden className="h-3.5 w-3.5" />
                Terminal
              </figcaption>
              <CopyButton
                value={command}
                variant="ghost"
                className="h-9 border-l border-line px-3"
              />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink">
              <code>{command}</code>
            </pre>
          </figure>
          <Button
            href={craftAppRepo(app)}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            <GitHubIcon className="h-4 w-4" />
            View source on GitHub
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

// The other apps, compact, linking back to the hub.

// Every file in the release, grouped by platform, behind a disclosure.
function AllDownloads({ downloads }: { downloads: CraftDownload[] }) {
  return (
    <details className="group/all mt-6 border border-line">
      <summary className="hud-label flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
        All downloads ({downloads.length} files)
        <ChevronDownIcon
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-open/all:rotate-180"
        />
      </summary>
      {DOWNLOAD_GROUPS.map((group) => {
        const files = downloads.filter((download) => download.group === group);
        if (files.length === 0) return null;
        return (
          <div key={group} className="border-t border-line">
            <p className="hud-label bg-bg-sunken px-4 py-2 text-faint">{group}</p>
            <ul>
              {files.map((download) => (
                <li key={download.href} className="border-t border-line">
                  <a
                    href={download.href}
                    className="group/file flex items-center justify-between gap-4 px-4 py-3 hover:bg-bg-sunken"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm text-ink">{download.label}</span>
                      <span className="block text-sm text-muted">{download.description}</span>
                      <span className="mt-1 block truncate font-mono text-[11px] text-faint">
                        {download.fileName}
                      </span>
                    </span>
                    <ArrowDownToLineIcon
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted group-hover/file:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </details>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hud-label flex w-fit items-center gap-1.5 text-muted hover:text-ink"
    >
      {children}
      <ArrowUpRightIcon aria-hidden className="h-3.5 w-3.5" />
    </a>
  );
}

export function AppFamily({ app, index }: { app: CraftApp; index: string }) {
  const siblings = CRAFTING_APPS.filter((other) => other.slug !== app.slug);
  return (
    <SectionShell id="family">
      <SectionEyebrow index={index} label="The family" annotation="Crafting Apps" />
      <div className="flex flex-col gap-4 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <h2
          data-reveal
          className="max-w-2xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-5xl"
        >
          More from the <ColorAccent>family</ColorAccent>.
        </h2>
        <Link
          href="/apps"
          className="hud-label flex items-center gap-1.5 text-muted hover:text-ink"
        >
          All Crafting Apps
          <ArrowUpRightIcon aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div
        data-reveal-group
        className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {siblings.map((sibling) => (
          <AppCard
            key={sibling.slug}
            app={sibling}
            index={craftAppIndex(sibling)}
            compact
          />
        ))}
      </div>
    </SectionShell>
  );
}
