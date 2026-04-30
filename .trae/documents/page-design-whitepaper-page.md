# Page Design Spec — Whitepaper Addition (Desktop-first)

## Global Styles (applies to all pages)
- Theme: dark, high-contrast; reuse existing tokens/classes (e.g., `bg-neutral-950`, `text-neutral-400`, `text-brand-accent`).
- Typography: Display (hero/headings, uppercase, tight tracking) + Mono (labels/meta) + Sans (body).
- Links: underline-on-hover; external links show external indicator; use `target="_blank"` + `rel="noopener noreferrer"`.
- Layout: max content width 64–80rem; generous vertical rhythm (96–192px section spacing on desktop).

---

## Page: Home (update)
### Layout
- Keep existing stacked sections; no layout restructure required.

### Meta Information
- Title: “Only Institute — Deterministic AGI Manifesto”
- Description: “A Cognitive OS built on absolute mathematics.”

### Sections & Components (change scope)
1. Pillars Grid
   - Memory card (“Memory / HelixDB Graph-Vectors”):
     - Convert the CTA area (currently “Technical Spec”) into a clear navigation link/button to `/whitepaper`.
     - CTA label: “Read Whitepaper” (or equivalent) while preserving existing style.
     - Interaction: hover accent highlight consistent with card’s `accent` color.

---

## Page: Whitepaper (new)
### Layout
- Single-column reading layout using CSS Grid (1 column) with a sticky in-page table of contents (optional) on large screens.
- Desktop-first breakpoints:
  - ≥1024px: 2-column grid (content + right-side “References” / TOC)
  - <1024px: stacked (content then references)

### Meta Information
- Title: “Whitepaper — Deterministic AGI Manifesto”
- Description: “Foundational document for the Cognitive OS and its mathematical pillars.”
- Open Graph: `og:title`, `og:description`, `og:type=website`.

### Page Structure
1. Header
   - Title, version/date line, 1–2 sentence abstract.
   - Primary CTA: “Download PDF” (if/when a PDF exists) or omit if not available yet.
2. Content Sections (read-only)
   - “Abstract / Summary”
   - “The Problem” (amnesia, hallucinations, context loss)
   - “Six Pillars Overview” (short subsections consistent with Home pillars)
   - “Conclusion”
3. References (required external links)
   - Clearly labeled “External References” card/list with three links:
     - https://helix-db.com
     - https://primeswarmAGI.com
     - https://primeintegerrelations.com
   - Each link opens in new tab and is visually marked as external.

### Interaction States
- Headings: anchor-on-hover (optional).
- External links: hover color to `brand-accent`; focus ring visible for keyboard navigation.
