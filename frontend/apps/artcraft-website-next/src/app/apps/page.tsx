import type { Metadata } from "next";
import {
  BotIcon,
  CodeXmlIcon,
  CpuIcon,
  GlobeIcon,
  HardDriveIcon,
  KeyboardIcon,
} from "lucide-react";
import AppCard from "@/components/apps/app-card";
import ShareBar from "@/components/apps/share-bar";
import {
  CampaignSection,
  ClosingCta,
  TipGrid,
} from "@/components/campaign/sections";
import DiscordButton from "@/components/discord-button";
import { GitHubIcon } from "@/components/icons";
import { SectionShell, SectionEyebrow } from "@/components/landing/section-shell";
import { ColorAccent } from "@/components/apps/app-wordmark";
import { PageHeader } from "@/components/page/page-header";
import RevealManager from "@/components/reveal-manager";
import { Button } from "@/components/ui";
import {
  CRAFTING_APPS,
  CRAFTING_APPS_GITHUB_ORG,
  CRAFTING_APPS_OG_IMAGE,
  CRAFTING_APPS_PRINCIPLES,
  craftAppIndex,
} from "@/lib/crafting-apps";
import { siteUrl } from "@/lib/links";

const TITLE = "Crafting Apps: open-source creative tools";
const DESCRIPTION =
  "Image editing, vector illustration, video, photography and PDFs: five native, open-source apps from the ArtCraft team, built in Rust and free to use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/apps" },
  openGraph: {
    type: "website",
    url: "/apps",
    siteName: "ArtCraft",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: CRAFTING_APPS_OG_IMAGE, width: 1200, height: 630 }],
  },
};

// Order matches CRAFTING_APPS_PRINCIPLES.
const PRINCIPLE_ICONS = [
  <CodeXmlIcon key="open" aria-hidden className="h-5 w-5" />,
  <CpuIcon key="native" aria-hidden className="h-5 w-5" />,
  <KeyboardIcon key="familiar" aria-hidden className="h-5 w-5" />,
  <HardDriveIcon key="local" aria-hidden className="h-5 w-5" />,
  <BotIcon key="agents" aria-hidden className="h-5 w-5" />,
  <GlobeIcon key="web" aria-hidden className="h-5 w-5" />,
];

export default function CraftingAppsPage() {
  return (
    <>
      <RevealManager />

      <PageHeader
        id="apps"
        index="01"
        label="Crafting Apps"
        annotation="Five apps · Open source · Pure Rust"
        title={
          <>
            Five apps. One <ColorAccent>craft</ColorAccent>.
          </>
        }
        lede="Image editing, vector illustration, video, photography and PDFs. Native, open-source apps from the ArtCraft team, built in Rust and free to use."
      >
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <DiscordButton size="lg">Join the Discord</DiscordButton>
          <Button
            href={CRAFTING_APPS_GITHUB_ORG}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="h-4 w-4" />
            Browse on GitHub
          </Button>
        </div>
        <ShareBar
          url={siteUrl("/apps")}
          text="Crafting Apps: five open-source creative apps from ArtCraft"
          className="mt-6"
        />
      </PageHeader>

      <SectionShell id="lineup">
        <SectionEyebrow
          index="02"
          label="The lineup"
          annotation="Pick a craft to explore"
        />
        <div
          data-reveal-group
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {CRAFTING_APPS.map((app) => (
            <AppCard key={app.slug} app={app} index={craftAppIndex(app)} />
          ))}
          <div data-reveal className="flex flex-col bg-bg p-6 md:p-8">
            <p className="hud-label text-faint">Next up</p>
            <h3 className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-ink-strong">
              More crafts <ColorAccent>on the way</ColorAccent>.
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Tell us what to rebuild next, test early builds and follow
              development with the team in the ArtCraft Discord.
            </p>
            <div className="mt-auto pt-8">
              <DiscordButton />
            </div>
          </div>
        </div>
      </SectionShell>

      <CampaignSection
        id="principles"
        index="03"
        label="Principles"
        annotation="Shared by every craft"
        title={
          <>
            Built the <ColorAccent>hard</ColorAccent> way.
          </>
        }
        lede="Every Crafting App is written from scratch in Rust and held to the same rules."
      >
        <TipGrid
          items={CRAFTING_APPS_PRINCIPLES}
          columns={3}
          icons={PRINCIPLE_ICONS}
        />
      </CampaignSection>

      <ClosingCta
        eyebrow="Open source · Free"
        title={
          <>
            Build it <ColorAccent>with us</ColorAccent>.
          </>
        }
        lede="Early builds, roadmaps and the people making the Crafting Apps all live in the ArtCraft Discord."
      >
        <DiscordButton size="lg">Join the Discord</DiscordButton>
      </ClosingCta>
    </>
  );
}
