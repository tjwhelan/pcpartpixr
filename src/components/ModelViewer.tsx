import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { ModelLoader } from './ModelLoader';
import type { PC } from '../types/pc';

interface ModelViewerProps {
  pc: PC;
  /** When true, canvas uses transparent GL buffer (shows parent background). */
  embedded?: boolean;
}

function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'rgba(248, 252, 255, 0.65)',
        fontSize: '13px',
      }}
    >
      Loading model…
    </div>
  );
}

export function ModelViewer({ pc, embedded = false }: ModelViewerProps) {
  const componentCount = Object.values(pc).filter((c) => c).length;
  const hasRenderableModel =
    componentCount > 0 &&
    Object.values(pc).some((c) => c && c.modelUrl && c.modelUrl.length > 0);

  if (componentCount === 0) {
    return (
      <div
        className="model-viewer-empty"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'rgba(248, 252, 255, 0.55)',
          textAlign: 'center',
          fontSize: '13px',
          padding: '12px',
        }}
      >
        <p style={{ margin: 0 }}>Select a part to preview</p>
      </div>
    );
  }

  if (!hasRenderableModel) {
    return (
      <div
        className="model-viewer-empty"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'rgba(248, 252, 255, 0.55)',
          textAlign: 'center',
          fontSize: '13px',
          padding: '12px',
        }}
      >
        <p style={{ margin: 0 }}>No 3D model for this part</p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 42 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      gl={{ alpha: embedded, antialias: true }}
      fallback={<LoadingFallback />}
    >
      {!embedded ? <color attach="background" args={['#0e141a']} /> : null}
      <Suspense fallback={null}>
        {Object.entries(pc).map(([key, component]) => {
          if (!component?.modelUrl) return null;
          return (
            <ModelLoader
              key={`${key}-${component.id}`}
              modelUrl={component.modelUrl}
              componentKey={key}
            />
          );
        })}
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.6}
        zoomSpeed={0.65}
        panSpeed={0.45}
        enablePan={false}
        minDistance={0.35}
        maxDistance={12}
      />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.35} />
      <directionalLight position={[-4, 2, -6]} intensity={0.35} />
      <pointLight position={[0, 4, 2]} intensity={0.5} />
    </Canvas>
  );
}
