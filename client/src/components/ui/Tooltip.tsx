// ═══════════════════════════════════════════
// ANATHEA — Base UI Tooltip Component
// ═══════════════════════════════════════════

import React, { useState } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hide = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position];

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs font-medium text-[#F8FAFC] bg-[#0F1E36] border border-white/10 rounded-md shadow-lg pointer-events-none whitespace-nowrap animate-fade-in ${positionClasses}`}
        >
          {content}
          <div
            className={`absolute w-1.5 h-1.5 bg-[#0F1E36] border-white/10 rotate-45 ${
              position === 'top'
                ? 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b'
                : position === 'bottom'
                ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t'
                : position === 'left'
                ? 'left-full -ml-1 top-1/2 -translate-y-1/2 border-t border-r'
                : 'right-full -mr-1 top-1/2 -translate-y-1/2 border-b border-l'
            }`}
          />
        </div>
      )}
    </div>
  );
};
