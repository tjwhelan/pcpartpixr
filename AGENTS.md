# Project Instructions For AI Coding Agents

These instructions apply to this repository only.
If a deeper directory contains another instruction file, the deeper file wins.

## Documentation Priority

1. Start with `docs/introduction/getting-started.md`.
   - Use it to understand the WebSpatial model, platform constraints, setup flow and development workflow.
2. Use `docs/api/react-sdk/` as the primary API reference.
   - This is the main source for APIs of WebSpatial SDK.
   - Look up APIs by their exact category and name.
3. Use `docs/how-to/` only for setup and integration topics.
   - Examples: SSR, Rspack, non-TypeScript projects, minimal PWA setup, Xcode, App Store Connect.

## Sources To Avoid

- Do not use any document under `docs/guide/`.
  - Some local docs link to that path, but those files are intentionally unavailable in this repository.
- Do not use `docs/introduction/core-concepts.md`.
  - It is missing in this repository.
- Do not rely on `https://webspatial.dev` or other older remote WebSpatial documentation.
  - When there is any conflict, local `docs/` always wins.

## Working Rules For WebSpatial Tasks

- Before changing WebSpatial code, confirm the required API exists in local docs or package typings.
- Prefer exact API names and signatures from local docs over memory or guesswork.
- If local docs are incomplete, inspect package typings or source from:
  - `@webspatial/react-sdk`
- Do not invent APIs from broken links, missing guide pages, or older public docs.
- If documentation is ambiguous, say so explicitly in the final summary and note which fallback source was used.

## Common Commands

- `pnpm dev`
- `pnpm dev:webspatial`: only for packaging website into a packaged hybird App with built-in WebSpatial Runtime on visionOS emulator
- `pnpm build`
- `pnpm lint`

## Change Discipline

- Keep changes small, testable, and aligned with the currently documented local API.
- Prefer adapting the existing React structure over speculative refactors.
- When docs and code appear inconsistent, trust local docs for intended usage and verify exact names against installed package typings when available.
