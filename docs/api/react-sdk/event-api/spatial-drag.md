# Spatial Drag

## Summary

Represents a completed one-handed "select, activate, and hold" action on a target in space, whether the interaction [is performed through indirect "gaze + pinch" or direct touch](../../../concepts/natural-interactions.md).

## Trigger Conditions

If a [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) listens for the Spatial Drag event series, the series is triggered after the 3D spatial position occupied by its own content is pinched and held.

If a [3D container element](../../../concepts/3d-content-containers.md) listens for the Spatial Drag event series, the series is triggered after the 3D spatial position occupied by its own interactive content is pinched and held.

## Mental Model

You can drag in any direction in 3D space and place the target at any location in space.

## Event Type Signature

Event type names:

- `spatialdragstart`
- `spatialdrag`
- `spatialdragend`

## React Usage

Event prop names available in JSX:

- `onSpatialDragStart`
- `onSpatialDrag`
- `onSpatialDragEnd`

## Native DOM Usage

At the current stage, the [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) does not allow listening to spatial events directly on DOM elements, including those obtained from refs.

## Event Lifecycle

No event is triggered during the "selection" phase. When pinch-and-hold begins, `spatialdragstart` is triggered. After activation, holding continues to trigger `spatialdrag`. Releasing ends the action and triggers `spatialdragend`.

## SpatialDragStartEvent Payload

### `offsetX`, `offsetY`, `offsetZ`

The values are floating-point numbers in `px`.

They represent the X, Y, and Z coordinates of the activation position.

Coordinate system: the [local coordinate system](../js-api/convertCoordinate.md) of the [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) that triggered the event, including 3D container elements. It uses a left-handed coordinate system with the origin at the top-left corner of the element's 2D plane, Y pointing downward, and Z pointing toward the user.

### `clientX`, `clientY`, `clientZ`

The values are floating-point numbers in `px`.

They represent the X, Y, and Z coordinates of the activation position.

Coordinate system: the [global coordinate system](../js-api/convertCoordinate.md) of the current [Spatial Scene container](../../../concepts/spatial-scenes.md). It uses a left-handed coordinate system with the origin at the top-left corner of the Spatial Scene's backplate, Y pointing downward, and Z pointing toward the user.

## SpatialDragEvent Payload

### translationX, translationY, translationZ

The values are floating-point numbers in `px`.

They represent the offset relative to the drag start position.

## SpatialDragEndEvent Payload

The `SpatialDragEndEvent` object passed to the `spatialdragend` event callback has no extra properties.
