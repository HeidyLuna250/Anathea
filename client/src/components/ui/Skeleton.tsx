// ═══════════════════════════════════════════
// ANATHEA — Base UI Skeleton Component
// ═══════════════════════════════════════════

import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }[variant];

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={`bg-white/5 animate-pulse border border-white/5 ${variantClasses} ${className}`}
    />
  );
};

export const AnatomyTreeSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3">
          <Skeleton variant="circular" width={24} height={24} />
          <div className="flex-1 space-y-1.5">
            <Skeleton variant="text" width="65%" height={14} />
            <Skeleton variant="text" width="40%" height={10} />
          </div>
        </div>
      ))}
    </div>
  );
};
