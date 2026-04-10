# `baseplateVisibility`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md). Only Spatial Scenes of type `volume` support `baseplateVisibility`, and it affects the visibility of the baseplate under the Volume.

## Declared In

For [new Spatial Scenes](../../../concepts/spatial-scenes.md#new-scenes) created in a WebSpatial App, initialization properties must be set through the [`initScene`](../js-api/initScene.md) API.

For the [Start Scene](../../../concepts/spatial-scenes.md#start-scene), initialization properties must be [set through the Web App Manifest](../manifest-options/main-scene.md).

## Type

`"automatic" | "hidden"`

Example of setting a new scene through `initScene`:

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    baseplateVisibility: "hidden",
  };
});
window.open(newSceneUrl, "newSceneName");
```

Example of setting the initial scene through the Web App Manifest:

> Note: In a Web App Manifest, it is recommended to convert property names from camelCase, such as `baseplateVisibility`, to lowercase snake_case, such as `baseplate_visibility`.

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "baseplate_visibility": "hidden"
  }
}
```

## Default Value

`"automatic"`

## Accepted Values

- `"automatic"`: the baseplate is shown when needed
- `"hidden"`: the baseplate is always hidden
