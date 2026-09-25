# Project Rhapsody: Partner One-Sheet

Partner review site, separate from both the coming-soon site and investor deck. Publication was approved on September 24, 2026. Repository: `unclepauliees/rhapsody-one-sheet`. GitHub Actions publishes `main` to GitHub Pages.

Latest web design: one dark composition, copy left and a full-height lunar scene right. Supporting text is in three tabs. The cream PDF stays independent. Use `node scripts/space-qa.mjs` for current layout checks; the earlier multi-section screenshot and Lighthouse reports describe the previous draft, not this redesign.

## Run

Requires Node 22+ and Chrome installed locally.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3188
```

Production preview: `npm run build` then `npm start -- --hostname 127.0.0.1 --port 3188`.

## Generate Deliverables

`npm run build:all` builds the app, captures both instrument stills and generates `public/Project-Rhapsody-One-Sheet.pdf`. The PDF script enforces one 612 x 792 pt Letter page and half-inch bottom clearance. Temporary build servers bind only to loopback port 3198 and stop when complete. Port 3198 must be unused.

`npm run lint`, `node scripts/qa.mjs`, `node scripts/interaction.mjs`, and `node scripts/lighthouse.mjs` run additional checks. Screenshots and audit JSON files are in `screenshots/` (gitignored). Local Chrome uses software WebGL in automated checks, which is slower than normal hardware rendering.

## Content and Brand

Edit `src/config/brand.ts` for copy, contact, reveal date, origin note and parent attribution. The supplied lockup is outlined artwork: a trademark rename also needs replacement approved logo assets referenced in that config. All fonts are self-hosted with their OFL notices. Theme defaults to light; explicit choice is stored locally.

The exact `alexperezcedeno/lunar-gravity-card` was installed through the authenticated 21st CLI. It retains its texture, sphere, particle shader, asteroid interaction and orbit controls. Colors, outer layout and additional moment states were adapted. The user's subsequent visual override supersedes the original brief's matte/no-ring restrictions. Private component and brand notes are excluded from version control.

The scene loads when substantially visible, pauses offscreen, offers a pause control and obeys reduced motion. Drag changes view; the orbit icon or sphere click reveals the original orbital effect. Four choices change lighting and point position; master freezes the composition. If WebGL is unavailable, a generated still is shown. The city state uses side lighting rather than moving the camera.

## Review Before Publishing

- Confirm visual direction and all public capability statements, especially network segregation.
- Custom domain: `1sheet.project-rhapsody.com`. See `DNS.md` for the DNS record and final switch.
- Pages automatically supplies the build base path and metadata origin for either the review URL or custom domain.
- Keep private source material and `NOTES_*.md` out of public files and commits.
- The public page and PDF contain no internal Brand OS source document. Framework bundles necessarily contain terms such as `slot` and `payload`; a literal zero-hit scan of framework code is not a meaningful content guarantee.

No credentials are in this project. Authentication belongs to the locally installed 21st CLI only.
