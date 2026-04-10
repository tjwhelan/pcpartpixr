# `resizability`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), `resizability` affects the constraints applied when a user drags the Spatial Scene to resize it after creation. It can provide separate min and max constraints for the width and height of the Spatial Scene.

## Declared In

For [new Spatial Scenes](../../../concepts/spatial-scenes.md#new-scenes) created in a WebSpatial App, initialization properties must be set through the [`initScene`](../js-api/initScene.md) API.

For the [Start Scene](../../../concepts/spatial-scenes.md#start-scene), initialization properties must be [set through the Web App Manifest](../manifest-options/main-scene.md).

## Type

```ts
{
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}
```

Example of setting a new scene through `initScene`:

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    resizability: {
      minWidth: 100,
      minHeight: "100px",
      maxWidth: 200,
      maxHeight: 200,
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

Example of setting the initial scene through the Web App Manifest:

> Note: In a Web App Manifest, it is recommended to convert property names from camelCase, such as `minWidth`, to lowercase snake_case, such as `min_width`.

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "resizability": {
      "min_width": 100,
      "min_height": "100px",
      "max_width": 200,
      "max_height": 200
    }
  }
}
```

## Default Value

None.

## Accepted Values

- `minWidth`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
- `minHeight`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
- `maxWidth`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
- `maxHeight`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
