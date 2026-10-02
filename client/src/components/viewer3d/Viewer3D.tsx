// ═══════════════════════════════════════════
// ANATHEA — Main 3D Viewer Component
// Visor Anatómico Tridimensional de Precisión Quirúrgica
// ═══════════════════════════════════════════

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Maximize2,
  Layers,
  Box,
  Focus,
  PanelRightClose,
  PanelRightOpen,
  X,
  Target,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ModelRenderer } from './ModelRenderer';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { IconButton } from '../ui/IconButton';
import { Badge } from '../ui/Badge';

interface Viewer3DProps {
  modelPath: string;
  wireframe?: boolean;
  opacity?: number;
  color?: string;
  systemName?: string;
}

// Controlador de cámara sincronizado con acciones de la barra médica
function CameraController({
  cameraResetCount,
  focusTargetCount,
}: {
  cameraResetCount: number;
  focusTargetCount: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (cameraResetCount > 0 && controlsRef.current) {
      camera.position.set(0, 0, 5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [cameraResetCount, camera]);

  useEffect(() => {
    if (focusTargetCount > 0 && controlsRef.current) {
      camera.position.set(0, 0, 3.8);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [focusTargetCount, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      minDistance={1}
      maxDistance={25}
    />
  );
}

export function Viewer3D({
  modelPath,
  wireframe: propWireframe,
  opacity,
  color,
  systemName,
}: Viewer3DProps) {
  // Store global de ANATHEA
  const globalWireframe = useAnatomyStore((state) => state.wireframe);
  const toggleWireframe = useAnatomyStore((state) => state.toggleWireframe);
  const isIsolated = useAnatomyStore((state) => state.isIsolated);
  const toggleIsolate = useAnatomyStore((state) => state.toggleIsolate);
  const cameraResetCount = useAnatomyStore((state) => state.cameraResetCount);
  const triggerResetCamera = useAnatomyStore((state) => state.triggerResetCamera);
  const focusTargetCount = useAnatomyStore((state) => state.focusTargetCount);
  const triggerFocusTarget = useAnatomyStore((state) => state.triggerFocusTarget);
  const isInfoPanelOpen = useAnatomyStore((state) => state.isInfoPanelOpen);
  const toggleInfoPanel = useAnatomyStore((state) => state.toggleInfoPanel);

  const selectedPartName = useAnatomyStore((state) => state.selectedPartName);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);

  const activeWireframe = propWireframe !== undefined ? propWireframe : globalWireframe;

  // Formatear nombre de estructura seleccionada
  const formattedPartName = selectedPartName
    ? selectedPartName
        .replace(/_Placeholder/g, '')
        .replace(/_/g, ' ')
        .trim()
    : null;

  return (
    <div className="w-full h-full relative overflow-hidden select-none medical-grid">
      {/* 3D Canvas con Three.js & Fiber */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Iluminación Quirúrgica / Médica calibrada */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={0.7} color="#00D4FF" />
        <directionalLight position={[0, -10, 5]} intensity={0.4} />

        {/* Entorno HDRI Suave */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center>
            <ModelRenderer
              modelPath={modelPath}
              wireframe={activeWireframe}
              opacity={opacity}
              color={color}
            />
          </Center>

          {/* Sombra de Contacto Médica */}
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.35}
            scale={18}
            blur={2.2}
            far={8}
            color="#000000"
          />
        </Suspense>

        {/* Controlador Orbital de Cámara con soporte para Reset y Centrado */}
        <CameraController
          cameraResetCount={cameraResetCount}
          focusTargetCount={focusTargetCount}
        />
      </Canvas>

      {/* 🎯 Banner Superior Flotante: Selección Activa */}
      {formattedPartName && (
        <div className="absolute top-4 left-4 z-20 animate-slide-down">
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#0F1E36]/90 backdrop-blur-md border border-[#00D4FF]/40 shadow-xl shadow-cyan-950/40">
            <div className="w-7 h-7 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]">
              <Target size={16} />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D4FF]">
                Estructura Seleccionada
              </span>
              <span className="text-sm font-bold text-[#F8FAFC]">
                {formattedPartName}
              </span>
            </div>

            <button
              onClick={() => setSelectedPart(null)}
              className="ml-2 p-1 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Deseleccionar estructura"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 🛠️ Barra de Controles Compactos del Visor 3D (Superior Derecha) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0F1E36]/85 backdrop-blur-md border border-white/10 shadow-lg">
        <IconButton
          icon={<RotateCcw size={15} />}
          label="Restablecer cámara (↺)"
          onClick={triggerResetCamera}
          size="sm"
          tooltipPosition="bottom"
        />

        <IconButton
          icon={<Focus size={15} />}
          label="Centrar estructura (⛶)"
          onClick={triggerFocusTarget}
          size="sm"
          tooltipPosition="bottom"
        />

        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        <IconButton
          icon={<Box size={15} />}
          label={activeWireframe ? 'Desactivar malla (Wireframe)' : 'Activar malla (Wireframe)'}
          onClick={toggleWireframe}
          isActive={activeWireframe}
          size="sm"
          tooltipPosition="bottom"
        />

        <IconButton
          icon={<Layers size={15} />}
          label={isIsolated ? 'Mostrar todo el modelo' : 'Aislar estructura seleccionada'}
          onClick={toggleIsolate}
          isActive={isIsolated}
          size="sm"
          tooltipPosition="bottom"
          disabled={!selectedPartName}
        />

        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        <IconButton
          icon={isInfoPanelOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
          label={isInfoPanelOpen ? 'Ocultar panel de información' : 'Mostrar panel de información'}
          onClick={toggleInfoPanel}
          size="sm"
          tooltipPosition="bottom"
        />
      </div>

      {/* 🧭 Guía de Interacción en Esquina Inferior Izquierda */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden md:flex items-center gap-3 text-[11px] font-mono text-[#64748B] bg-[#0A1628]/70 px-3 py-1.5 rounded-lg border border-white/5">
        <span>Rotar: Clic izq.</span>
        <span>·</span>
        <span>Desplazar: Clic der.</span>
        <span>·</span>
        <span>Zoom: Rueda</span>
        <span>·</span>
        <span>Seleccionar: Clic sobre estructura</span>
      </div>
    </div>
  );
}
