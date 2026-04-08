# `convertCoordinate`

## Summary

在不同坐标系之间转换，包括：

- 空间化 HTML 元素：本地坐标系，基于 2D 布局系统，默认单位是 px。
- 空间场景容器（窗口）：全局坐标系，基于 2D 布局系统，默认单位是 px
- 3D entity：本地坐标系，基于 3D 引擎系统，默认单位是米

## Signature

```js
import { convertCoordinate } from "@webspatial/react-sdk";

const e2e = await convertCoordinate(position, {
  from: elementOrEntity,
  to: elementOrEntity,
});
const e2w = await convertCoordinate(position, {
  from: elementOrEntity,
  to: window,
});
const w2e = await convertCoordinate(position, {
  from: window,
  to: elementOrEntity,
});
```

## Parameters

### position

```ts
type CoordinateLike = { x: number; y: number; z: number };
```

要转换的位置点。
这个位置必须使用 `options.from` 所指定坐标系中的坐标值和默认单位来表达。

### options

- `options.from`：源坐标系。
- `options.to`：目标坐标系

## Return Shape

```ts
Promise<CoordinateLike>;
```

返回一个 Promise，resolve 后得到转换后的坐标点。
