# Spatial Magnify

## Summary

Represents a completed two-handed "select, activate, and hold" action on a target in space that produces scaling, whether the interaction is [performed through indirect "gaze + pinch" or direct touch](../../../concepts/natural-interactions.md).

## Trigger Conditions

If a [spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) listens for the Spatial Magnify event series, the series is triggered after the 3D spatial position occupied by its own content is pinched and held.

If a [3D container element](../../../concepts/3d-content-containers.md) listens for the Spatial Magnify event series, the series is triggered after the 3D spatial position occupied by its own interactive content is pinched and held.

## Mental Model

The line between the two hands, effectively like a real object, can be stretched in 3D space.

## Event Type Signature

Event type names:

- `spatialmagnify`
- `spatialmagnifyend`

## React Usage

Event prop names available in JSX:

- `onSpatialMagnify`
- `onSpatialMagnifyEnd`

## Native DOM Usage

At the current stage, the [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) does not allow listening to spatial events directly on DOM elements, including those obtained from refs.

## Event Lifecycle

No event is triggered during the "selection" phase. After pinch-and-hold activates, `spatialmagnify` is triggered continuously while the hold continues. Releasing ends the action and triggers `spatialmagnifyend`.

## SpatialMagnifyEvent Payload

### `magnification`

The value is a percentage-like number. For example, `1` means the original size and `1.5` means scaled to 150%.

It represents the amount of scaling relative to the initial state.

## SpatialMagnifyEndEvent Payload

The `SpatialMagnifyEndEvent` object passed to the `spatialmagnifyend` event callback has no extra properties.
