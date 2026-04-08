# `<Model>`

`<Model>` 组件是对 Web 标准中 Model Element 的增强，使用时需要加上 `enable-xr` 标记来启用这种增强：

```jsx
import { Model } from "@webspatial/react-sdk";

function Example() {
  return (
    <Model
      enable-xr
      src="/modelasset/vehicle.usdz"
      style={{ height: "200px", "--xr-depth": "100px" }}
    />
  );
}
```

**Shared 2D Element Features**

`<Model>` 作为 3D 内容容器元素，跟空间化 HTML 元素一样作为 2D 面片参与 HTML/CSS 布局，支持 X/Y 轴上原有的 CSS API 和新增的 Z 轴相关 API

**Enhanced Model Element**

原本 Model Element 中的 3D 模型只能在这个元素的「画布」区域的「内部」和「后方」显示，像是在一个洞口中。

> 可参考 WebKit 的文档：https://webkit.org/blog/17118/a-step-into-the-spatial-web-the-html-model-element-in-apple-vision-pro/
> 测试 demo：https://webkit.org/demos/model-demos/index.html

`<Model>` 上的 `enable-xr` 标记让它在 web 标准的 model element 基础上，具备增强的空间化效果，3D 模型会在元素对应的 2D 面片前方空间中渲染，而不是在以 2D 面片为视区的「洞口」内部渲染

WebSpatial SDK 当前版本中，`<Model>` 支持以下 model element 的 API：

## Attributes

`src`

要嵌入的 3D 模型的 URL。

## Events

`onLoad`

当 3D 模型成功加载，并且已可用于显示时触发。

`onError`

当模型加载失败时触发。

## JavaScript API

`currentSrc`

只读字符串，返回当前已加载资源的 URL。

`ready`

当模型的源文件已完成加载和处理时，这个 Promise 会 resolve。
如果源文件无法被获取，或者文件无法被解析为有效的 3D 模型资源，这个 Promise 会 reject。

`entityTransform`

一个可读可写的 DOMMatrixReadOnly，可以表示 [3D 模型和 3D 内容容器内部空间之间的关系](https://github.com/immersive-web/model-element/blob/main/explainer.md#visual-presentation-control)。
