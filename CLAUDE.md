@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical

Next.js is pinned to **16.2.1** and React to **19.2.4**. Per `AGENTS.md`, treat this as a version with breaking changes from prior training data. Before writing non-trivial framework code (routing, data fetching, caching, Server/Client components, metadata, fonts, config), consult the bundled docs at `node_modules/next/dist/docs/01-app/` rather than relying on memory.

Tailwind is **v4** via `@tailwindcss/postcss` (no `tailwind.config.*`) — configuration lives in `app/globals.css`.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`).

- `pnpm dev` — start the Next.js dev server
- `pnpm build` — production build
- `pnpm start` — run the built app
- `pnpm lint` — run ESLint (`eslint-config-next`)

There is no test runner configured.

## Architecture

Single-page portfolio at `/` that swaps between four "views" — `home`, `code`, `music`, `vlogs` — without full route changes.

- **Routing model.** The real navigation is hash-based. `app/page.tsx` renders all four views into `components/StudioViewShell.tsx`, which listens to `hashchange` and toggles `display` on each panel with a short exit/enter transition. The files under `app/code/`, `app/coding/`, `app/music/`, `app/vlogs/` exist as standalone routes but the home page is the canonical entry point; intra-app links use `StudioLink` / `TransitionLink` and target `/#code`, `/#music`, `/#vlogs`.
- **Server components + Suspense.** `app/page.tsx` is an async Server Component. The code/music/vlogs sections (`components/sections/*Section.tsx`) are async Server Components wrapped in `<Suspense>` with `SectionFallback`, so each section streams independently while the hero renders immediately.
- **External data integrations (`lib/`).** Each integration reads env vars, returns a typed overview, and **falls back to a hardcoded constant** if credentials are missing or the request fails — this is why the site always renders, even without `.env.local`:
  - `lib/github.ts` — GitHub GraphQL for repo count + YTD contributions
  - `lib/youtube.ts` — YouTube Data API v3 for music + vlogs channels (two channels; see `YOUTUBE_CHANNEL_ID` / `YOUTUBE_VLOGS_CHANNEL_ID`)
  - `lib/popCount.ts` — homepage "pops" counter
  - `lib/duration.ts` — ISO 8601 duration parsing for YouTube
  All network fetches use `{ next: { revalidate: 3600 } }` for ISR-style caching.
- **Static content.** `data/projects.ts`, `data/music.ts`, `data/vlogs.ts` hold curated entries that are merged with live API data in the section components.
- **Theming.** All colors are CSS custom properties (`--primary`, `--surface-highest`, `--on-surface`, `--outline`, etc.) defined in `app/globals.css`. Components use inline `style={{ background: "var(--...)" }}` plus `color-mix(in oklab, ...)` rather than Tailwind color classes. `RandomBackground` picks a background variant on mount.
- **Path alias.** `@/*` maps to the project root (see `tsconfig.json`), e.g. `@/components/Navbar`, `@/lib/github`.

## Environment

Copy `.env.example` to `.env.local`. All integrations degrade gracefully when a key is absent, so partial configuration is fine for local dev. Keys in use: `GITHUB_TOKEN`, `GITHUB_USERNAME`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, `YOUTUBE_VLOGS_CHANNEL_ID`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`.
