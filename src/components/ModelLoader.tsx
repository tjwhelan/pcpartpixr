import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface ModelLoaderProps {
  modelUrl: string;
  componentKey: string;
}

export function ModelLoader({ modelUrl, componentKey }: ModelLoaderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!modelUrl || !groupRef.current) return;

    let cancelled = false;
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        if (cancelled || !groupRef.current) return;

        const object = gltf.scene;

        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }

        const bbox = new THREE.Box3().setFromObject(object);
        const size = bbox.getSize(new THREE.Vector3());
        const center = bbox.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 0.8;
        const scale = maxDim > 0 ? targetSize / maxDim : 1;

        object.scale.multiplyScalar(scale);
        object.position.x = -center.x * scale;
        object.position.y = -center.y * scale;
        object.position.z = -center.z * scale;

        groupRef.current.add(object);

        const bboxAfter = new THREE.Box3().setFromObject(object);
        const fitted = bboxAfter.getSize(new THREE.Vector3());
        const extent = Math.max(fitted.x, fitted.y, fitted.z);
        const distance = Math.max(extent * 1.75, 0.45);

        camera.position.set(0, 0.15 * distance, distance);
        camera.lookAt(0, 0, 0);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.updateProjectionMatrix();
        }
      },
      undefined,
      (error: unknown) => {
        console.error(`[ModelLoader] Error loading model ${modelUrl}:`, error);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [modelUrl, componentKey, camera]);

  return <group ref={groupRef} />;
}
