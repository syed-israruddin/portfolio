<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI fidelity rules
- Treat the linked Figma frame as the visual source of truth.
- Reuse existing components and design tokens before adding new ones.
- Match desktop first at 1440px; also verify 768px and 390px.
- Use the existing font stack; do not substitute fonts or icons.
- Preserve exact spacing, radii, shadows, borders, and hierarchy from Figma.
- Prefer semantic HTML and responsive layout over fixed-position pixel art.
- If Figma and the existing design system conflict, preserve the Figma appearance and report the exception.
- Before finishing: run the app, capture screenshots at target widths, compare against Figma, and iterate on visible mismatches.
