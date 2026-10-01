// ═══════════════════════════════════════════
// ANATHEA — Home Page
// ═══════════════════════════════════════════

import { Brain, Layers, BookOpen, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: <Brain size={28} />,
    title: 'Exploración 3D',
    description: 'Navega el cuerpo humano en tres dimensiones con modelos interactivos de alta fidelidad.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: <Layers size={28} />,
    title: 'Capas Anatómicas',
    description: 'Activa y desactiva capas para visualizar desde la piel hasta los huesos.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Información Clínica',
    description: 'Accede a descripciones anatómicas detalladas con referencias bibliográficas.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Zap size={28} />,
    title: 'Búsqueda Inteligente',
    description: 'Encuentra cualquier estructura anatómica al instante con búsqueda avanzada.',
    color: 'from-amber-500 to-orange-500',
  },
];

export function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary-500/10 border border-primary-500/20">
            <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs font-medium text-primary-300 tracking-wide">
              Plataforma Educativa de Anatomía
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-surface-100 to-surface-200/80 bg-clip-text text-transparent">
              Explora el cuerpo
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400 bg-clip-text text-transparent">
              humano en 3D
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-surface-200/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Una plataforma interactiva diseñada para estudiantes de medicina y profesionales de la salud.
            Visualiza, aprende y comprende cada estructura del cuerpo humano.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 justify-center">
            <button
              id="cta-explore"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-400 hover:to-primary-500 shadow-glow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Comenzar Exploración
            </button>
            <button
              id="cta-learn-more"
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-surface-100 font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              Ver Demo
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase text-surface-200/30">Descubre más</span>
          <div className="w-5 h-8 rounded-full border border-surface-200/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary-400/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="glass glass-hover rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-surface-200/50 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
