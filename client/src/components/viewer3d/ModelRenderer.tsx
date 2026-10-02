// ═══════════════════════════════════════════
// ANATHEA — Model Renderer Component
// Renderizado Médico 3D con Resaltado Quirúrgico & Aislamiento
// ═══════════════════════════════════════════

import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
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
  selectedPartName: string | null;
  isIsolated: boolean;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
}

function PlaceholderModel({
  wireframe = false,
  opacity = 1,
  color = '#E8D44D',
  selectedPartName,
  isIsolated,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}: CommonModelProps) {
  const parts = [
    {
      name: 'Cráneo_Placeholder',
      displayName: 'Cráneo',
      position: [0, 2.4, 0] as [number, number, number],
      geometry: <sphereGeometry args={[0.75, 32, 32]} />,
    },
    {
      name: 'Tronco_Placeholder',
      displayName: 'Tronco y Caja Torácica',
      position: [0, 0.5, 0] as [number, number, number],
      geometry: <boxGeometry args={[1.4, 1.9, 0.9]} />,
    },
    {
      name: 'Brazo_Izquierdo',
      displayName: 'Extremidad Superior Izquierda',
      position: [-1.15, 0.5, 0] as [number, number, number],
      geometry: <cylinderGeometry args={[0.18, 0.16, 1.5, 24]} />,
    },
    {
      name: 'Brazo_Derecho',
      displayName: 'Extremidad Superior Derecha',
      position: [1.15, 0.5, 0] as [number, number, number],
      geometry: <cylinderGeometry args={[0.18, 0.16, 1.5, 24]} />,
    },
    {
      name: 'Fémur',
      displayName: 'Fémur y Extremidades Inferiores',
      position: [0, -1.3, 0] as [number, number, number],
      geometry: <cylinderGeometry args={[0.24, 0.2, 1.7, 24]} />,
    },
  ];

  return (
    <group position={[0, -0.2, 0]}>
      {parts.map((part) => {
        const isSelected =
          selectedPartName === part.name ||
          selectedPartName === part.displayName ||
          (selectedPartName && selectedPartName.toLowerCase().includes(part.displayName.toLowerCase()));

        // Opacidad reactiva en modo aislamiento
        const currentOpacity = isIsolated && selectedPartName && !isSelected ? 0.15 : opacity;
        const isTransparent = currentOpacity < 1 || (isIsolated && selectedPartName !== null);

        return (
          <mesh
            key={part.name}
            name={part.name}
            position={part.position}
            onPointerDown={onPointerDown}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
          >
            {part.geometry}
            <meshStandardMaterial
              color={isSelected ? '#00D4FF' : color}
              wireframe={wireframe}
              transparent={isTransparent}
              opacity={currentOpacity}
              roughness={0.35}
              metalness={0.2}
              emissive={isSelected ? new THREE.Color('#00D4FF') : new THREE.Color('#000000')}
              emissiveIntensity={isSelected ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

interface GLTFModelProps extends CommonModelProps {
  modelPath: string;
}

function GLTFModel({
  modelPath,
  wireframe = false,
  opacity = 1,
  color,
  selectedPartName,
  isIsolated,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}: GLTFModelProps) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          child.material = material.clone();

          const isSelected = selectedPartName === child.name;
          const currentOpacity = isIsolated && selectedPartName && !isSelected ? 0.15 : opacity;

          if (color) {
            (child.material as THREE.MeshStandardMaterial).color.set(isSelected ? '#00D4FF' : color);
          }

          if (isSelected) {
            (child.material as THREE.MeshStandardMaterial).emissive.set('#00D4FF');
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
          } else {
            (child.material as THREE.MeshStandardMaterial).emissive.set('#000000');
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          }

          child.material.wireframe = wireframe;
          child.material.transparent = currentOpacity < 1;
          child.material.opacity = currentOpacity;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, wireframe, opacity, color, selectedPartName, isIsolated]);

  return (
    <primitive
      object={scene}
      onPointerDown={onPointerDown}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

export function ModelRenderer({
  modelPath,
  wireframe = false,
  opacity = 1,
  color,
}: ModelRendererProps) {
  const selectedPartName = useAnatomyStore((state) => state.selectedPartName);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);
  const isIsolated = useAnatomyStore((state) => state.isIsolated);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const objectName = e.object.name;
    if (objectName) {
      // Si ya está seleccionado, alternar o mantener
      setSelectedPart(objectName);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  const isPlaceholder = !modelPath || modelPath === '/models/placeholder.glb';

  if (isPlaceholder) {
    return (
      <PlaceholderModel
        wireframe={wireframe}
        opacity={opacity}
        color={color}
        selectedPartName={selectedPartName}
        isIsolated={isIsolated}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    );
  }

  return (
    <GLTFModel
      modelPath={modelPath}
      wireframe={wireframe}
      opacity={opacity}
      color={color}
      selectedPartName={selectedPartName}
      isIsolated={isIsolated}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}
