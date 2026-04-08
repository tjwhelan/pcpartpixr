# `initScene`

## Summary

在创建新的空间场景容器之前，对容器的初始化做自定义设置。

## Signature

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    defaultSize: {
      width: "1m",
      height: "100px",
      depth: "100px",
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

## Parameters

### sceneName

要初始化的 Spatial Scene 的名称（等价于新窗口的 name）。

如果这个 name 对应的窗口已打开，

### configure

一个回调函数，提供这个 Spatial Scene 当前最新的自定义 scene 配置，并返回要更新的最终配置。

## Return Shape

不返回任何值。

## Side Effects

如果这个空间场景容器（窗口）已打开，这次设置不会带来任何结果，但会影响空间场景容器关闭后再次打开的初始化设置。

下次对相同空间场景容器调用 `initScene`，`defaultConfig` 就是这一次设置的结果。
