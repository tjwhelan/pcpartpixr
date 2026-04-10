# Project Instructions For AI Coding Agents

These instructions apply to this repository only.
If a deeper directory contains another instruction file, the deeper file wins.

## Documentation Priority

1. The `docs/` directory in this repository contains the complete WebSpatial documentation, and there is no need to consult online sources.
2. Start with `docs/introduction/getting-started.md` and `docs/concepts/*`.
   - Use them to understand the WebSpatial model, features, philosophy, platform constraints, setup flow, development workflow, and concepts.
3. Use `docs/api/` as the primary API reference.
   - This is the main source for APIs of WebSpatial SDK.
   - Look up APIs by their exact category and name.

## Sources To Avoid

- Do not rely on `https://webspatial.dev`, the documentation and test cases in the `https://github.com/webspatial/webspatial-sdk` repository or other older remote WebSpatial documentation.
  - When there is any conflict, local `docs/` always wins.

## Working Rules For WebSpatial Tasks

- Before changing WebSpatial code, confirm the required API exists in local docs or package.
- Prefer exact API names and signatures from local docs over memory or guesswork.
- If local docs are incomplete, inspect package typings or source from:
  - `@webspatial/react-sdk`
  - `@webspatial/builder`
  - `@webspatial/platform-visionos`
  - `@webspatial/core-sdk`
  - `https://github.com/webspatial/webspatial-sdk`
  - But do not follow any parts of above sources that conflict with the local `docs/`.
- Direct use of APIs from `@webspatial/core-sdk` is prohibited. Its source code should be used solely as reference material for understanding the functionality of the WebSpatial SDK and resolving complex issues.
- Do not invent APIs from broken links, missing guide pages, or older public docs.
- If documentation is ambiguous, say so explicitly in the final summary and note which fallback source was used.
