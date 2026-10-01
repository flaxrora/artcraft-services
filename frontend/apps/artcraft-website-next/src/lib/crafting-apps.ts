import type { Tip } from "./campaign-data";
import { mediaUrl } from "./links";

// The Crafting Apps family: open-source native apps from the ArtCraft team,
// each in its own storytold/<slug> repo. One entry drives the /apps hub card,
// the /apps/<slug> page, the nav, footer, sitemap, ruler and press kit.
//
// Copy rule: describe the category, never name third-party products.
// Facts (counts, timings, formats) come from each repo's README — keep them
// in sync when the READMEs change.
//
// No installers are published yet. When an app ships a release, give it
// `downloads` and the page swaps its "coming soon" cell for the buttons.

export type CraftAppSlug =
  | "photocraft"
  | "drawcraft"
  | "filmcraft"
  | "lightcraft"
  | "printcraft";

export type CraftPlatform = "macOS" | "Windows" | "Linux" | "Web";

export type CraftShot = {
  /** File under public/images/apps/<slug>/. */
  file: string;
  /** Full-resolution original in the repo's docs/images/ (press kit). */
  source: string;
  caption: string;
  alt: string;
};

export type CraftApp = {
  slug: CraftAppSlug;
  /** Prefix before "Craft" — the wordmark sets "Craft" in the serif. */
  prefix: string;
  category: string;
  status: string;
  /** Headline split around its one serif-italic contrast word. */
  headline: [before: string, accent: string, after: string];
  /** One line for cards and share text. */
  pitch: string;
  lede: string;
  /** schema.org applicationCategory. */
  schemaCategory: "DesignApplication" | "MultimediaApplication" | "BusinessApplication";
  platforms: CraftPlatform[];
  rustVersion: string;
  features: Tip[];
  /** First shot is the hero. */
  shots: [CraftShot, ...CraftShot[]];
  downloads?: { label: string; href: string }[];
};

export const CRAFTING_APPS_GITHUB_ORG = "https://github.com/storytold";

