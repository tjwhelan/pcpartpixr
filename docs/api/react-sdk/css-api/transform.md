# Spatial Transform

## Summary

WebSpatial 让 Web 标准中现有的 CSS Transform 能在空间化 HTML 元素上带来真实 3D 空间中的变换效果（位移、旋转、缩放），而不是投影到 2D 平面上的效果。

## Applies To

通过 WebSpatial SDK 在一个 HTML 元素上使用 Spatial Transform 的时候，需要元素被[标记为空间化 HTML 元素](../react-components/jsx-marker.md)。

3D 容器元素（[`<Model>`](../react-components/Model.md) 和 [`<Reality>`](../react-components/Reality.md)）都是空间化 HTML 元素，所以也能作为一个 2D 面片（相当于 3D 容器的背板）使用 Spatial Transform。

## Mental Model

Spatial Transform 维持 CSS Transform 原有的特性，不改变元素在 HTML/CSS 布局中的实际位置，只让元素的视觉效果发生位移、旋转、缩放等变换。

因此 Spatial Transform 也不会改变一个空间化 HTML 元素对应的[本地坐标系](../js-api/convertCoordinate.md)，本地坐标系只由元素的布局位置决定。

## Syntax

`transform: perspective()` 不再需要，会被忽略。

在 WebSpatial SDK 当前的实现中，空间化 HTML 元素已经有[特殊的标记](../react-components/jsx-marker.md)，且空间化 HTML 元素上的 CSS Transform 只能带来空间化变换效果，不支持 2D 投影模式，因此 `transform-style` 不再需要，会被忽略。

Spatial Transform 的其他语法跟 CSS Transform 一致，支持 `transform`、`transform-origin` 属性。

WebSpatial SDK 目前支持以下 transform function：

- `translateZ()`、`translate3d()`：在垂直于网页平面的 Z 轴方向上位移。
- `rotateX()`、`rotateY()`、`rotateZ()`、`rotate3d()`：绕 X/Y 轴旋转元素对应的 2D 面片，会把这个 2D 面片部分推入 3D 空间。
- `scaleZ()`、`scale3d()`：如果元素对应的 2D 面片因为旋转有部分进入了 3D 空间，沿 Z 轴的缩放会改变空间中这些部分的大小。

用于没增加任何新 API，因此不需要 [`-xr-` 前缀](./back.md#syntax)。

示例：

```css
.list-meun {
  position: fixed;
  top: 200px;
  left: 0;
  transform-origin: top left;
  transform: translateZ(320px) rotateY(80deg);
}
```

## Value Grammar

在 WebSpatial SDK 当前的实现中，Spatial Transform 中的 translate 值只支持用 px 作为单位，等价于空间中的「point」单位（在 visionOS 里，默认 1360px ≈ 1 米，参考[单位转换 API](../js-api/useMetrics.md)），最多允许精确到小数点后一位。

## Initial Value

初始值相当于：

```css
transform: none;
```

或：

```
transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
```

## Inherited

子元素不会继承父元素的 `back` 属性。

但是跟 CSS Transform 一样，如果父层级的空间化 HTML 元素用了 Spatial Transform，作为子元素的空间化 HTML 元素再使用 Spatial Transform，会相对于自己跟随父元素一起被变换后的视觉位置，继续叠加自己的变换。

## Animatable

在 WebSpatial SDK 当前的实现中，暂时不支持在 CSS 动画中使用 Spatial Transform 的属性。

> 空间化 HTML 元素整体目前都不支持 CSS 动画。

Spatial Transform 支持 JS 动画的实现方式，可以对一个元素用 JS 反复修改 style 属性里 Spatial Transform 值。

JSX API 示例：

```js

export default function Demo({ animatedOffsetZ, animatedOffsetX }) {
  return (
    <div
      style={
        transform: `translateZ(${animatedOffsetZ}) translateX(${animatedOffsetX})`,
      }>
    </div>
  )
}
```

DOM API 示例：

```js
ref.current.style.transform = `translateZ(${animatedOffsetZ})`;
```

## Interaction with Other CSS APIs

如果一个空间化 HTML 元素[用 `back` 改变在 Z 轴上的布局位置](./back.md)，Spatial Transform 的 `translateZ` 会让这个元素的视觉位置相对于这个 Z 轴位置进一步沿 Z 轴位移。

## DOM and JS Reflection

由于 Spatial Transform 不改变元素的布局位置，不改变一个空间化 HTML 元素对应的[本地坐标系](../js-api/convertCoordinate.md)，因此也不影响这个元素上触发空间交互事件 [`SpatialTapEvent`](../event-api/spatial-tap.md) 和 [`SpatialDragStartEvent`](../event-api/spatial-drag.md) 获取到的相对于本地坐标系的位置信息（`offsetX`、`offsetZ` 等），也不影响用 [`convertCoordinate`](../js-api/convertCoordinate.md) 在本地坐标系和全局坐标系之间转换的结果。

获得一个元素的 ref 后，可以直接读写 `style` 里 `transform` 属性的值：

```js
const currentOffsetZ =
  ref.current.style.transform.match(/translateZ\(([^)]+)\)/)?.[1] ?? "0px";
```

## Fallback Behavior

在不支持 WebSpatial 的环境里，Spatial Transform 样式会回退到普通 CSS Transform 的效果。
