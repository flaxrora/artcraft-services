"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLineIcon } from "lucide-react";
import { Button } from "@/components/ui";
import {
  CRAFT_DESKTOP_PLATFORMS,
  type CraftDesktopPlatform,
} from "@/lib/crafting-app-releases";
import type { CraftDownload } from "@/lib/crafting-apps";

// OS-aware download buttons for /apps/<slug>. Detection runs after mount
// (no user agent on the server), so the first paint offers every platform
// equally and the "for your system" button arrives with hydration. Phones,
// tablets and Chromebooks keep the neutral layout.

type DetectedDesktop = {
  platform: CraftDesktopPlatform;
  arch?: CraftDownload["arch"];
};

/** Main buttons in the Get-it section: your platform first, then the rest. */
export function AppDownloadButtons({
  recommended,
  version,
}: {
  /** The release's `recommended` files. */
  recommended: CraftDownload[];
  version: string;
}) {
  const detected = useDetectedDesktop();
  const mine = detected && pickDownload(recommended, detected);
  const defaults = CRAFT_DESKTOP_PLATFORMS.flatMap((platform) => {
    const download = pickDownload(recommended, { platform });
    return download ? [download] : [];
  });

  if (!mine) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        {defaults.map((download) => (
          <Button key={download.href} href={download.href} size="lg">
            <ArrowDownToLineIcon aria-hidden className="h-4 w-4" />
            {download.group}
          </Button>
        ))}
      </div>
    );
  }

  const others = defaults.filter((download) => download.group !== mine.group);
  return (
    <div className="mt-8 flex flex-col gap-3">
      <Button href={mine.href} size="lg">
        <ArrowDownToLineIcon aria-hidden className="h-4 w-4" />
        Download for {mine.group}
      </Button>
      <p className="hud-label text-faint">
        {mine.label} · v{version}
      </p>
      {others.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {others.map((download) => (
            <Button
              key={download.href}
              href={download.href}
              variant="secondary"
              size="md"
            >
              <ArrowDownToLineIcon aria-hidden className="h-3.5 w-3.5" />
              {download.group}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Hero CTA: a direct download once the OS is known, else a jump to #get-it. */
export function AppHeroDownloadButton({
  recommended,
  name,
}: {
  recommended: CraftDownload[];
  name: string;
}) {
  const detected = useDetectedDesktop();
  const mine = detected && pickDownload(recommended, detected);
  return (
    <Button href={mine ? mine.href : "#get-it"} size="lg">
      <ArrowDownToLineIcon aria-hidden className="h-4 w-4" />
      {mine ? `Download for ${mine.group}` : `Download ${name}`}
    </Button>
  );
}

function useDetectedDesktop(): DetectedDesktop | null {
  const [detected, setDetected] = useState<DetectedDesktop | null>(null);
  useEffect(() => {
    setDetected(detectDesktop());
  }, []);
  return detected;
}

/** The platform's first recommended file, or one matching the CPU if any. */
function pickDownload(
  recommended: CraftDownload[],
  { platform, arch }: DetectedDesktop,
): CraftDownload | undefined {
  const candidates = recommended.filter((download) => download.group === platform);
  return candidates.find((download) => arch && download.arch === arch) ?? candidates[0];
}

function detectDesktop(): DetectedDesktop | null {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile|CrOS/i.test(ua)) return null;
  if (/Windows/i.test(ua)) return { platform: "Windows" };
  if (/Macintosh|Mac OS X/i.test(ua)) {
    // iPadOS Safari reports itself as a Mac; touch support gives it away.
    return navigator.maxTouchPoints > 1 ? null : { platform: "macOS" };
  }
  if (/Linux/i.test(ua)) {
    return {
      platform: "Linux",
      arch: /aarch64|arm64|armv8/i.test(ua) ? "aarch64" : "x86_64",
    };
  }
  return null;
}
