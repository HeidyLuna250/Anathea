// ═══════════════════════════════════════════
// ANATHEA — Base UI Button Component
// ═══════════════════════════════════════════

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Tamaños
    const sizeClasses = {
      xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
      sm: 'h-8 px-3 text-xs gap-2 rounded-lg',
      md: 'h-9 px-4 text-sm gap-2 rounded-lg',
      lg: 'h-11 px-5 text-base gap-2.5 rounded-xl',
    }[size];

    // Variantes de diseño médico
    const variantClasses = {
      primary:
        'bg-[#00D4FF] hover:bg-[#38E1FF] active:bg-[#0099BA] text-[#0A1628] font-semibold shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] border border-[#00D4FF]/40',
      secondary:
        'bg-[#162846] hover:bg-[#1A3258] active:bg-[#0F1E36] text-[#F8FAFC] border border-white/10 hover:border-white/20',
      outline:
        'bg-transparent hover:bg-white/5 active:bg-white/10 text-[#F8FAFC] border border-white/15 hover:border-[#00D4FF]/50 hover:text-[#00D4FF]',
      ghost:
        'bg-transparent hover:bg-white/5 active:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC]',
      danger:
        'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none focus-ring ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0 flex items-center">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0 flex items-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