export const CRAFTING_APPS: CraftApp[] = [
  {
    slug: "photocraft",
    prefix: "Photo",
    category: "Image editor",
    status: "Early alpha",
    headline: ["The image editor you already ", "know", " how to use."],
    pitch: "The open-source image editor you already know how to use.",
    lede: "Layers, masks, adjustment layers, layer styles, type, vectors and brushes in a native app written entirely in Rust. Open source, offline, and yours.",
    schemaCategory: "DesignApplication",
    platforms: ["macOS", "Windows", "Linux", "Web"],
    rustVersion: "1.90",
    features: [
      {
        title: "Familiar by design",
        body: "The menus, shortcuts, panels and tools your hands already know. Productive on day one, no retraining.",
      },
      {
        title: "Native GPU canvas",
        body: "Renders on Metal, Vulkan, DirectX 12 and WebGPU. No Electron and no web view, just a fast native compositor.",
      },
      {
        title: "Real layered files",
        body: "Opens and saves layered PSD and PSB documents. 134 of 135 real-world test files round-trip byte for byte.",
      },
      {
        title: "Non-destructive editing",
        body: "16 adjustment layers, 70+ live-preview filters, smart objects with smart filters, and a full set of layer styles.",
      },
      {
        title: "On-device selection",
        body: "Select subjects and objects and refine masks with tools that run on your machine, not someone else's server.",
      },
      {
        title: "Serious color",
        body: "8, 16 and 32-bit documents in RGB, CMYK, Lab and Grayscale, with ICC color management and soft proofing.",
      },
    ],
    shots: [
      {
        file: "hero.webp",
        source: "photocraft-demo.jpg",
        caption: "Curves and type layers — The Great Wave",
        alt: "PhotoCraft editing The Great Wave off Kanagawa with a Curves adjustment and type layers in the Layers panel",
      },
      {
        file: "adjustments.webp",
        source: "photocraft-adjustments.jpg",
        caption: "Levels with a live histogram",
        alt: "PhotoCraft applying a Levels adjustment layer to Impression, Sunrise with the histogram panel open",
      },
      {
        file: "layer-styles.webp",
        source: "photocraft-layer-styles.jpg",
        caption: "Layer styles on live type",
        alt: "PhotoCraft's Layer Style dialog adding an outer glow and stroke to the word Earthrise",
      },
      {
        file: "masks.webp",
        source: "photocraft-masks.jpg",
        caption: "Selections and masked adjustments",
        alt: "PhotoCraft with an elliptical selection and a Hue/Saturation adjustment on Girl with a Pearl Earring",
      },
    ],
  },
  {
    slug: "drawcraft",
    prefix: "Draw",
    category: "Vector illustration",
    status: "In development",
    headline: ["Vector illustration, ", "reimagined", " in pure Rust."],
    pitch: "Fast, open-source vector illustration, reimagined in pure Rust.",
    lede: "The pen, panels and shortcuts working illustrators expect, in a native app that keeps up with you. Open source, and in your browser too.",
    schemaCategory: "DesignApplication",
    platforms: ["macOS", "Windows", "Linux", "Web"],
    rustVersion: "1.90",
    features: [
      {
        title: "The workflow you know",
        body: "Pen, direct selection, shape booleans, snapping guides and an appearance panel, laid out the way you expect.",
      },
      {
        title: "Genuinely fast",
        body: "20,000 shapes render in about 27 ms at retina resolution, and the interface runs at 120 fps.",
      },
      {
        title: "Booleans that never fail",
        body: "Exact curve booleans mean no more “cannot perform operation”. Unlimited undo means no more fear.",
      },
      {
        title: "Live, editable effects",
        body: "Blends, envelope distort, gradient mesh, live radial, grid and mirror repeats, glows and drop shadows — all still editable.",
      },
      {
        title: "Image tracing",
        body: "Turn raster images into clean vector paths with 12 tracing presets.",
      },
      {
        title: "Open formats",
        body: "Native JSON documents, SVG and PDF import and export, PNG, JPEG and WebP output, and multi-size export for screens.",
      },
    ],
    shots: [
      {
        file: "hero.webp",
        source: "shot-1-neon.png",
        caption: "Neon Drive — made in DrawCraft",
        alt: "DrawCraft editing a synthwave poster titled Neon Drive with an outer glow in the Appearance panel",
      },
      {
        file: "ribbons.webp",
        source: "shot-2-ribbons.png",
        caption: "Live blends between editable spines",
        alt: "DrawCraft showing Live Blends: 70 smooth-color steps between two ribbon paths",
      },
      {
        file: "sheet.webp",
        source: "shot-3-sheet.png",
        caption: "Booleans, mesh, repeat and envelope",
        alt: "DrawCraft feature sheet with exact booleans, a gradient mesh, a live radial repeat and an envelope distort",
      },
      {
        file: "bezier.webp",
        source: "shot-4-bezier.png",
        caption: "Direct selection on bezier anchors",
        alt: "DrawCraft direct-selecting the anchors and handles of a crescent moon path",
      },
    ],
  },
  {
    slug: "filmcraft",
    prefix: "Film",
    category: "Video editor",
    status: "In development",
    headline: ["Professional video editing, ", "rebuilt", " from scratch."],
    pitch: "Professional, open-source video editing, rebuilt from scratch in Rust.",
    lede: "Source and program monitors, a real timeline and every trim mode, in a native editor written in pure Rust — down to its own codecs.",
    schemaCategory: "MultimediaApplication",
    platforms: ["macOS", "Windows", "Linux"],
    rustVersion: "1.95",
    features: [
      {
        title: "A timeline you already know",
        body: "Source and program monitors, three-point editing, every trim mode, and J/K/L dynamic trimming.",
      },
      {
        title: "Frame-exact time",
        body: "An integer timebase keeps 23.976 and 29.97 drop-frame exact. No drift, no rounding, no mystery frames.",
      },
      {
        title: "Its own codecs",
        body: "No FFmpeg inside. Native H.264, HEVC, ProRes, VP9, AAC and Opus, with bit-exact decoders.",
      },
      {
        title: "Color grading",
        body: "Curves, color wheels, HSL secondaries, LUTs, HDR and log workflows, plus scopes to check your work.",
      },
      {
        title: "Effects and keyframes",
        body: "About 55 video effects and 30 transitions, keyframes with value and velocity graphs, and a linear-light GPU compositor.",
      },
      {
        title: "Broadcast-ready audio",
        body: "EBU R128 loudness meters, a mixer with automation, and native DSP effects.",
      },
    ],
    shots: [
      {
        file: "color.webp",
        source: "filmcraft-color.png",
        caption: "Scopes and timeline — Charade (1963)",
        alt: "FilmCraft with video scopes, the program monitor showing Charade (1963), and a multi-track timeline",
      },
      {
        file: "hero.webp",
        source: "filmcraft-hero.png",
        caption: "Effect controls — Night of the Living Dead (1968)",
        alt: "FilmCraft's effect controls and timeline editing Night of the Living Dead (1968)",
      },
      {
        file: "keyframes.webp",
        source: "filmcraft-keyframes.png",
        caption: "Keyframes with value and velocity graphs",
        alt: "FilmCraft keyframing scale with value and velocity graphs on a title shot",
      },
      {
        file: "export.webp",
        source: "filmcraft-export.png",
        caption: "Export with destination presets",
        alt: "FilmCraft export screen with H.264 settings and destination presets",
      },
    ],
  },
  {
    slug: "lightcraft",
    prefix: "Light",
    category: "Photo library & raw developer",
    status: "In development",
    headline: ["Your photos. Your pixels. Your ", "machine", "."],
    pitch: "An open-source photo library and raw developer that runs on your machine.",
    lede: "A fast photo library and non-destructive raw developer, written from scratch in pure Rust. No account, no cloud, no telemetry, no subscription.",
    schemaCategory: "MultimediaApplication",
    platforms: ["macOS", "Windows", "Linux", "Web"],
    rustVersion: "1.90",
    features: [
      {
        title: "Non-destructive by design",
        body: "A scene-referred, wide-gamut, 32-bit float pipeline. Your originals are never touched.",
      },
      {
        title: "Every control you reach for",
        body: "Light, color, effects, tone curve, an 8-band color mixer, 3-way color grading wheels and 18 built-in presets.",
      },
      {
        title: "Precise masking",
        body: "Brush, linear and radial gradients, luminance and color ranges, plus sky, subject and background masks.",
      },
      {
        title: "Native raw decoding",
        body: "Pure-Rust decoders for DNG, CR2, ARW, NEF, RAF (including X-Trans), RW2, PEF and ORF, with more on the way.",
      },
      {
        title: "A library that keeps up",
        body: "Albums, ratings, flags, field search and virtualized grids built for big catalogs.",
      },
      {
        title: "Instant feedback",
        body: "The GPU develop pipeline updates a 24 MP raw in about 4 ms per slider move.",
      },
    ],
    shots: [
      {
        file: "hero.webp",
        source: "hero-tetons.jpg",
        caption: "Develop — The Tetons and the Snake River",
        alt: "LightCraft developing Ansel Adams' The Tetons and the Snake River with light and effects sliders",
      },
      {
        file: "grading.webp",
        source: "grading-migrant-mother.jpg",
        caption: "Color grading wheels — Migrant Mother",
        alt: "LightCraft color grading wheels applied to Dorothea Lange's Migrant Mother",
      },
      {
        file: "masking.webp",
        source: "masking.jpg",
        caption: "Sky and radial gradient masks",
        alt: "LightCraft masking panel with a radial gradient mask warming a sunset sky",
      },
      {
        file: "library.webp",
        source: "grid-demo.jpg",
        caption: "Library with albums and ratings",
        alt: "LightCraft library grid with albums, ratings and the develop panel",
      },
    ],
  },
  {
    slug: "printcraft",
    prefix: "Print",
    category: "PDF workbench",
    status: "Early alpha",
    headline: ["The ", "open-source", " PDF workbench."],
    pitch: "The open-source PDF workbench: read, organize, combine, split and secure.",
    lede: "Read, organize, combine, split and secure PDFs in a fast, native app written in Rust from the ground up. No account, no telemetry, no cloud.",
    schemaCategory: "BusinessApplication",
    platforms: ["macOS", "Windows", "Linux", "Web"],
    rustVersion: "1.90",
    features: [
      {
        title: "Faithful rendering",
        body: "World scripts, vertical Japanese, color emoji and transparency. Zero crashes across a 983-file test corpus.",
      },
      {
        title: "Search as you type",
        body: "Instant find, and text selection that follows the document's real reading order.",
      },
      {
        title: "Organize like cards",
        body: "Rotate, delete, insert and reorder pages, with deep undo behind every change.",
      },
      {
        title: "Combine, extract, split",
        body: "Assemble and break apart documents while keeping links, form fields, layers and bookmarks intact.",
      },
      {
        title: "Fearless saves",
        body: "Incremental, atomic saves with autosave and crash recovery.",
      },
      {
        title: "Built-in security",
        body: "Opens everything from RC4 to AES-256 encryption and honors author permissions.",
      },
    ],
    shots: [
      {
        file: "hero.webp",
        source: "printcraft-viewer.png",
        caption: "Viewer with threaded comments",
        alt: "PrintCraft showing a showcase PDF cover with the tools sidebar and threaded comments",
      },
      {
        file: "organize.webp",
        source: "printcraft-organize.png",
        caption: "Organize pages like cards",
        alt: "PrintCraft page organizer with three pages selected for rotate, delete and extract",
      },
      {
        file: "palette.webp",
        source: "printcraft-palette.png",
        caption: "A command palette for every tool",
        alt: "PrintCraft command palette filtering page tools by the word page",
      },
      {
        file: "twoup.webp",
        source: "printcraft-twoup.png",
        caption: "Two-up Read mode, dark theme",
        alt: "PrintCraft two-up Read mode in the dark theme showing typeset specimen pages",
      },
    ],
  },
];

