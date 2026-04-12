# WebSpatial PC Part Picker

A **spatial computing demo** built with the [WebSpatial](https://tpac2025.webspatial.dev/) React SDK. You browse PC components in floating panels, preview each part as a **3D GLB model**, assemble a full **eight-slot build** (CPU, motherboard, GPU, RAM, storage, cooler, PSU, case), and when the build is complete you can **spawn a combined gaming PC model** in the scene and move it with spatial (or pointer) drag.

The app is designed to run as a normal **Vite + React** site in the browser and to **light up** on visionOS / other WebSpatial runtimes where UI can sit in real space with volumetric panels and 3D content.

## What it does

- **Components list** — Tabbed catalog backed by `src/data/pcComponents.json`; each part has specs, price, and a `modelUrl` under `public/models/`.
- **Details panel** — Shows the selected part’s information and an **Add to build** action.
- **Your build** — Lists chosen parts, running subtotal, and per-slot remove. Progress is shown as *N of 8 components*.
- **Create PC model** — Enabled only when all eight slots are filled. Spawns `public/models/free_gaming_pc.glb` (full machine) as a draggable 3D object; clearing the build resets placement state.
- **Spatial layout** — Panels use WebSpatial patterns (`enable-xr-monitor`, spatialized tiles, `Model` / `Reality` where appropriate). On non-spatial browsers the same React tree still runs; spatial APIs are ignored per SDK behavior.

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | React 19 |
| Build | Vite 8, TypeScript 5.9 |
| Spatial | `@webspatial/react-sdk`, `@webspatial/core-sdk` (transitive; app code should follow project rules and use React SDK surface) |
| 3D (fallback / helpers) | `three`, `@react-three/fiber`, `@react-three/drei` |
| Routing | `react-router-dom` is installed but the app currently mounts a single `PCBuilder` screen from `App.tsx` |
| Lint | ESLint 9 + TypeScript ESLint |

**Dev tooling for native packaging:** `@webspatial/builder`, `@webspatial/platform-visionos` (visionOS hybrid app workflow).

**Package manager:** [pnpm](https://pnpm.io/) (version pinned in `package.json`).

> **Note:** `package.json` still uses the name `webspatial-starter`; you may rename it when publishing or forking.

## Prerequisites

- **Node.js** (LTS recommended) and **pnpm**.
- For **`pnpm dev:webspatial`**: Apple Silicon Mac, Xcode, visionOS simulator (or device), per [local docs](./docs/how-to/xcode.md). The script wraps `webspatial-builder run` against your dev server URL.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Vite dev server (default `http://localhost:5173/`) |
| `pnpm build` | `tsc -b` then production Vite build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | ESLint |
| `pnpm dev:webspatial` | Run the app inside the WebSpatial builder for visionOS packaging / spatial preview (`--base=http://localhost:5173/` — start `pnpm dev` first) |

## Project layout (high level)

```
src/
  App.tsx                 # Renders PCBuilder
  components/
    PCBuilder.tsx         # State: build, selection, full-PC spawn
    BuildList.tsx         # Build summary + Create PC model
    ComponentSelector.tsx # Catalog list
    ComponentInfo.tsx     # Specs / price
    ComponentModelPreview.tsx
    SpatialPanel.tsx      # Shared spatial panel shell
    SpawnedFullPcModel.tsx
  data/pcComponents.json
  types/pc.ts
public/models/            # GLB assets referenced by JSON
docs/                     # Bundled WebSpatial documentation (authoritative for this repo)
```

The **`backend/`** directory is a **separate** Express + SQLite task API sample; the PC picker **does not call it**. See [`backend/README.md`](./backend/README.md) only if you intend to run that server.

## Customizing content

- **Parts and prices:** edit `src/data/pcComponents.json` and ensure `modelUrl` paths match files under `public/models/`.
- **Full PC asset:** replace or retarget the model used when the build is complete (see `SpawnedFullPcModel.tsx` and the path used for the spawned GLB).
- **Look and feel:** global tokens in `src/index.css`; layout and spatial styling in `src/App.css`.

## Documentation

This repository ships **full WebSpatial docs** under [`docs/`](./docs/). For AI assistants and contributors, **`docs/` takes precedence** over older public references; start with [`docs/introduction/getting-started.md`](./docs/introduction/getting-started.md) and [`docs/concepts/`](./docs/concepts/).

The previous boilerplate README listed many deep links into `docs/api/`; those paths are unchanged if you need API-level detail.

## AGENTS / tooling

[`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md) describe how coding agents should use local `docs/` and WebSpatial packages in this repo.
