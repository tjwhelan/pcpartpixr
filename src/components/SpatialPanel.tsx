import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

type Drag = { x: number; y: number; z: number };

const zero: Drag = { x: 0, y: 0, z: 0 };

const SCALE_MIN = 0.45;
const SCALE_MAX = 2.75;

function useStackedTilesBreakpoint() {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setStacked(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return stacked;
}

function clampScale(v: number) {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, v));
}

type SpatialPanelProps = {
  /** Root tag; use `div` when nesting inside a fragment that already uses section semantics. */
  as?: 'section' | 'div';
  className?: string;
  style?: CSSProperties;
  /** Optional accessible name for the spatial tile. */
  ariaLabel?: string;
  /**
   * Drag / magnify hit target only — spatial gestures on the body do not move the panel
   * (see docs/api/react-sdk/event-api/spatial-drag.md).
   */
  header: ReactNode;
  children: ReactNode;
  /**
   * CSS transform applied before user spatial translate / scale (e.g. translateY(-50%) for fixed centering).
   * Ignored when the narrow breakpoint stacks tiles (plain flow layout).
   */
  layoutTransform: string;
};

/**
 * Spatialized tile: move and resize via pinch on the **header** only; body stays scrollable / interactive.
 */
export function SpatialPanel({
  as: Tag = 'section',
  className,
  style,
  ariaLabel,
  header,
  children,
  layoutTransform,
}: SpatialPanelProps) {
  const stacked = useStackedTilesBreakpoint();
  const [baseDrag, setBaseDrag] = useState<Drag>(zero);
  const [gestureDrag, setGestureDrag] = useState<Drag>(zero);
  const gestureDragRef = useRef<Drag>(zero);
  const committedScaleRef = useRef(1);
  const liveScaleRef = useRef(1);
  const [scale, setScale] = useState(1);

  const layoutPrefix = stacked ? '' : layoutTransform;

  const onSpatialDrag = useCallback(
    (e: { translationX: number; translationY: number; translationZ: number }) => {
      const g = {
        x: e.translationX,
        y: e.translationY,
        z: e.translationZ,
      };
      gestureDragRef.current = g;
      setGestureDrag(g);
    },
    [],
  );

  const onSpatialDragEnd = useCallback(() => {
    const g = gestureDragRef.current;
    gestureDragRef.current = zero;
    setBaseDrag((b) => ({
      x: b.x + g.x,
      y: b.y + g.y,
      z: b.z + g.z,
    }));
    setGestureDrag(zero);
  }, []);

  const onSpatialMagnify = useCallback((e: { magnification: number }) => {
    const next = clampScale(committedScaleRef.current * e.magnification);
    liveScaleRef.current = next;
    setScale(next);
  }, []);

  const onSpatialMagnifyEnd = useCallback(() => {
    committedScaleRef.current = liveScaleRef.current;
    setScale(committedScaleRef.current);
  }, []);

  useEffect(() => {
    setBaseDrag(zero);
    setGestureDrag(zero);
    gestureDragRef.current = zero;
    committedScaleRef.current = 1;
    liveScaleRef.current = 1;
    setScale(1);
  }, [stacked]);

  const tx = baseDrag.x + gestureDrag.x;
  const ty = baseDrag.y + gestureDrag.y;
  const tz = baseDrag.z + gestureDrag.z;

  const transformParts = [
    layoutPrefix.trim(),
    `translate3d(${tx}px, ${ty}px, ${tz}px)`,
  ];
  if (scale !== 1) {
    transformParts.push(`scale(${scale})`);
  }
  const transform = transformParts.filter(Boolean).join(' ');

  const rootClass = [className, 'spatial-panel-root'].filter(Boolean).join(' ');

  return (
    <Tag
      enable-xr
      aria-label={ariaLabel}
      className={rootClass}
      style={{
        ...style,
        transform,
      }}
    >
      <div
        enable-xr
        className="spatial-panel-drag-header"
        onSpatialDrag={onSpatialDrag}
        onSpatialDragEnd={onSpatialDragEnd}
        onSpatialMagnify={onSpatialMagnify}
        onSpatialMagnifyEnd={onSpatialMagnifyEnd}
      >
        {header}
      </div>
      <div className="spatial-panel-body">{children}</div>
    </Tag>
  );
}