const LIST_FORMAT = new Intl.ListFormat("en", { type: "conjunction" });

/** "a, b and c" — Oxford comma per the en locale. */
export function formatList(items: string[]): string {
  return LIST_FORMAT.format(items);
}

const BROWSER_APP_NAMES = CRAFTING_APPS.filter((app) =>
  app.platforms.includes("Web"),
).map(craftAppName);

// Family-wide rules, shown on the /apps hub.
export const CRAFTING_APPS_PRINCIPLES: Tip[] = [
  {
    title: "Open source",
    body: "Every line is on GitHub under permissive licenses. Read it, fork it, build on it.",
  },
  {
    title: "Native, not wrapped",
    body: "Pure Rust compiled to real desktop apps for macOS, Windows and Linux. No Electron, no web views.",
  },
  {
    title: "Familiar from day one",
    body: "Layouts, tools and shortcuts that working professionals already know, so there's nothing to relearn.",
  },
  {
    title: "Your files, your machine",
    body: "Everything runs locally on your own files. No cloud round-trips between you and your work.",
  },
  {
    title: "Agent-ready",
    body: "Drive every app from a CLI, a JSON control channel or an MCP server, built for automation and AI agents.",
  },
  {
    title: "Also in your browser",
    body: `${formatList(BROWSER_APP_NAMES)} also compile to WebAssembly and run in a browser tab.`,
  },
];

