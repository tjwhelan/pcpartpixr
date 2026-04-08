# `userAgent`

## Summary

读取 Volume 类型空间场景容器（窗口）的深度/厚度。

## Exposed On

`Navigator` 对象上可以访问这个属性。

## Mental Model

如果 User Agent 字符串：

如果能匹配到 `/WebSpatial\/(\S+)/`，说明当前运行环境有 WebSpatial Runtime，版本号是这个 Runtime 能全面支持的 React SDK 的 npm 包版本。

如果能匹配到 `/\sVR\s/`，说明当前运行环境支持 WebXR。

如果能匹配到 `\swv\)`，说明当前运行环境的 Web Runtime 是 WebView。

如果能匹配到 `/WSAppShell\/(\S+)/`，说明当前运行环境是自带 WebSpatial Runtime 的 Packaged WebSpatial App。如果还能匹配到 `"Macintosh"`，说明是 visionOS 环境。

如果能匹配到 `/PicoWebApp\/(\S+)/`，说明当前运行环境是 PICO OS 6 的 Web App Runtime。

## Read / Write Semantics

只读。

示例：

```js
const ua = Navigator.userAgent.toString();
```

## Coordinate Space and Units

TODO：待补充

## Timing

TODO：待补充

## Fallback Behavior

在不支持 WebSpatial 的环境里，User Agent 字符串里不存在 `WebSpatial` 字段。
