# Spatial Magnify

## Summary

表示完成了一次对空间目标的双手「选择、激活、持续」动作，起到缩放作用。无论这种交互是通过间接的「注视 + 捏合」完成，还是通过直接触摸完成。

## Trigger Conditions

监听了 Spatial Magnify 系列事件的空间化 2D HTML 元素，在自身内容占据的 3D 空间位置被「捏住不放」后，会触发这套事件。

监听了 Spatial Magnify 系列事件的 3D 容器元素，在自身的可交互内容占据的 3D 空间位置被「捏住不放」后，会触发这套事件。

## Mental Model

双手之间的连线（相当于一个真实物体）可以在 3D 空间中做拉伸。

## Event Type Signature

事件类型名称：

- `spatialmagnify`
- `spatialmagnifyend`

## React Usage

JSX 中可用的事件属性名

- `onSpatialMagnify`
- `onSpatialMagnifyEnd`

## Native DOM Usage

WebSpatial SDK 现阶段不允许在 DOM 元素（包括来自 Ref 的）上直接监听空间事件。

## Event Lifecycle

「选择」过程中不触发事件，捏住不放「激活」后「保持」，会持续触发`spatialmagnify`，松开后「结束」，触发 `spatialmagnifyend`。

## SpatialMagnifyEvent Payload

### magnification

值是百分比数字，比如 1 表示原始大小， 1.5 表示放大到 150%。

表示相对于初始状态的缩放量。

## SpatialMagnifyEndEvent Payload

`spatialmagnifyend` 事件回调获得的 SpatialMagnifyEndEvent 对象没有额外属性。

## Propagation

TODO：待补充

## Cancelation and Default Behavior

TODO：待补充

## Gesture Arbitration

TODO：待补充
