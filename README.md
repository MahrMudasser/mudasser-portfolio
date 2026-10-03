# Mudasser Hussain · Portfolio

My portfolio site: Astro 7 with React islands, TypeScript and MDX. Static HTML on a CDN, with small interactive pieces where they earn it.

- **Home** (`/`): kinetic hero, bento overview, the "Always one level up" trajectory graph, testimonials, writing, FAQ and contact.
- **Writing** (`/blog`): MDX posts with RSS (`/rss.xml`) and a sitemap.
- **Case study** (`/work/iskaan`).
- **404** page.

## Run it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run check      # type-check
```

## Where to edit things

| What | File |
| --- | --- |
| Name, email, links, CV path, booking link | `src/data/site.ts` → `site` |
| Hero roles and intro, About text and tags | `src/data/site.ts` → `hero`, `about` |
| Career steps in the trajectory graph | `src/data/site.ts` → `trajectory` |
| Testimonials (up to six) | `src/data/site.ts` → `testimonials` |
| FAQ | `src/data/site.ts` → `faq` |
| Tech logos | `src/data/icons.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Iskaan case study | `src/pages/work/iskaan.astro` |
| Social preview image, favicons | `public/og.png`, `public/favicon.*` |

**Your CV:** put the PDF at `public/cv/Mudasser-Hussain-CV.pdf`. The nav and contact buttons already link there.

**Testimonials:** replace the placeholder quotes with real ones and set `placeholder: false`.

## Writing a post

1. Add a file to `src/content/blog/`, for example `my-post.md` (or `.mdx` to use components like `<Callout>`).
2. Start it with:

   ```yaml
   ---
   title: My post title
   description: One sentence that says what the reader learns.
   topic: Laravel · Architecture
   date: 2026-11-01
   draft: false
   ---
   ```

3. Push to GitHub. The host rebuilds and the post is live in about a minute.

Drafts (`draft: true`) show in `npm run dev` but never on the live site. The Writing section on the home page and its nav link stay hidden until at least one post is published. The three posts in the folder are drafts: rewrite them in your own words before publishing.

## Deploy

### Netlify

1. Push this folder to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project**, pick the repo. `netlify.toml` already sets the build command (`npm run build`), the output folder (`dist`) and Node 22.
3. Set the environment variable `SITE_URL` to your domain (for example `https://mudasserhussain.dev`).
4. The contact form works with no setup: Netlify Forms finds the form named `contact`. Turn on email notifications under **Forms → Form notifications**.

### Cloudflare Pages

1. Push to GitHub, then in Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Build command `npm run build`, output directory `dist`.
3. Environment variables: `NODE_VERSION = 22`, `SITE_URL = https://your-domain`, and `PUBLIC_FORM_ENDPOINT` set to a free [Formspree](https://formspree.io) form endpoint (Cloudflare has no built-in forms).
4. `public/_headers` sets long caching for built assets.

### Domain

Update `SITE_URL` (or the default in `astro.config.mjs`) and the sitemap line in `public/robots.txt` to your real domain, so social previews, RSS and the sitemap use it.

## Later

- **Comments on posts:** add [Giscus](https://giscus.app) to `src/pages/blog/[...slug].astro`.
- **Writing in a browser:** add Decap CMS or Sanity; both save posts to this repo and trigger a rebuild.
- **Search:** add Pagefind after the build.
- **Selected work on the home page:** the Iskaan case study is live at `/work/iskaan`; link it from a Work section when you bring that back.

## Design

Built from the "Mudasser Hussain" design system: dark Deep Space by default, light Cool studio as the alternate, Space Grotesk / DM Sans / JetBrains Mono, teal for the brand, coral for "next". Motion uses one ease-out curve and respects reduced-motion settings.
