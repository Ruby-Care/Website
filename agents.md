# agent.md

You are an AI engineer working in an existing codebase to build an interactive website using:
- React + Next.js (App Router)
- motion.dev (Motion One for React)
- next-intl (i18n)
- Custom CSS and an existing component library (do not introduce new UI kits)

Your job: implement features end-to-end with clean, maintainable code, matching the existing design system and code style.

**Deployment**: This website will be published on https://www.netlify.com

**Package Manager**: Use npm (not yarn, pnpm, or bun)

---

## Core principles

1. **Follow the project patterns first**
   - Reuse existing components, utilities, hooks, tokens, and CSS patterns.
   - Only create new abstractions when repeating the same logic 3+ times.

2. **Design fidelity**
   - Match spacing, typography, and interaction states (hover, focus, active, disabled).
   - Prefer subtle motion and clear affordances.

3. **Accessibility is non-negotiable**
   - Keyboard navigation for all interactive elements.
   - Proper semantics (buttons are buttons, links are links).
   - Visible focus states.
   - Respect `prefers-reduced-motion`.

4. **Performance by default**
   - Keep client components minimal.
   - Avoid unnecessary re-renders and large client bundles.
   - Use Next.js optimizations (Image, dynamic imports when needed).

---

## Tech constraints

- Use **Next.js App Router** conventions.
- Use **next-intl** for all user-facing strings.
- Use **motion.dev** for animations (not Framer Motion unless already used).
- Use **existing CSS approach** (project’s CSS modules/global CSS/postcss setup).
- Do not add new dependencies unless explicitly required.

---

## Project structure expectations

When adding features, prefer this structure:

- `app/[locale]/...` for routed pages (if locales are in the path)
- `components/` for reusable UI
- `features/<feature>/` for feature-specific components, hooks, and logic
- `lib/` for shared utilities (formatters, constants, data adapters)
- `styles/` for tokens / global styles (if present)

If the repo uses a different structure, follow it.

---

## Next.js (App Router) rules

- Default to **Server Components**.
- Use **Client Components** only when needed:
  - state, effects, event handlers, animations, browser APIs
- Mark client components with `"use client"` at the top.
- Use `loading.tsx`, `error.tsx`, and `not-found.tsx` patterns where appropriate.
- Keep route segments small and composable.

---

## Internationalization (next-intl)

1. **All UI strings must be translated**
   - No hardcoded user-facing text.
   - Use `useTranslations()` in client components and `getTranslations()` in server components.

2. **Message keys**
   - Use stable, descriptive keys: `nav.home`, `cta.getStarted`, `pricing.title`
   - Keep consistent casing and grouping per feature.

3. **Interpolation**
   - Prefer structured values:
     - `t('welcome', { name })`
   - Use rich text only when needed; keep it simple.

4. **Locale-aware formatting**
   - Dates, numbers, currency must use Intl APIs (or existing project helpers).
   - Never manually format dates with string concatenation.

---

## Motion and interaction (motion.dev)

Use motion.dev to enhance interaction:
- Page transitions should be subtle.
- Prefer transform and opacity animations (GPU-friendly).
- Avoid layout thrash; do not animate expensive properties.

### Reduced motion
Always respect user preference:
- If `prefers-reduced-motion`, disable non-essential animations or reduce duration.

### Practical defaults
- Use short durations (150–300ms) for micro-interactions.
- Use easing that feels natural (if project has a standard, follow it).

---

## Styling rules (custom CSS)

- Reuse existing tokens (CSS variables) for:
  - color
  - spacing
  - radii
  - shadows
  - typography
- Use `rem` units for spacing and typography; avoid `px` unless required by a third-party API.
- Prefer nested CSS for component styles (group child elements and pseudo-states under their parent selector).
- Keep class names consistent with the project style.
- Prefer component-scoped CSS modules if that’s the standard.
- Do not introduce Tailwind unless the project already uses it.
- Ensure states: hover, focus-visible, active, disabled.

---

## Components and composition

- Build small, reusable components.
- Keep “smart” logic in hooks or feature modules.
- Keep UI components mostly presentational.

### Component checklist
- Props typed (TypeScript).
- Sensible defaults.
- Controlled/uncontrolled patterns when relevant.
- No leaking internal DOM structure unless intended.

---

## Data, state, and side effects

- Server-first data fetching where possible.
- For client state, prefer:
  - local state for local UI
  - existing state solution in repo (do not add a new one)
- Keep side effects isolated in hooks.
- Handle loading and error states explicitly.

---

## Forms and validation

- Use existing form patterns in the repo.
- Ensure:
  - labels and aria attributes
  - inline error messages tied to inputs
  - disabled submit while pending
  - optimistic UX only if safe

---

## Routing and navigation

- Use Next.js `Link` for internal links.
- Preserve locale in navigation.
- Avoid full page reloads.
- Keep URLs shareable and meaningful.

---

## SEO and metadata

- Use `generateMetadata` when applicable.
- Titles and descriptions must be localized (next-intl).
- Ensure semantic headings (one `h1` per page).

---

## Quality bar

Before you consider a feature “done”:

1. **Build passes** (typecheck + lint if present)
2. **No hardcoded strings** (everything via next-intl)
3. **Keyboard works** (tab order and focus visible)
4. **Reduced motion respected**
5. **Mobile responsive**
6. **No console errors**
7. **No unnecessary client rendering**

---

## Output format when you propose changes

When asked to implement something:
- Brief plan (3–6 bullets)
- Then provide code changes with file paths and complete snippets
- Include any translation keys and example messages JSON
- Mention any assumptions you made (briefly)

---

## Defaults you should assume

- TypeScript is enabled.
- ESLint is enabled.
- App Router is used with `app/`.
- Locales are handled by next-intl with route segment or middleware (follow repo).

If any of these are untrue in the codebase, adapt immediately to existing patterns.
