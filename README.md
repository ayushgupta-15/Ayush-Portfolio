# Ayush Gupta, portfolio

Live: https://ayushportfolio15.vercel.app

A scroll-driven portfolio. The intro is a real-time three.js scene: a chip with a glowing die, a dive through it, then three chapters (hardware, systems, products) with floating panels of real code from my repositories. Below it are my experience, projects, about and contact sections.

Phones and tablets get a lighter version of the scene. Reduced-motion users and browsers without WebGL get a static intro with the same content as text and code blocks.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- three.js with react-three-fiber, post-processing with `@react-three/postprocessing`
- Lenis for smooth scrolling, Framer Motion for scroll-linked values
- Plain CSS, no UI framework

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

```
app/                 layout, page, global styles, favicon
components/
  Experience.tsx     preloader, HUD, chapters, static fallback
  scene/World.tsx    chip, tunnel, code panels, stars, post-processing
  scene/panelTexture.ts   draws code snippets onto canvas textures
  Reveal.tsx, Tilt.tsx, SiteNav.tsx, Starfield.tsx, ...
lib/
  data.ts            experience, projects and skills
  snippets.ts        the code shown in the 3D panels
```

The code panels in the intro are real excerpts, each labelled with its file and repository.
