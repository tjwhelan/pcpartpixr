# `back`

## Summary

`back` 是 WebSpatial 在现有 Web 标准基础上新增的 CSS 属性，提供最基本的在 3D 空间中布局的能力，可以让 HTML 元素作为 2D 面片被「抬升」到网页平面前方的空间中。

## Applies To

通过 WebSpatial SDK 在一个 HTML 元素上使用 `back` 的时候，需要这个元素被[标记为空间化 HTML 元素](../react-components/jsx-marker.md)。

[3D 容器元素](../../../introduction/core-concepts.md#3d-content-container)（[`<Model>`](../react-components/Model.md) 和 [`<Reality>`](../react-components/Reality.md)）都是空间化 HTML 元素，所以也能作为一个 2D 面片（相当于 3D 容器的背板）使用这个属性。

只适用于设置了 `position: relative`、`position: absolute` 或 `position: fixed` 的 [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)。

## Mental Model

跟 `top`, `left`, `bottom`, `right` 一样属于 [inset 属性](https://developer.mozilla.org/en-US/docs/Glossary/Inset_properties)，但影响的不是 HTML 元素在 X/Y 轴上的位置，而是元素在 Z 轴上的位置，相当于让元素沿着垂直于网页平面的 Z 轴方向，在网页平面前方的 3D 空间中定位，作为一个 2D 面片悬浮在空间中。

这个 2D 面片「浮起」后，在空间中 X/Y 轴上的位置，仍然由网页的 HTML/CSS 布局系统决定。

`back` 表示的是这个 2D 面片跟「背后」之间的距离。这个「背后」对应的是哪个 2D 平面，由 `position` 的值决定：

`back` 跟 `position: absolute` 组合使用时，可以理解为让当前元素相对于父层级中最近的[空间化 HTML 元素](../../../introduction/core-concepts.md#spatialized-html-element)对应的 2D 平面进行定位，如果父层级中没有空间化 HTML 元素，就会相对于当前网页对应的 2D 平面进行定位。
等价于让当前元素相对于元素原本所在的 2D 平面进行定位。

> 这个理解方式不违背现有 Web 标准：
> 在 Web 标准中，inset 属性在跟 `position: absolute` 或 `position: fixed` 组合使用时，元素是相对于父层级中距离最近的 [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Containing_block#identifying_the_containing_block)（可理解为 `position` 值不是 `static` 的元素）进行定位。
> 一个 HTML 元素被标记为空间化 HTML 元素后，就自动成为了 containing block，相当于被设置为 `position: relative`。
> 如果当前元素和父层级中最近的空间化 HTML 元素之间还有其他 `position: relative` 的父元素，由于这个父元素不是空间化 HTML 元素，不能「浮起」，所以一定位于父层级中最近的空间化 HTML 元素对应的 2D 平面上，`back` 的最终结果都是相对于这个 2D 平面进行定位。

`back` 跟 `position: fixed` 组合使用时，当前元素始终相对于 [initial containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Containing_block#identifying_the_containing_block) （也就是 `<html>` 元素，相当于当前网页对应的 2D 平面）进行定位，并且不会随页面滚动。

`back` 跟 `position: relative` 组合使用时，可以理解为让当前元素相对于元素原本所在的 2D 平面进行定位。

## Syntax

WebSpatial API 中的 CSS 属性在标准化完成前，需要加上 `-xr-` 前缀。
在 WebSpatial SDK 当前的实现中，出于性能考虑，是用 CSS 自定义变量来实现新的 CSS API，因此 `back` 的属性名在 CSS 样式和 `style` 属性里都要写成 `--xr-back`。

示例：

```css
p {
  position: absolute;
  left: 0;
  right: 0;
  --xr-back: 20px;
}
```

```css
.product-detail-info {
  border-radius: 50px;
  padding: 50px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  --xr-back: 20px;
  margin: auto;
  width: 400px;
}
```

```css
.link-card {
  position: relative;
  --xr-back: 50px;
}
```

```js
export default function Demo() {
  return (
    <div
      style={
        '--xr-back': '50px',
        left: '0',
      }>
    </div>
  )
}
```

## Value Grammar

在 WebSpatial SDK 当前的实现中，`back` 的值只支持用 px 作为单位，等价于空间中的「point」单位（在 visionOS 里，默认 1360px ≈ 1 米，参考[单位转换 API](../js-api/useMetrics.md)）。

以下写法都是 px 单位：

```css
--xr-back: 20px;
--xr-back: 20;
```

对于数值，最多允许精确到小数点后一位：

```css
--xr-back: 1px;
--xr-back: 0.5px;
```

## Initial Value

初始值相当于：

```css
--xr-back: 0;
```

## Inherited

子元素不会继承父元素的 `back` 属性。

但是在跟 `position: relative` 或 `position: absolute` 组合使用时，父元素中的空间化 HTML 元素因为 `back` 属性发生了 Z 轴方向上的位移，子元素（包括空间化 HTML 元素）也会有相应的位移（因为子元素是相对于父元素定位的）。

## Animatable

在 WebSpatial SDK 当前的实现中，暂时不支持在 CSS 动画中使用 `back` 属性。

> 空间化 HTML 元素整体目前都不支持 CSS 动画。

`back` 支持 JS 动画的实现方式，可以对一个元素用 JS 反复修改 style 属性里 `--xr-back` 的值。

JSX API 示例：

```js
export default function Demo({ animatedOffsetZ, animatedOffsetX }) {
  return (
    <div
      style={
        '--xr-back': animatedOffsetZ,
        left: animatedOffsetX
      }>
    </div>
  )
}
```

DOM API 示例：

```js
ref.current.style["--xr-back"] = animatedOffsetZ;
```

## Interaction with Other CSS APIs

`back` 是布局属性，用 `back` 让元素「浮起」，相当于改变元素在 Z 轴上的布局位置。[CSS Transform](./transform.md) 是相对于这个布局位置进一步改变这个元素的显示效果（不影响实际布局位置）。

`back` 能跟 `top`, `left`, `bottom`, `right` 组合使用，改变元素对应的 2D 面片在 3D 空间中 X、Y、Z 轴上的布局位置。

## DOM and JS Reflection

用 `back` 让元素「浮起」后，可以用 DOM API 里新增的 [`offsetBack`](../dom-api/offsetBack.md) 属性读取这个元素相对于原本所在 2D 平面「浮起」的距离。

在 2D HTML 元素上触发空间交互事件 [`SpatialTapEvent`](../event-api/spatial-tap.md) 和 [`SpatialDragStartEvent`](../event-api/spatial-drag.md) 获取到的相对于全局坐标系的交互位置信息（`clientZ`）也由 `back` 决定。

还可以获得一个元素的 ref 后，直接读写 `style` 里 `back` 属性的值：

```js
const currentOffsetZ = ref.current.style["--xr-back"];
```

## Fallback Behavior

在不支持 WebSpatial 的环境里，`back` 会被自动忽略。
