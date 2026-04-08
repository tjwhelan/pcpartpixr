# `<Reality>`

## Overview

`<Reality>` 跟同为 3D 内容容器元素的 `<Model>` 一样，作为 2D 面片参与 HTML/CSS 布局，支持 X/Y 轴上原有的 CSS API，也支持像空间化 HTML 元素那样使用 `back`、Spatial Transform 等新增的 Z 轴相关 API。容器中 3D 内容会跟随这个 2D 面片，始终在这个 2D 面片正前方的盒子空间中渲染。

`<Reality>` 组件跟`<Model>` 组件的区别是，容器中的 3D 内容不是用预先制作好的、静态的 3D 模型文件来实现，而是用可动态编程的、类似 3D 引擎的 API 来实现。

这些 3D 引擎 API 被 WebSpatial SDK 作为 React 组件提供：

```js
import {
  Reality,
  Material,
  ModelAsset,
  World,
  ModelEntity,
  Box,
} from "@webspatial/react-sdk";
```

```js
<Reality style={{ width: "500px", height: "500px", "--xr-depth": 100 }}>
  <Material type="unlit" id="red" color="#ff0000" />
  <ModelAsset id="teapot" src="https://example.com/model.usdz" />
  <World>
    <Box materials={["red"]} width={0.2} height={0.2} depth={0.2} />
  </World>
</Reality>
```

3D 引擎 API 包含两类：

第一类是 3D Entity，这种 React 组件只能在 `<World>`(也可写作 `<SceneGraph>`）里使用，`<World>` 是 3D 容器内所有 3D 内容的根节点。

第二类是 3D 资产的声明，比如模型文件（`<ModelAsset>`）、材质（`<Material>`），这种 React 组件只能作为 `<Reality>` 中的顶层子节点、在 `<World>` 外面使用，需要被 3D Entity 引用才能实际影响渲染结果。

## 3D Entity

这些 3D Entity 组件不参与 HTML 布局，只在 `<Reality>` 容器内按照 3D 引擎的坐标体系来渲染，单位默认是物理世界单位（米）。它们不支持 CSS 属性，而是采用 3D 引擎体系里的「Transform 属性」：

```js
// Position: x (left/right), y (down/up), z (away/toward)
position={{ x: 0.1, y: -0.2, z: 0.3 }}

// Rotation: radians (Math.PI = 180°)
rotation={{ x: 0, y: Math.PI / 2, z: 0 }}  // 90° on Y-axis

// Scale: 1 = normal, 2 = double, 0.5 = half
scale={{ x: 1, y: 2, z: 1 }}  // stretched vertically
```

Transform 属性默认使用 `<Reality>` 容器内部的 3D 坐标系，原点是容器「背板」前方空间的中心点。

目前支持 Entity 有三类：

### `<Entity>`

`<Entity>` 不可见，作为其他 entity 的父组件和 group container 使用，可以把多个 entity 包含在一个 group 里。

### Primitive Entity

几何实体（primitive）包括以下几何形状，它们各自有不同的额外属性：

- `<Box>`
  - 属性：`width`,`height`,`depth`, `cornderRadius`
- `<Plane>`
  - 属性：`width`,`height`, `cornderRadius`
- `<Sphere>`
  - 属性：`radius`
- `<Cone>`
  - 属性：`height`, `radius`
- `<Cylinder>`
  - 属性：`height`, `radius`

```js
<Box
  width={0.2}
  height={0.2}
  depth={0.2} // meters (0.1 = 10cm)
  cornerRadius={0.01} // rounded edges
/>
```

这些几何实体都支持 `materials` 属性，可以引用预先声明的材质。

```js
<Reality>
  <Material type="unlit" id="solid" color="#00ff00" />
  <Material type="unlit" id="glass" color="#0000ff" transparent opacity={0.5} />
  <World>
    <Box
      width={0.2}
      height={0.2}
      depth={0.2} // meters (0.1 = 10cm)
      materials={["glass"]}
      cornerRadius={0.01} // rounded edges
    />
  </World>
</Reality>
```

### `<ModelEntity>`

用 3D 模型渲染内容的 Entity

示例：spaceship fleet - instead of downloading spaceship model 3 times for 3 ships, we load Asset once, and create 3 entitites from it

```js
import { Reality, World, ModelAsset, ModelEntity } from "@webspatial/react-sdk";

function SpaceshipFleet() {
  return (
    <Reality style={{ width: "100%", height: "500px" }}>
      {/* --- 1. THE RESOURCE --- */}
      {/* This downloads the file once. It is INVISIBLE right now. */}
      <ModelAsset
        id="ship-blueprint"
        src="https://example.com/fighter-jet.usdz"
      />

      {/* --- 2. THE SCENE --- */}
      <World>
        {/* Leader Ship: Center, Normal Size */}
        <ModelEntity
          model="ship-blueprint" // Points to the ID above
          position={{ x: 0, y: 0, z: 0 }}
          scale={{ x: 1, y: 1, z: 1 }}
        />

        {/* Left Wingman: Moved left, slightly smaller */}
        <ModelEntity
          model="ship-blueprint" // Reuses the same loaded file!
          position={{ x: -0.5, y: -0.2, z: 0.3 }}
          scale={{ x: 0.8, y: 0.8, z: 0.8 }}
        />

        {/* Right Wingman: Moved right, slightly smaller */}
        <ModelEntity
          model="ship-blueprint" // Reuses the same loaded file
          position={{ x: 0.5, y: -0.2, z: 0.3 }}
          scale={{ x: 0.8, y: 0.8, z: 0.8 }}
        />
      </World>
    </Reality>
  );
}
```

对于动画需求，可以用 JS 轮询修改 Transform 属性来实现。
示例：

```js
const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

useEffect(() => {
  let id;
  function animate() {
    setRotation(prev => ({ ...prev, y: prev.y + 0.02 }));
    id = requestAnimationFrame(animate);
  }
  animate();
  return () => cancelAnimationFrame(id);
}, []);

<Box rotation={rotation} />;
```
