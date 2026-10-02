// ═══════════════════════════════════════════
// ANATHEA — Base UI Badge Component
// ═══════════════════════════════════════════

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'neutral' | 'success' | 'warning' | 'danger' | 'custom';
  color?: string;
  dot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  color,
  dot = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  }[size];

  const variantClasses = {
    cyan: 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30',
    neutral: 'bg-white/5 text-[#94A3B8] border border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30',
    custom: '',
  }[variant];

  const customStyle: React.CSSProperties = color
    ? {
        backgroundColor: `${color}18`,
        color: color,
        borderColor: `${color}40`,
      }
    : {};

  return (
    <span
      style={variant === 'custom' || color ? customStyle : undefined}
      className={`inline-flex items-center font-medium rounded-full tracking-wide select-none ${
        variant !== 'custom' && !color ? variantClasses : 'border'
      } ${sizeClasses} ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color || 'currentColor' }}
        />
      )}
      {children}
    </span>
  );
};
