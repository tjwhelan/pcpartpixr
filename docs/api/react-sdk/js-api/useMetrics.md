# `useMetrics`

## Summary

在「Point」单位（px）和物理世界单位（m）之间做单位转换。

如果空间场景容器把 `worldScaling` 设置成了 `dynamic`（Window Scene），这两种单位的转换关系不是固定关系。

## Signature

```js
import { useMetrics } from "@webspatial/react-sdk";

function UnitConvertTest() {
  const { pointToPhysical, physicalToPoint } = useMetrics();

  return (
    <>
      <pre>
        Scaled conversion
        {"\n"}
        physicalToPoint(1): {physicalToPoint(1)}
        {"\n"}
        pointToPhysical(1): {pointToPhysical(1)}
      </pre>

      <pre>
        Unscaled conversion
        {"\n"}
        physicalToPoint(1):{" "}
        {physicalToPoint(1, { worldScalingCompensation: "unscaled" })}
        {"\n"}
        pointToPhysical(1):{" "}
        {pointToPhysical(1, { worldScalingCompensation: "unscaled" })}
      </pre>
    </>
  );
}
```

## Parameters

无

## Return Shape

```ts
type WorldScalingCompensation = "scaled" | "unscaled";

type MetricConvertOptions = {
  worldScalingCompensation?: WorldScalingCompensation;
};

type UseMetricsReturn = {
  pointToPhysical: (value: number, options?: MetricConvertOptions) => number;
  physicalToPoint: (value: number, options?: MetricConvertOptions) => number;
};
```

`worldScalingCompensation` 决定在转换过程中，是否对当前空间场景容器的 worldScaling 进行补偿。

- `scaled`：转换结果与用户当前在缩放后窗口中感知到的尺寸一致时
- `unscaled`：得到不随缩放而变化的稳定物理世界数值

### pointToPhysical

```ts
pointToPhysical(value: number, options?: MetricConvertOptions): number
```

### physicalToPoint

```ts
physicalToPoint(value: number, options?: MetricConvertOptions): number
```
