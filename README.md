# Rafael Xavier Oliveira — Portfolio

Personal engineering portfolio built with Next.js (App Router), TypeScript, Tailwind CSS 4, next-intl and next-themes.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (CSS-variable design tokens in `src/app/globals.css`)
- **i18n:** next-intl — locales `en` (default) and `pt`, prefixed routing (`/en`, `/pt`)
- **Theme:** next-themes — light/dark, class-based, system preference on first visit
- **Icons:** lucide-react + two hand-rolled brand SVGs (`src/components/ui/brand-icons.tsx`) since `lucide-react` no longer ships GitHub/LinkedIn marks

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
messages/            English/Portuguese UI copy (en.json, pt.json)
src/
  app/[locale]/       Root layout + page (locale-aware)
  components/
    sections/         One component per page section (Hero, SelectedProjects, ...)
    ui/                Reusable primitives (Button, ProjectCard, TimelineItem, ...)
    providers/         Client-side providers (theme)
  data/                Typed, locale-agnostic content (projects, stack, labs, social, ...)
  i18n/                next-intl routing/navigation/request config
  lib/                 utils (cn) + GitHub stars fetcher
public/projects/       Cached real project screenshots
```

Project case-study copy lives in `messages/*.json` under each `projects.items.<slug>` key; structural data (repo owner/name, links, tech list) lives in `src/data/projects.ts`. The two are joined in `SelectedProjects`.

## Content integrity

Every project, contribution, and stat on this site is sourced from the public GitHub repositories and Rafael's CV — nothing is fabricated. Where a fact couldn't be verified (e.g. missing screenshots), the site uses an original abstract illustration instead of a fake screenshot.

## Known follow-ups

- **Résumé download**: no CV PDF exists in the repo yet, so the "Download résumé" CTA from the original brief is omitted. Add a file at `public/rafael-xavier-cv.pdf` and re-add the button in `src/components/sections/hero.tsx` once available.
- **Production domain**: `NEXT_PUBLIC_SITE_URL` env var controls `metadataBase`, OpenGraph URLs, and the sitemap; defaults to `http://localhost:3000`. Set it to the real deployed domain before shipping.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
