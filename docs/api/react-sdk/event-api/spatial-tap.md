# Spatial Tap

## Summary

Represents a completed one-handed "select and activate" action on a target in space, whether the interaction is [performed through indirect "gaze + pinch" or direct touch](../../../concepts/natural-interactions.md).

## Trigger Conditions

If a [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) listens for Spatial Tap, the event is triggered after the 3D spatial position occupied by its own content is tapped.

If a [3D container element](../../../concepts/3d-content-containers.md) listens for Spatial Tap, the event is triggered after the 3D spatial position occupied by its own interactive content is tapped.

## Mental Model

Spatial Tap can be understood as a `click` event in 3D space.

## Event Type Signature

Event type name: `spatialtap`

## React Usage

Event prop name available in JSX: `onSpatialTap`

## Native DOM Usage

At the current stage, the [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) does not allow listening to spatial events directly on DOM elements, including those obtained from refs.

## Event Lifecycle

No event is triggered during the "selection" phase. Pinch and release immediately, and `spatialtap` is triggered.

## SpatialTapEvent Payload

### `offsetX`, `offsetY`, `offsetZ`

The values are floating-point numbers in `px`.

They represent the X, Y, and Z coordinates of the tapped position.

Coordinate system: the [local coordinate system](../js-api/convertCoordinate.md) of the [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) that triggered the event, including 3D container elements. It uses a left-handed coordinate system with the origin at the top-left corner of the element's 2D plane, Y pointing downward, and Z pointing toward the user.

### `clientX`, `clientY`, `clientZ`

The values are floating-point numbers in `px`.

They represent the X, Y, and Z coordinates of the tapped position.

Coordinate system: the [global coordinate system](../js-api/convertCoordinate.md) of the current [Spatial Scene container](../../../concepts/spatial-scenes.md). It uses a left-handed coordinate system with the origin at the top-left corner of the Spatial Scene's backplate, Y pointing downward, and Z pointing toward the user.
