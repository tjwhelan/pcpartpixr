import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { ModelLoader } from './ModelLoader';
import type { PC } from '../types/pc';

interface ModelViewerProps {
  pc: PC;
}

function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'var(--text-soft)',
        fontSize: '14px',
      }}
    >
      Loading model...
    </div>
  );
}

export function ModelViewer({ pc }: ModelViewerProps) {
  const componentCount = Object.values(pc).filter((c) => c).length;

  if (componentCount === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--text-soft)',
          textAlign: 'center',
        }}
      >
        <p>Select components to see your PC build</p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      fallback={<LoadingFallback />}
    >
      <color attach="background" args={['#f8fbff']} />
      <Suspense fallback={null}>
        {/* Load each component model */}
        {Object.entries(pc).map(([key, component]) => {
          if (!component || !component.modelUrl) return null;
          return (
            <ModelLoader
              key={key}
              modelUrl={component.modelUrl}
              componentKey={key}
            />
          );
        })}
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        zoomSpeed={0.5}
        panSpeed={0.5}
      />
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} />
    </Canvas>
  );
}
