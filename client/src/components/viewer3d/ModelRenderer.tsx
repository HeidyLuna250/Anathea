// ═══════════════════════════════════════════
// ANATHEA — Model Renderer Component
// ═══════════════════════════════════════════

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { ThreeEvent } from '@react-three/fiber';

interface ModelRendererProps {
  modelPath: string;
  wireframe?: boolean;
  opacity?: number;
  color?: string;
}

interface CommonModelProps {
  wireframe?: boolean;
  opacity?: number;
  color?: string;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
}

function PlaceholderModel({ wireframe = false, opacity = 1, color, onPointerDown }: CommonModelProps) {
  return (
    <group onPointerDown={onPointerDown} position={[0, -1, 0]}>
      <mesh name="Cráneo_Placeholder" position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={color || '#ffffff'} wireframe={wireframe} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <mesh name="Tronco_Placeholder" position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color={color || '#ffffff'} wireframe={wireframe} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <mesh name="Brazo_Izquierdo" position={[-1.2, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5]} />
        <meshStandardMaterial color={color || '#ffffff'} wireframe={wireframe} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <mesh name="Brazo_Derecho" position={[1.2, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5]} />
        <meshStandardMaterial color={color || '#ffffff'} wireframe={wireframe} transparent={opacity < 1} opacity={opacity} />
      </mesh>
    </group>
  );
}

interface GLTFModelProps extends CommonModelProps {
  modelPath: string;
}

function GLTFModel({ modelPath, wireframe = false, opacity = 1, color, onPointerDown }: GLTFModelProps) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          child.material = material.clone();

          if (color) {
            (child.material as THREE.MeshStandardMaterial).color.set(color);
          }

          child.material.wireframe = wireframe;
          child.material.transparent = opacity < 1;
          child.material.opacity = opacity;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, wireframe, opacity, color]);

  return <primitive object={scene} onPointerDown={onPointerDown} />;
}

export function ModelRenderer({ modelPath, wireframe = false, opacity = 1, color }: ModelRendererProps) {
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const objectName = e.object.name;
    if (objectName) {
      setSelectedPart(objectName);
    }
  };

  const isPlaceholder = !modelPath || modelPath === '/models/placeholder.glb';

  if (isPlaceholder) {
    return (
      <PlaceholderModel
        wireframe={wireframe}
        opacity={opacity}
        color={color}
        onPointerDown={handlePointerDown}
      />
    );
  }

  return (
    <GLTFModel
      modelPath={modelPath}
      wireframe={wireframe}
      opacity={opacity}
      color={color}
      onPointerDown={handlePointerDown}
    />
  );
}


// Precarga de modelos comunes para mejorar la experiencia
// useGLTF.preload('/models/skeleton.glb');
