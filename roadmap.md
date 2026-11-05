# Roadmap

> Latest update: 2026-11-05

## Prompt 1 — Foundation, design system and all sections ✅
- Landing page complete: navbar, hero (animated orb + glass chips), built-for strip,
  problem, how it works, features bento, why it matters, FAQ, final CTA, footer.
- Design system (dark, Space Grotesk/Inter/JetBrains Mono, glass, grid + noise) in `src/styles.css`.
- Single source of truth: `src/config/site.ts`. Waitlist form: `src/lib/waitlist.ts` (simulated submit) + `src/components/site/waitlist-form.tsx` (zod, honeypot, success state).
- 3D packages installed but unused: @react-three/fiber, @react-three/drei, @react-three/postprocessing.

## Prompt 2 — 3D hero scene (pending)
- Replace the inside of `src/components/site/hero-scene.tsx` with a 3D scene
  (@react-three/fiber + drei + postprocessing). Keep the exported component
  interface (`HeroSceneProps { className?: string }`) stable — the hero layout
  depends on it.
