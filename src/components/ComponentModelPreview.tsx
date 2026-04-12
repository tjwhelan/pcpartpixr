import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Model } from '@webspatial/react-sdk';
import { ModelViewer } from './ModelViewer';
import type { PC } from '../types/pc';
import { hasWebSpatialRuntime } from '../utils/webspatialRuntime';

type DragT = { x: number; y: number; z: number };

const zero: DragT = { x: 0, y: 0, z: 0 };

/** Degrees per second; negative rotateY reads as clockwise from a typical front view. */
const IDLE_SPIN_DEG_PER_SEC = -22;

interface ComponentModelPreviewProps {
  /** When set, shows the same empty / no-model states as ModelViewer. */
  pc: PC;
  embedded?: boolean;
}

/**
 * In WebSpatial Runtime: volumetric `<Model>` with spatial drag so the part can be
 * “held” (pinch-and-hold per docs) and moved; releasing resets translation to origin.
 * While not grabbed, a slow rotateY idle animation runs (spatial CSS transform).
 * Elsewhere: falls back to react-three-fiber ModelViewer (orbit controls).
 *
 * Spatial gestures are documented as pinch / direct touch, not XR controller names;
 * runtimes may map controller grip to the same spatial drag series.
 * @see docs/api/react-sdk/event-api/spatial-drag.md
 * @see docs/api/react-sdk/react-components/Model.md
 * @see docs/api/react-sdk/css-api/transform.md
 */
export function ComponentModelPreview({ pc, embedded }: ComponentModelPreviewProps) {
  const [drag, setDrag] = useState<DragT>(zero);
  const [idleDeg, setIdleDeg] = useState(0);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const useNative = hasWebSpatialRuntime();

  const component = Object.values(pc).find((c) => c != null);
  const modelUrl = component?.modelUrl;

  const onSpatialDragStart = useCallback(() => {
    setIsGrabbed(true);
  }, []);

  const onSpatialDrag = useCallback(
    (e: { translationX: number; translationY: number; translationZ: number }) => {
      setDrag({
        x: e.translationX,
        y: e.translationY,
        z: e.translationZ,
      });
    },
    [],
  );

  const onSpatialDragEnd = useCallback(() => {
    setIsGrabbed(false);
    setDrag(zero);
  }, []);

  useEffect(() => {
    setDrag(zero);
    setIdleDeg(0);
    setIsGrabbed(false);
  }, [modelUrl]);

  useEffect(() => {
    if (isGrabbed) return;
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      setIdleDeg((d) => {
        const next = d + IDLE_SPIN_DEG_PER_SEC * dt;
        return ((next % 360) + 360) % 360;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isGrabbed]);

  const componentCount = Object.values(pc).filter(Boolean).length;
  const hasRenderableModel =
    componentCount > 0 &&
    Object.values(pc).some((c) => c && c.modelUrl && c.modelUrl.length > 0);

  if (componentCount === 0) {
    return (
      <ModelViewer pc={pc} embedded={embedded} />
    );
  }

  if (!hasRenderableModel) {
    return <ModelViewer pc={pc} embedded={embedded} />;
  }

  if (!useNative || !modelUrl) {
    return <ModelViewer pc={pc} embedded={embedded} />;
  }

  return (
    <Model
      enable-xr
      src={modelUrl}
      className="spatial-component-model"
      onSpatialDragStart={onSpatialDragStart}
      onSpatialDrag={onSpatialDrag}
      onSpatialDragEnd={onSpatialDragEnd}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '220px',
        display: 'block',
        cursor: 'pointer',
        transform: `translate3d(${drag.x}px, ${drag.y}px, ${drag.z}px) rotateY(${idleDeg}deg)`,
        transformOrigin: 'center center',
        ...({ '--xr-depth': '140px' } as CSSProperties),
      }}
    />
  );
}
