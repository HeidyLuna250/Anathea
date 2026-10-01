// ═══════════════════════════════════════════
// ANATHEA — Model Renderer Component
// ═══════════════════════════════════════════

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface ModelRendererProps {
  modelPath: string;
  wireframe?: boolean;
  opacity?: number;
  color?: string;
}

export function ModelRenderer({ modelPath, wireframe = false, opacity = 1, color }: ModelRendererProps) {
  
  // Si no hay modelo real, dibujamos un cubo como "placeholder"
  if (modelPath === '/models/placeholder.glb') {
    return (
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={color || '#ffffff'} 
          wireframe={wireframe}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
    );
  }

  // Carga el modelo GLTF/GLB real
  const { scene } = useGLTF(modelPath);

  // Efecto para aplicar materiales personalizados
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

  return <primitive object={scene} />;
}

// Precarga de modelos comunes para mejorar la experiencia
// useGLTF.preload('/models/skeleton.glb');
