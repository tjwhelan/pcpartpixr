import {
  Suspense,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '@webspatial/react-sdk';
import { ModelLoader } from './ModelLoader';
import { hasWebSpatialRuntime } from '../utils/webspatialRuntime';

const FULL_PC_URL = '/models/free_gaming_pc.glb';

type Vec3 = { x: number; y: number; z: number };
const zero: Vec3 = { x: 0, y: 0, z: 0 };

/**
 * Full gaming PC GLB placed to the left of the build tile. WebSpatial: spatial drag
 * accumulates so the model stays where the user puts it. Browser: drag the viewport with pointer.
 */
export function SpawnedFullPcModel() {
  const useNative = hasWebSpatialRuntime();
  const baseRef = useRef<Vec3>({ ...zero });
  const liveRef = useRef<Vec3>({ ...zero });
  const [spatialDrag, setSpatialDrag] = useState<Vec3>(zero);
  const [pointerOffset, setPointerOffset] = useState<Vec3>(zero);
  const pointerDragging = useRef(false);
  const pointerStart = useRef({ clientX: 0, clientY: 0, ox: 0, oy: 0 });

  const onSpatialDrag = useCallback(
    (e: { translationX: number; translationY: number; translationZ: number }) => {
      const next = {
        x: baseRef.current.x + e.translationX,
        y: baseRef.current.y + e.translationY,
        z: baseRef.current.z + e.translationZ,
      };
      liveRef.current = next;
      setSpatialDrag(next);
    },
    [],
  );

  const onSpatialDragEnd = useCallback(() => {
    baseRef.current = { ...liveRef.current };
  }, []);

  const nativeStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '200px',
    display: 'block',
    cursor: 'grab',
    transform: `translate3d(${spatialDrag.x}px, ${spatialDrag.y}px, ${spatialDrag.z}px)`,
    transformOrigin: 'center center',
    ...({ '--xr-depth': '220px' } as CSSProperties),
  };

  if (useNative) {
    return (
      <div
        className="spawned-full-pc-model-host"
        enable-xr
        aria-label="Full PC model — spatial drag to move"
      >
        <Model
          enable-xr
          src={FULL_PC_URL}
          className="spawned-full-pc-model-native spatial-component-model"
          onSpatialDrag={onSpatialDrag}
          onSpatialDragEnd={onSpatialDragEnd}
          style={nativeStyle}
        />
      </div>
    );
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    pointerDragging.current = true;
    pointerStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      ox: pointerOffset.x,
      oy: pointerOffset.y,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerDragging.current) return;
    const dx = e.clientX - pointerStart.current.clientX;
    const dy = e.clientY - pointerStart.current.clientY;
    setPointerOffset({
      x: pointerStart.current.ox + dx,
      y: pointerStart.current.oy + dy,
      z: 0,
    });
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerDragging.current) return;
    pointerDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div className="spawned-full-pc-model-host" enable-xr aria-label="Full PC model — drag to move">
      <div
        className="spawned-full-pc-model-r3f-drag"
        style={{
          transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 42 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            touchAction: 'none',
            background: 'transparent',
          }}
          gl={{ alpha: true, antialias: true }}
          scene={{ background: null }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 8, 6]} intensity={1.05} />
            <ModelLoader modelUrl={FULL_PC_URL} componentKey="spawned-full-pc" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
