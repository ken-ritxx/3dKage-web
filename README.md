# Kage

An interactive five-chapter night walk through a Kyoto mountain temple, rendered live in Three.js and layered with cinematic generated imagery.

[**View the live project**](https://mengto.github.io/kage/) · [**View the source**](https://github.com/MengTo/kage) · [**Read the build prompt**](PROMPT.md)

![Kage preview](assets/kage-preview.webp)

## What it does

- Moves a live WebGL camera through a mountain temple as the page scrolls.
- Combines procedural architecture, lantern light, fog, rain, drifting leaves, a vermilion moon, and a restrained bloom pipeline.
- Layers editorial typography, generated scene plates, and alpha-preserving WebP foreground elements over the 3D world, with section-specific fade and blur transitions.
- Includes chapter navigation, a responsive mobile layout, reduced-motion behavior, and a custom cursor for precise pointer devices.

## How it is made

Kage is a deliberately small static site. `index.html` contains the document structure, CSS, procedural scene construction, scroll choreography, and interaction logic. A vendored Three.js r149 build provides WebGL rendering without a package manager or build step.

The temple, torii, lanterns, moon, terrain, rain, leaves, fog, and post-processing are constructed at runtime. Optimized WebP scene plates and foreground cutouts sit in normal HTML layers, giving the page its collage-like depth while keeping the camera path and lighting live.

## Build or remix it

The portable implementation brief in [PROMPT.md](PROMPT.md) describes the scene structure, layout system, motion language, and quality constraints needed to rebuild or reinterpret the experience.

## Run locally

From the repository root, run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

There is no build step, environment variable, analytics script, or runtime network dependency.

### Quick Start with PowerShell Server

Run in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
This opens [http://127.0.0.1:4173/](http://127.0.0.1:4173/) directly in your browser.

---

## React Component Usage (`@designcodeio/threeui`)

You can import and use `KageLandingPage` in any React / Next.js / Vite project:

```tsx
import { KageLandingPage } from "./KageLandingPage"; // or "@designcodeio/threeui"
import "./style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

### Supported Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headingFont` | `string` | `"onest"` | Font family for headings and display titles |
| `bodyFont` | `string` | `"onest"` | Font family for body paragraphs |
| `headingWeight` | `string \| number` | `"400"` | Font weight for headings (`300`, `400`, `600`, etc.) |
| `bodyWeight` | `string \| number` | `"300"` | Font weight for body copy |
| `primaryColor` | `string` | `"#e0231c"` | Primary vermilion accent color |
| `headingSize` | `number` | `46` | Maximum font size for hero title in pixels |
| `bodySize` | `number` | `17` | Maximum font size for body copy in pixels |
| `headingLetterSpacing` | `number` | `-0.012` | Tracking / letter spacing in em |
| `src` | `string` | `"index.html"` | Path to the standalone HTML scene |

## Project structure

```text
kage-landing-page/
├── index.html                   # Complete 3D WebGL Kyoto temple experience
├── KageLandingPage.tsx          # React component with live dynamic props
├── Scene.tsx                    # Ready-to-use Scene component wrapper
├── style.css                    # Shader frame and container styles
├── index.ts                     # Module exports
├── package.json                 # Package configuration
├── serve.ps1                    # Instant local server runner
├── PROMPT.md                    # Creative brief and design architecture
├── README.md                    # Documentation
├── assets/                      # Preview media
└── secret-pathways-assets/      # Local fonts, Three.js, cutouts & stills
    ├── fonts.css
    ├── three.min.js
    ├── generated/
    └── foreground/png/
```

## Design and attribution

Kage is an original, independent design study inspired by Japanese temple architecture and night gardens. It is not affiliated with a specific temple, cultural institution, or tourism organization.

The cinematic scene plates and foreground artwork were generated for this project using GPT Image 2, then art-directed and composed with the live Three.js scene. The vendored Three.js r149 build retains its MIT license notice and copyright attribution.

## More projects

Other single-file experiments in the same vein — no build step, no framework, everything in one HTML document.

- [**Complete Shelf**](https://mengto.github.io/complete-shelf/) — an original Three.js library of seven interactive clothbound hardcovers. · [source](https://github.com/MengTo/complete-shelf)
- [**Sketchbook**](https://mengto.com) — a page-flipping sketchbook of Singapore: drag to turn the page, drag the magnifier across it. · [source](https://github.com/MengTo/sketchbook)
- [**Agent Skills**](https://github.com/MengTo/Skills) — the reusable skill library these pages are built with, including the [falling leaves](https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/falling-leaves) and [pointer trail](https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/pointer-trail-emitter) techniques extracted from Kage.

## License

No license is currently granted for reuse or redistribution of the original Kage code or artwork. The third-party Three.js runtime remains covered by its included MIT license notice.
