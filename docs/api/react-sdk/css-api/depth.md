# `depth`

## Summary

`depth` 是 WebSpatial 在现有 Web 标准基础上新增的 CSS 属性，让 3D 容器元素在 CSS 样式里不仅能控制宽度和高度，也能控制「厚度/深度」。

## Applies To

只有静态 3D 容器元素（[`<Model>`](../react-components/Model.md) ）和动态 3D 容器元素（ [`<Reality>`](../react-components/Reality.md)）支持这个属性。

## Mental Model

3D 内容容器元素也是空间化 HTML 元素，仍然作为一个 2D 面片参与 HTML/CSS 布局，容器的内容相当于 2D 面片前方的「盒状」局部 3D 空间，这个 3D 空间始终以这个 2D 面片为「背板」，因此这个局部空间的宽度和高度由背板尺寸决定，深度则不受其他因素影响，由自身属性独立决定。

CSS 中的 `width` 和 `height` 会影响这个背板（2D 面片）的尺寸，从而影响容器内空间的宽度和高度。

新增的 `depth` 则是直接决定背板前方这个局部 3D 空间的深度。

## Syntax

WebSpatial API 中的 CSS 属性在标准化完成前，需要加上 `-xr-` 前缀。
在 WebSpatial SDK 当前的实现中，出于性能考虑，是用 CSS 自定义变量来实现新的 CSS API，因此 `depth` 的属性名在 CSS 样式和 `style` 属性里都要写成 `--xr-depth`。

示例：

```css
.product-preview {
  width: 100px;
  height: 100px;
  --xr-depth: 100px;
}
```

```js
export default function ProductPreview() {
  return (
    <Model
      style={
        width: '100px',
        height: '100px',
        '--xr-depth': '100px',
      }
      src="/assets/product.usdz"
      />
  )
}
```

```js
export default function ProductPreview() {
  return (
    <Reality
      style={
        width: '1360px',
        height: '1360px',
        '--xr-depth': '1360px',
      }>
      <World>
        <Box width="0.5" height="0.5" depth="0.5" />
      </World>
    </Reality>
  )
}
```

## Value Grammar

在 WebSpatial SDK 当前的实现中，`depth` 的值只支持用 px 作为单位，等价于空间中的「point」单位（在 visionOS 里，默认 1360px ≈ 1 米，参考[单位转换 API](../js-api/useMetrics.md)）。

对于数值，最多允许精确到小数点后一位。

## Initial Value

初始值相当于：

```css
--xr-depth: 0;
```

## Inherited

3D 内容容器元素不能用其他 3D 内容容器元素作为子元素，因此 `depth` 不存在父子之间的影响。

## Animatable

在 WebSpatial SDK 当前的实现中，暂时不支持在 CSS 动画中使用 `depth` 属性。

> 空间化 HTML 元素整体目前都不支持 CSS 动画。

`depth` 支持 JS 动画的实现方式，可以对一个元素用 JS 反复修改 style 属性里 `--xr-depth` 的值。

JSX API 示例：

```js
export default function ProductPreview({ animatedWidth, animatedDepth }) {
  return (
    <Reality
      style={
        width: animatedWidth,
        '--xr-depth': animatedDepth,
      }>
      <World>
        <Box width="0.5" height="0.5" depth="0.5" />
      </World>
    </Reality>
  )
}
```

DOM API 示例：

```js
ref.current.style["--xr-depth"] = animatedDepth;
```

## Interaction with Other CSS APIs

`depth` 能跟 `width`、`height` 组合使用，改变 3D 容器元素对应的局部 3D 空间的尺寸。

## DOM and JS Reflection

可以用 DOM API 里新增的 [clientDepth](../dom-api/clientDepth.md) 获取 3D 容器元素当前的深度状态。

[`<Reality>`](../react-components/Reality.md) 用 `depth` 改变深度后，[本地坐标系](../js-api/convertCoordinate.md)的原点在全局坐标系中会相应的沿着 Z 轴改变位置（比如深度增加 10px，原点会向前方位移 5px）。
因此，`depth` 会影响用 [`convertCoordinate`](../js-api/convertCoordinate.md) 在本地坐标系和全局坐标系之间转换的结果，也会影响 `<Reality>` 中 3D 内容的渲染。

## Fallback Behavior

在不支持 WebSpatial 的环境里，`depth` 会被自动忽略。
