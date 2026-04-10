# `worldAlignment`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), `worldAlignment` affects how a Spatial Scene behaves when the user drags it vertically after creation.

Only Spatial Scenes of type `volume` support `worldAlignment`.

## Declared In

For [new Spatial Scenes](../../../concepts/spatial-scenes.md#new-scenes) created in a WebSpatial App, initialization properties must be set through the [`initScene`](../js-api/initScene.md) API.

For the [Start Scene](../../../concepts/spatial-scenes.md#start-scene), initialization properties must be [set through the Web App Manifest](../manifest-options/main-scene.md).

## Type

`"automatic" | "gravityAligned"`

Example of setting a new scene through `initScene`:

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    worldAlignment: "gravityAligned",
  };
});
window.open(newSceneUrl, "newSceneName");
```

Example of setting the initial scene through the Web App Manifest:

> Note: In a Web App Manifest, it is recommended to convert property names from camelCase, such as `worldAlignment`, to lowercase snake_case, such as `world_alignment`.

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "world_alignment": "gravityAligned"
  }
}
```

## Default Value

`"automatic"`

## Accepted Values

- `"automatic"`: tilts automatically during vertical movement so it always faces the user
- `"gravityAligned"`: does not tilt automatically during vertical movement and always stays aligned with gravity like a real-world object
