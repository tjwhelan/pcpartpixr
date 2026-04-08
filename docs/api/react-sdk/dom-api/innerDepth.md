# `innerDepth`

## Summary

读取 Volume 类型空间场景容器（窗口）的深度/厚度。

## Exposed On

`window` 对象上可以访问这个属性。

## Mental Model

跟 `window.innerHeight` 一样：只读，不含网页之外窗口原生 UI 的高度。

## Syntax

WebSpatial API 中的 DOM 属性在标准化完成前，需要加上 `xr` 前缀并把原有的首字母改成大写，因此 `innerDepth` 的属性名要写成 `xrInnerDepth`。

## Read / Write Semantics

只读。

示例：

```js
const currentVolumeDepth = window.xrInnerDepth;
```

## Type Signature

TODO：待补充

## Coordinate Space and Units

TODO：待补充

## Timing

TODO：待补充

## Relationship to CSS APIs

TODO：待补充

## SSR Behavior

TODO：待补充

## Fallback Behavior

在不支持 WebSpatial 的环境里，`innerDepth` 不存在。
