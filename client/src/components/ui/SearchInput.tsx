// ═══════════════════════════════════════════
// ANATHEA — Base UI SearchInput Component
// ═══════════════════════════════════════════

import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string;
  onChangeValue: (value: string) => void;
  isLoading?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  shortcutHint?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeValue,
  isLoading = false,
  onClear,
  size = 'md',
  shortcutHint,
  placeholder = 'Buscar...',
  className = '',
  id,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-8 text-xs pl-8 pr-7',
    md: 'h-9 text-sm pl-9 pr-8',
    lg: 'h-11 text-base pl-11 pr-10',
  }[size];

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  }[size];

  const handleClear = () => {
    onChangeValue('');
    if (onClear) onClear();
  };

  return (
    <div className={`relative flex items-center w-full group ${className}`}>
      {/* Icono de búsqueda / Loading */}
      <span className="absolute left-3 text-[#94A3B8] group-focus-within:text-[#00D4FF] transition-colors pointer-events-none flex items-center">
        {isLoading ? (
          <Loader2 size={iconSizes} className="animate-spin text-[#00D4FF]" />
        ) : (
          <Search size={iconSizes} />
        )}
      </span>

      {/* Input nativo */}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg bg-[#0F1E36]/90 border border-white/10 text-[#F8FAFC] placeholder:text-[#64748B] focus:border-[#00D4FF]/60 focus:bg-[#162846] focus:shadow-[0_0_12px_rgba(0,212,255,0.15)] transition-all duration-200 focus-ring ${sizeClasses}`}
        {...props}
      />

      {/* Botón de limpiar o atajo de teclado */}
      <div className="absolute right-2.5 flex items-center gap-1">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={14} />
          </button>
        ) : shortcutHint ? (
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#64748B]">
            {shortcutHint}
          </span>
        ) : null}
      </div>
    </div>
  );
};
