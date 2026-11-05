<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- All brand strings (name, domain, tagline, description) come only from `src/config/site.ts` — never hardcode them elsewhere, so a rename stays a one-file edit. Why: the brief demands a single source of truth.
- Landing sections live as small components under `src/components/site/`, composed in `src/routes/index.tsx`. Why: the brief requires the Navbar/Hero/... split.
- `HeroScene`'s exported interface (`HeroSceneProps { className?: string }`) must stay stable; only its body changes (3D scene in Prompt 2). Why: hero layout depends on it.
- Every new semantic color goes into `src/styles.css` as an oklch token in `:root`/`.dark` plus a `@theme inline` mapping — no hardcoded colors in components. Why: keeps the dark design system themable.
- framer-motion props must never receive `undefined` from a ternary (TS `exactOptionalPropertyTypes`) — use `{}` as the off state. Why: strict TS build fails otherwise.
