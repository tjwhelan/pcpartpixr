# `defaultSize`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), `defaultSize` affects the size of a Spatial Scene immediately after it is created. It does not necessarily match the values in `defaultSize` exactly, because the operating system's [spatial computing](../../../concepts/spatial-computing.md) logic still takes priority.

For a Spatial Scene of type `window`, only `width` and `height` can be set.

For a Spatial Scene of type `volume`, `depth` can also be set in addition to `width` and `height`.

## Declared In

For [new Spatial Scenes](../../../concepts/spatial-scenes.md#new-scenes) created in a WebSpatial App, initialization properties must be set through the [`initScene`](../js-api/initScene.md) API.

For the [Start Scene](../../../concepts/spatial-scenes.md#start-scene), initialization properties must be [set through the Web App Manifest](../manifest-options/main-scene.md).

## Type

```ts
{
  width?: number | string
  height?: number | string
  depth?: number | string
}
```

Example of setting a new scene through `initScene`:

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    defaultSize: {
      width: 500,
      height: "1000px",
      depth: "1m",
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

Example of setting the initial scene through the Web App Manifest:

> Note: In a Web App Manifest, it is recommended to convert property names from camelCase, such as `defaultSize`, to lowercase snake_case, such as `default_size`.

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "default_size": {
      "width": 500,
      "height": "1000px"
    }
  }
}
```

## Default Value

None.

## Accepted Values

- `width`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
- `height`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
- `depth`: a number, with `px` as the default unit, or a string with a unit suffix such as `"100px"` or `"2m"`
