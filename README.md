# React + TypeScript + Vite + WebSpatial

This template provides a minimal setup to get React working in Vite with WebSpatial SDK.

## Commands

- `pnpm dev`
- `pnpm dev:webspatial`: only for packaging the website into a packaged hybrid app with the built-in WebSpatial Runtime on the visionOS emulator

## Docs Guide

This repository includes a local [`docs/`](./docs/) directory with the main WebSpatial documentation for this boilerplate. When working in this repo, prefer the local docs first instead of older remote references.

- Start here: [Getting Started](./docs/introduction/getting-started.md)
- Understand the model:
  - [Spatial Computing](./docs/concepts/spatial-computing.md)
  - [WebSpatial App](./docs/concepts/webspatial-app.md)
  - [Spatial Scenes](./docs/concepts/spatial-scenes.md)
  - [Spatialized HTML Elements](./docs/concepts/spatialized-html-elements.md)
  - [3D Content Containers](./docs/concepts/3d-content-containers.md)
  - [Natural Interactions](./docs/concepts/natural-interactions.md)
- API reference:
  - Spatial Scene Options: [type](./docs/api/react-sdk/scene-options/type.md), [defaultSize](./docs/api/react-sdk/scene-options/defaultSize.md), [worldAlignment](./docs/api/react-sdk/scene-options/worldAlignment.md), [worldScaling](./docs/api/react-sdk/scene-options/worldScaling.md), [resizability](./docs/api/react-sdk/scene-options/resizability.md), [baseplateVisibility](./docs/api/react-sdk/scene-options/baseplateVisibility.md)
  - CSS APIs: [back](./docs/api/react-sdk/css-api/back.md), [background-material](./docs/api/react-sdk/css-api/background-material.md), [depth](./docs/api/react-sdk/css-api/depth.md), [transform](./docs/api/react-sdk/css-api/transform.md)
  - DOM APIs: [clientDepth](./docs/api/react-sdk/dom-api/clientDepth.md), [innerDepth](./docs/api/react-sdk/dom-api/innerDepth.md), [offsetBack](./docs/api/react-sdk/dom-api/offsetBack.md), [userAgent](./docs/api/react-sdk/dom-api/userAgent.md)
  - JS APIs: [initScene](./docs/api/react-sdk/js-api/initScene.md), [useMetrics](./docs/api/react-sdk/js-api/useMetrics.md), [convertCoordinate](./docs/api/react-sdk/js-api/convertCoordinate.md)
  - Spatial Events: [Spatial Tap](./docs/api/react-sdk/event-api/spatial-tap.md), [Spatial Drag](./docs/api/react-sdk/event-api/spatial-drag.md), [Spatial Rotate](./docs/api/react-sdk/event-api/spatial-rotate.md), [Spatial Magnify](./docs/api/react-sdk/event-api/spatial-magnify.md)
  - React Components:
    - [JSX Markers](./docs/api/react-sdk/react-components/jsx-marker.md): [enable-xr](./docs/api/react-sdk/react-components/jsx-marker.md#enable-xr), [enable-xr-monitor](./docs/api/react-sdk/react-components/jsx-marker.md#enable-xr-monitor)
    - [Model](./docs/api/react-sdk/react-components/Model.md)
    - [Reality](./docs/api/react-sdk/react-components/Reality.md): [Material / ModelAsset / AttachmentAsset](./docs/api/react-sdk/react-components/Reality.md#3d-assets), [World / SceneGraph](./docs/api/react-sdk/react-components/Reality.md#scene-graph), [Entity](./docs/api/react-sdk/react-components/Reality.md#base-entity), [Box / Plane / Sphere / Cone / Cylinder](./docs/api/react-sdk/react-components/Reality.md#primitive-entities), [ModelEntity](./docs/api/react-sdk/react-components/Reality.md#model-entity), [AttachmentEntity](./docs/api/react-sdk/react-components/Reality.md#attachment-entity)
  - Builder CLI:
    - [run](./docs/api/builder/run.md): [--base](./docs/api/builder/run.md#--base), [--manifest](./docs/api/builder/run.md#--manifest), [--manifest-url](./docs/api/builder/run.md#--manifest-url), [--project](./docs/api/builder/run.md#--project)
    - [build](./docs/api/builder/build.md): [--teamId](./docs/api/builder/build.md#--teamid), [--bundle-id](./docs/api/builder/build.md#--bundle-id), [--export](./docs/api/builder/build.md#--export), [--base](./docs/api/builder/build.md#--base), [--manifest](./docs/api/builder/build.md#--manifest), [--manifest-url](./docs/api/builder/build.md#--manifest-url), [--project](./docs/api/builder/build.md#--project)
    - [publish](./docs/api/builder/publish.md): [--u](./docs/api/builder/publish.md#--u), [--p](./docs/api/builder/publish.md#--p), [--teamId](./docs/api/builder/publish.md#--teamid), [--bundle-id](./docs/api/builder/publish.md#--bundle-id), [--version](./docs/api/builder/publish.md#--version), [--export](./docs/api/builder/publish.md#--export), [--base](./docs/api/builder/publish.md#--base), [--manifest](./docs/api/builder/publish.md#--manifest), [--manifest-url](./docs/api/builder/publish.md#--manifest-url), [--project](./docs/api/builder/publish.md#--project)
- Additional how-to guides:
  - [Minimal PWA](./docs/how-to/minimal-pwa.md)
  - [Xcode / visionOS Setup](./docs/how-to/xcode.md)
  - [App Store Connect](./docs/how-to/app-store-connect.md)