export const CRAFTING_APPS_OG_IMAGE = mediaUrl("/images/apps/og.jpg");

export function getCraftApp(slug: string): CraftApp | undefined {
  return CRAFTING_APPS.find((app) => app.slug === slug);
}

export function craftAppName(app: CraftApp): string {
  return `${app.prefix}Craft`;
}

/** Two-digit lineup position, e.g. "03". */
export function craftAppIndex(app: CraftApp): string {
  return String(CRAFTING_APPS.indexOf(app) + 1).padStart(2, "0");
}

export function craftAppPath(app: CraftApp): string {
  return `/apps/${app.slug}`;
}

export function craftAppRepo(app: CraftApp): string {
  return `${CRAFTING_APPS_GITHUB_ORG}/${app.slug}`;
}

/** Site-relative path; use craftShotUrl for an <img> src. */
export function craftShotPath(app: CraftApp, shot: CraftShot): string {
  return `/images/apps/${app.slug}/${shot.file}`;
}

export function craftShotUrl(app: CraftApp, shot: CraftShot): string {
  return mediaUrl(craftShotPath(app, shot));
}

export function craftShotSourceUrl(app: CraftApp, shot: CraftShot): string {
  return `https://raw.githubusercontent.com/storytold/${app.slug}/main/docs/images/${shot.source}`;
}

export function craftAppOgImage(app: CraftApp): string {
  return mediaUrl(`/images/apps/${app.slug}/og.jpg`);
}

export function craftAppBuildCommand(app: CraftApp): string {
  return [
    `git clone ${craftAppRepo(app)}.git`,
    `cd ${app.slug}`,
    `cargo run --release -p ${app.slug}`,
  ].join("\n");
}
