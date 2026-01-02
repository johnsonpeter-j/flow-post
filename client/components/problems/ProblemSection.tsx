'use client';

import React from 'react';

interface ProblemSectionProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant?: 'urgent' | 'warning' | 'info';
  children: React.ReactNode;
}

export default function ProblemSection({
  title,
  count,
  icon,
  variant = 'info',
  children,
}: ProblemSectionProps) {
  const variantStyles = {
    urgent: 'border-l-4 border-l-[#DC2626]',
    warning: 'border border-[#FEF3C7]',
    info: 'border border-[#E0E7FF]',
  };

  const iconStyles = {
    urgent: 'bg-[#FEE2E2] text-[#DC2626]',
    warning: 'bg-[#FEF3C7] text-[#D97706]',
    info: 'bg-[#E0E7FF] text-[#6366F1]',
  };

  const countStyles = {
    urgent: 'bg-[#F3F4F6] text-[#374151]',
    warning: 'bg-[#D97706] text-white',
    info: 'bg-[#6366F1] text-white',
  };

  return (
    <div
      className={`problem-section ${variant} bg-white rounded-xl ${
        variant === 'urgent' ? 'border border-[#E5E7EB] border-l-4 border-l-[#DC2626]' : variantStyles[variant]
      } overflow-hidden`}
    >
      {variant === 'urgent' ? (
        <div className="problem-section-header flex items-center gap-2.5 px-4 py-3 border-b border-[#F3F4F6]">
          <div className={`problem-icon ${variant} w-7 h-7 rounded-md flex items-center justify-center ${iconStyles[variant]}`}>
            {icon}
          </div>
          <h3 className="flex-1 text-[0.85rem] font-semibold text-[#111827]">{title}</h3>
          <span className={`problem-count bg-[#F3F4F6] text-[#374151] text-[0.7rem] font-semibold py-0.5 px-2 rounded-[10px]`}>
            {count}
          </span>
        </div>
      ) : (
        <div className="problem-section-header flex items-center gap-3 mb-4 p-5 pb-0">
          <div className={`problem-icon ${variant} w-8 h-8 rounded-lg flex items-center justify-center ${iconStyles[variant]}`}>
            {icon}
          </div>
          <h3 className="text-base font-semibold text-[#111827] flex-1">{title}</h3>
          <span className={`problem-count text-xs font-semibold py-1 px-2 rounded-lg ${countStyles[variant]}`}>
            {count}
          </span>
        </div>
      )}
      <div className={variant === 'urgent' ? 'p-2.5' : 'p-5 pt-0'}>{children}</div>
    </div>
  );
}

