// ═══════════════════════════════════════════
// ANATHEA — Base UI ErrorState Component
// ═══════════════════════════════════════════

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error de conexión anatómica',
  message = 'No fue posible cargar la información solicitada desde el servidor.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-red-500/20 bg-red-950/10 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3">
        <AlertCircle size={22} />
      </div>
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">{title}</h3>
      <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed mb-4">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={<RotateCcw size={14} />}
        >
          Reintentar conexión
        </Button>
      )}
    </div>
  );
};
