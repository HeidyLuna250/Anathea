// ═══════════════════════════════════════════
// ANATHEA — Main 3D Viewer Component
// ═══════════════════════════════════════════

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';
import { Suspense } from 'react';
import { ModelRenderer } from './ModelRenderer';

interface Viewer3DProps {
  modelPath: string;
  wireframe?: boolean;
  opacity?: number;
  color?: string;
}

export function Viewer3D({ modelPath, wireframe, opacity, color }: Viewer3DProps) {
  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-surface-950 relative">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Iluminación básica */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        
        {/* Entorno HDRI suave para brillos realistas */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center>
            <ModelRenderer 
              modelPath={modelPath} 
              wireframe={wireframe} 
              opacity={opacity}
              color={color}
            />
          </Center>
          
          {/* Sombra de contacto en el suelo */}
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={10} 
          />
        </Suspense>

        {/* Controles de cámara orbital */}
        <OrbitControls 
          makeDefault 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={1} 
          maxDistance={20} 
        />
      </Canvas>

      {/* Overlay UI (Cargando) */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="glass px-4 py-2 rounded-lg">
          <p className="text-xs font-mono text-primary-300">Modo 3D Interactivo</p>
        </div>
      </div>
    </div>
  );
}
