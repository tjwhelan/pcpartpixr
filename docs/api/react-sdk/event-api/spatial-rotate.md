# Spatial Rotate

## Summary

Represents a completed two-handed "select, activate, and hold" action on a target in space that produces rotation, whether the interaction is [performed through indirect "gaze + pinch" or direct touch](../../../concepts/natural-interactions.md).

## Trigger Conditions

If a [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) listens for the Spatial Rotate event series, the series is triggered after the 3D spatial position occupied by its own content is pinched and held.

If a [3D container element](../../../concepts/3d-content-containers.md) listens for the Spatial Rotate event series, the series is triggered after the 3D spatial position occupied by its own interactive content is pinched and held.

## Mental Model

The line between the two hands, effectively like a real object, can rotate at arbitrary angles in 3D space.

## Event Type Signature

Event type names:

- `spatialrotate`
- `spatialrotateend`

## React Usage

Event prop names available in JSX:

- `onSpatialRotate`
- `onSpatialRotateEnd`

## Native DOM Usage

At the current stage, the [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) does not allow listening to spatial events directly on DOM elements, including those obtained from refs.

## Event Lifecycle

No event is triggered during the "selection" phase. After pinch-and-hold activates, `spatialrotate` is triggered continuously while the hold continues. Releasing ends the action and triggers `spatialrotateend`.

## SpatialRotateEvent Payload

### `quaternion`

The value is a quaternion.

It represents the amount of rotation relative to the initial state and includes information about the rotation axis.

## SpatialRotateEndEvent Payload

The `SpatialRotateEndEvent` object passed to the `spatialrotateend` event callback has no extra properties.
