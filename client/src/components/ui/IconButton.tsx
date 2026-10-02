// ═══════════════════════════════════════════
// ANATHEA — Base UI IconButton Component
// ═══════════════════════════════════════════

import React from 'react';
import { Tooltip } from './Tooltip';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  isActive?: boolean;
  variant?: 'default' | 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      tooltipPosition = 'top',
      isActive = false,
      variant = 'default',
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-9 h-9 text-base',
      lg: 'w-10 h-10 text-lg',
    }[size];

    const variantClasses = {
      default: isActive
        ? 'bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/40 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
        : 'bg-[#0F1E36]/90 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162846] border border-white/10 hover:border-white/20',
      primary:
        'bg-[#00D4FF] hover:bg-[#38E1FF] text-[#0A1628] font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]',
      ghost: isActive
        ? 'text-[#00D4FF] bg-[#00D4FF]/10'
        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5',
      danger:
        'text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20',
    }[variant];

    const buttonElement = (
      <button
        ref={ref}
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-ring ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {icon}
      </button>
    );

    return (
      <Tooltip content={label} position={tooltipPosition}>
        {buttonElement}
      </Tooltip>
    );
  }
);

IconButton.displayName = 'IconButton';
