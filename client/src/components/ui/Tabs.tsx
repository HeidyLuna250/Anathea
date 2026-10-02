// ═══════════════════════════════════════════
// ANATHEA — Base UI Tabs Component
// ═══════════════════════════════════════════

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'underline',
}) => {
  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-[#0A1628]/80 rounded-xl border border-white/5 ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#162846] text-[#00D4FF] shadow-sm border border-[#00D4FF]/30'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
              }`}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span className="truncate">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-white/10 text-[#94A3B8]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant
  return (
    <div className={`flex border-b border-white/10 overflow-x-auto scrollbar-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer border-b-2 relative ${
              isActive
                ? 'border-[#00D4FF] text-[#00D4FF] font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20'
            }`}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-white/10 text-[#94A3B8]'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
