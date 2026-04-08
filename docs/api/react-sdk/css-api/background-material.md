# `background-material`

## Summary

`background-material` 是 WebSpatial 在现有 Web 标准基础上新增的 CSS 属性，让悬浮在空间中的网页窗口和空间化 HTML 元素都能完全透明或能使用实时渲染的半透明材质作为背景，而不仅限于固定的不透明颜色。

## Applies To

WebSpatial SDK 暂时只支持在 html 元素（代表网页窗口本身）和被[标记为空间化 HTML 元素](../react-components/jsx-marker.md)的 2D HTML 元素（不含 3D 容器元素）上使用 `background-material`。

## Mental Model

`background-material` 的值不是 `none` 和 `transparent`（比如 `translucent`）的情况下：

对于网页窗口，相当于把原本不透明的固定颜色背板，替换成了半透明材质的背板，随视角和环境实时动态渲染。

在 `background-material` 的值是 `none` 的情况下：

网页窗口保持默认的不透明的固定颜色背板。
空间化 HTML 元素保持默认的无背板状态。

对于空间化 HTML 元素，相当于额外加上了这个半透明材质的背板。

在 `background-material` 的值是 `transparent` 的情况下：

对于网页窗口，相当于把原本不透明的固定颜色背板去掉，变成完全透明、无边框，让网页中各个元素看上去分散漂浮在空间中。

对于空间化 HTML 元素，相当于保持默认的无背板状态。

## Syntax

WebSpatial API 中的 CSS 属性在标准化完成前，需要加上 `-xr-` 前缀。
在 WebSpatial SDK 当前的实现中，出于性能考虑，是用 CSS 自定义变量来实现新的 CSS API，因此 `background-material` 的属性名在 CSS 样式和 `style` 属性里都要写成 `--xr-background-material`。

示例：用于网页窗口

```css
html {
  --xr-background-material: transparent;
}
```

示例：用于空间化 HTML 元素

```css
div {
  position: absolute;
  --xr-back: 100px;
  --xr-background-material: translucent;
}
```

## Value Grammar

`background-material` 的值是枚举值：

- `translucent`
- `transparent`
- `none`

## Initial Value

初始值相当于：

```css
--xr-background-material: none;
```

## Inherited

子元素不会继承父元素的 `background-material` 属性。

## Animatable

TODO：待补充

## Interaction with Other CSS APIs

TODO：待补充

## DOM and JS Reflection

TODO：待补充

## Fallback Behavior

在不支持 WebSpatial 的环境里，`background-material` 会被自动忽略。
