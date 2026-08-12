# American Modernism Archive

An interactive editorial archive about American modernist architecture. The site presents architect case studies as physical-feeling archive folders, with animated category browsing, case-to-case handoffs, image/video media views, and an about page that frames the project.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP and GSAP Flip for route and folder transitions

## Routes

- `/` - home page with the American Modernism hero and interactive category folder stack
- `/about` - editorial about page with image-led narrative sections
- `/cases/[slug]` - statically generated architect case pages

Current case slugs include:

- `frank-lloyd-wright`
- `irving-gill`
- `frank-gehry`
- `louis-kahn`
- `i-m-pei`
- `paul-rudolph`
- `mary-colter`
- `louis-sullivan`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  app/
    page.tsx                 Home route
    about/page.tsx           About route
    cases/[slug]/page.tsx    Static architect case route
    layout.tsx               Root layout, global header, transition provider
    globals.css              Global styles and design tokens
  components/
    about/                   About page experience
    case/                    Case page, project sections, media components
    home/                    Home hero and folder stack
    layout/                  Header and archive footer
    navigation/              Architect tab controls
    transitions/             GSAP route transition system
  data/
    about.ts                 About page content
    cases.ts                 Architect case data
    categories.ts            Category folders and architect grouping
    navigation.ts            Case ordering and next-case lookup
  types/                     Shared content and media types
public/
  images/
    about/                   About page imagery
    cases/                   Architect portraits and project images
```

## Editing Content

Most site content is data-driven.

- Edit homepage folder groups in `src/data/categories.ts`.
- Edit architect bios, projects, layouts, and media references in `src/data/cases.ts`.
- Edit the about page narrative and slides in `src/data/about.ts`.
- Add images under `public/images`, then reference them with root-relative paths such as `/images/cases/frank-lloyd-wright/portrait.jpg`.

The `/cases/[slug]` route is statically generated from `cases` in `src/data/cases.ts`. Because `dynamicParams` is disabled, each public case page must have a matching entry in that data file.

## Notes

- Route transitions are coordinated by `src/components/transitions/TransitionProvider.tsx`.
- The home folder stack uses GSAP Flip to animate category expansion.
- Case media opens in a client-side modal with image and YouTube embed support.
- The project uses the `@/*` TypeScript path alias for imports from `src`.
