// ═══════════════════════════════════════════
// ANATHEA — Base UI EmptyState Component
// ═══════════════════════════════════════════

import React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-white/5 bg-[#0F1E36]/40 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] mb-3">
        {icon || <Inbox size={22} />}
      </div>
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed mb-4">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const SearchEmptyState: React.FC<{ query: string; onClear?: () => void }> = ({
  query,
  onClear,
}) => {
  return (
    <EmptyState
      icon={<SearchX size={22} />}
      title="Sin resultados anatómicos"
      description={`No se encontraron sistemas, órganos o estructuras que coincidan con "${query}".`}
      actionLabel={onClear ? 'Limpiar búsqueda' : undefined}
      onAction={onClear}
    />
  );
};
