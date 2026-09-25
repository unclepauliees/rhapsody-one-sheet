# Local Review Results

## Current Single-Scene Redesign

The web design was replaced at the user's request with left-hand copy and a right-hand lunar scene on near-black. The earlier Lighthouse scores below apply to the prior paper layout, not the current experience. No fresh performance claim is made for this redesign.

Current checks: production build passes; lint has no errors (5 pre-existing native-image advisories); detector reports no findings. Desktop 1440x900 and 1024x768 fit one viewport. Mobile 390x844 introduction also fits; 360x800 uses 39px of natural vertical scroll to avoid shrinking or clipping text. No horizontal overflow. All canvases rendered nonblank. Introduction, window selector and expanded studio copy captured at all four sizes. Cream PDF remains unchanged and its generation uses an independent capture route.

## Previous Draft Checks

- Installed exact 21st Lunar Gravity Card; retained lunar texture, click-reveal ring, shader collision and asteroid behavior per user visual override.
- Brand fonts, colors, spine and public copy applied. Private source notes ignored.
- Build and complete assets/PDF pipeline pass.
- Lint: 0 errors; 5 advisory native-image warnings (local SVG/still and print assets).
- Six responsive/theme combinations checked: 390, 768 and 1440 pixels, light and dark. No horizontal overflow or browser exceptions. Canvas nonblank in all six (22,784+ opaque pixels).
- All four moment screenshots captured in both themes. City uses lateral lighting; it does not translate the camera. Master freezes. Original ring remains an additional click interaction.
- Motion, orbital reveal, pause, reduced-motion freeze and keyboard focus order verified.
- PDF: 1 page, 612 x 792 pt. Footer bottom 980.7 px, inside 1008 px half-inch margin limit. Visually inspected and text extracted.
- Lighthouse (local Chrome): desktop Performance 100 / Accessibility 100; mobile Performance 89 / Accessibility 100. Desktop uses desktop throttling; mobile uses default simulated mobile throttling.
- PDF forbidden-term scan: no matches. Internal source identifiers: no matches in authored source or compiled output. No credential markers in lockfile. Generic framework vocabulary prevents a truthful zero-match claim for the entire raw bundle.
- No hero entrance animation was added; the live instrument is the moving focal point. Light theme is default, regardless of system setting, with saved user choice respected.
- Local-only review. No GitHub remote, push, hosting deployment, or DNS changes. Production metadata base remains to be set after subdomain approval.

The latest visual override supersedes the brief's no-photoreal/no-ring and single-signal restrictions. These are deliberate differences, not a claim of literal compliance with the older visual rules.
