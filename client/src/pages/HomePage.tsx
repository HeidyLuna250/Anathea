// ═══════════════════════════════════════════
// ANATHEA — Home Page
// Plataforma Médica y Educativa de Exploración 3D
// ═══════════════════════════════════════════

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Compass,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Bone,
  Dumbbell,
  BrainCircuit,
  HeartPulse,
  Wind,
  Apple,
  Droplets,
  Hand,
  Baby,
  Shield,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { getAnatomicalSystems } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAnatomyStore } from '../store/useAnatomyStore';

const SYSTEM_ICONS: Record<string, ReactNode> = {
  esqueletico: <Bone size={20} />,
  muscular: <Dumbbell size={20} />,
  nervioso: <BrainCircuit size={20} />,
  cardiovascular: <HeartPulse size={20} />,
  respiratorio: <Wind size={20} />,
  digestivo: <Apple size={20} />,
  urinario: <Droplets size={20} />,
  endocrino: <Activity size={20} />,
  linfatico: <Shield size={20} />,
  inmunologico: <ShieldCheck size={20} />,
  tegumentario: <Hand size={20} />,
  reproductor: <Baby size={20} />,
};

export function HomePage() {
  const navigate = useNavigate();
  const setActiveSystemSlug = useAnatomyStore((state) => state.setActiveSystemSlug);

  const { data: systems = [] } = useQuery({
    queryKey: ['anatomical-systems'],
    queryFn: getAnatomicalSystems,
  });

  const handleExploreSystem = (slug: string) => {
    setActiveSystemSlug(slug);
    navigate(`/sistema/${slug}`);
  };

  const scrollToSystems = () => {
    const el = document.getElementById('systems-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between">
      {/* Retícula Médica Quirúrgica de Fondo */}
      <div className="absolute inset-0 medical-grid opacity-75 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-16 max-w-5xl mx-auto w-full text-center">
        {/* Badge Clínico Superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/25 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-xs font-mono font-medium text-[#00D4FF] tracking-wider uppercase">
            Atlas Anatómico 3D de Alta Precisión
          </span>
        </div>

        {/* Título Principal de Identidad Médica */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15] mb-5">
          Explora la anatomía <br />
          humana en <span className="text-[#00D4FF]">3D interactivo</span>
        </h1>

        {/* Subtítulo Científico y Educativo */}
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-8">
          Herramienta médica y científica orientada a estudiantes, docentes y profesionales de la salud.
          Visualiza sistemas orgánicos, estructuras tisulares y relaciones biomecánicas en tiempo real.
        </p>

        {/* CTAs Principales */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Button
            size="lg"
            variant="primary"
            onClick={() => handleExploreSystem('esqueletico')}
            icon={<Compass size={18} />}
          >
            Explorar anatomía
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToSystems}
            icon={<Layers size={18} />}
          >
            Ver sistemas
          </Button>
        </div>

        {/* Métricas Científicas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/8 text-left">
          <div className="p-3 rounded-lg bg-[#0F1E36]/60 border border-white/5">
            <div className="text-lg font-mono font-bold text-[#00D4FF]">12</div>
            <div className="text-xs text-[#94A3B8]">Sistemas Anatómicos</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0F1E36]/60 border border-white/5">
            <div className="text-lg font-mono font-bold text-[#F8FAFC]">100%</div>
            <div className="text-xs text-[#94A3B8]">Terminología en Español</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0F1E36]/60 border border-white/5">
            <div className="text-lg font-mono font-bold text-[#00D4FF]">3D</div>
            <div className="text-xs text-[#94A3B8]">Raycasting & Selección</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0F1E36]/60 border border-white/5">
            <div className="text-lg font-mono font-bold text-[#F8FAFC]">Clínico</div>
            <div className="text-xs text-[#94A3B8]">Referencias Científicas</div>
          </div>
        </div>
      </section>

      {/* Sección: Exploración Rápida de Sistemas Anatómicos */}
      <section id="systems-overview" className="relative z-10 px-6 pb-20 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">
                Atlas Completo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
              Sistemas del Cuerpo Humano
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] max-w-md">
            Selecciona cualquier sistema para ingresar directamente al visor tridimensional y examinar su topografía.
          </p>
        </div>

        {/* Grid de Sistemas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {systems.map((system, idx) => (
            <div
              key={system.id}
              onClick={() => handleExploreSystem(system.slug)}
              className="group p-4 rounded-xl bg-[#0F1E36]/70 hover:bg-[#162846] border border-white/8 hover:border-[#00D4FF]/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: system.color ? `${system.color}1A` : 'rgba(0,212,255,0.1)',
                        color: system.color || '#00D4FF',
                      }}
                    >
                      {SYSTEM_ICONS[system.slug] || <Bone size={18} />}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      0{idx + 1}
                    </span>
                  </div>

                  <ArrowRight
                    size={14}
                    className="text-[#64748B] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#00D4FF] transition-colors mb-1">
                  {system.nameEs}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {system.description || 'Estructura anatómica integrada y relaciones biomecánicas del organismo.'}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#64748B] italic">
                  {system.nameLa || system.name}
                </span>
                <span className="text-[#00D4FF] font-medium group-hover:underline">
                  Explorar 3D &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Minimalista Médico */}
      <footer className="relative z-10 py-6 border-t border-white/8 bg-[#0A1628]/80 text-center text-xs text-[#64748B]">
        <p>ANATHEA — Atlas de Anatomía Humana 3D · Plataforma Médica Educativa · Versión 1.0</p>
      </footer>
    </div>
  );
}
