import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
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

    const loader = new FBXLoader();

    console.log(`[ModelLoader] Loading ${modelUrl}`);

    loader.load(
      modelUrl,
      (object: THREE.Group) => {
        console.log(`[ModelLoader] Loaded ${modelUrl}`, object);

        // Clear previous models
        while (groupRef.current?.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }

        // Calculate bounding box to auto-fit
        const bbox = new THREE.Box3().setFromObject(object);
        const size = bbox.getSize(new THREE.Vector3());
        const center = bbox.getCenter(new THREE.Vector3());

        console.log(`[ModelLoader] Model bbox size:`, size);
        console.log(`[ModelLoader] Model bbox center:`, center);

        // Calculate scale to fit model in a 1m x 1m x 1m box
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 0.8; // 80cm max dimension
        const scale = maxDim > 0 ? targetSize / maxDim : 1;

        console.log(`[ModelLoader] Max dimension: ${maxDim.toFixed(3)}m, scale: ${scale.toFixed(3)}`);

        // Apply scale
        object.scale.multiplyScalar(scale);

        // Center the model at origin
        object.position.x = -center.x * scale;
        object.position.y = -center.y * scale;
        object.position.z = -center.z * scale;

        groupRef.current?.add(object);

        // Adjust camera to view the model
        const newSize = size.multiplyScalar(scale);
        const distance = Math.max(newSize.x, newSize.y, newSize.z) * 1.5;

        camera.position.z = distance;
        camera.lookAt(0, 0, 0);

        console.log(`[ModelLoader] Camera distance: ${distance.toFixed(3)}m`);
      },
      (progress: ProgressEvent) => {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        console.log(`[ModelLoader] Loading progress: ${percent}%`);
      },
      (error: unknown) => {
        console.error(`[ModelLoader] Error loading model ${modelUrl}:`, error);
      }
    );
  }, [modelUrl, componentKey, camera]);

  return <group ref={groupRef} />;
}
