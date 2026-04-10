# `type`

During the [initialization phase](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), you can set the [scene type](../../../concepts/spatial-scenes.md#scene-type).

## Declared In

For [new Spatial Scenes](../../../concepts/spatial-scenes.md#new-scenes) created in a WebSpatial App, the scene type must be set through the [`initScene`](../js-api/initScene.md) API.

For the [Start Scene](../../../concepts/spatial-scenes.md#start-scene), the scene type must be [set through the Web App Manifest](../manifest-options/main-scene.md).

## Type

`"window" | "volume"`

Example of setting the type for a new scene through `initScene`:

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
  };
});
window.open(newSceneUrl, "newSceneName");
```

Example of setting the initial scene through the Web App Manifest:

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume"
  }
}
```

## Default Value

`"window"`

## Accepted Values

- `"window"`: primarily serves [GUI needs](../../../concepts/spatial-scenes.md#scene-type)
- `"volume"`: simulates a [real-world object](../../../concepts/spatial-scenes.md#scene-type)
