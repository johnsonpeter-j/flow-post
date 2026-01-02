'use client';

import { AlertTriangle } from 'lucide-react';

interface ProblemsHeaderProps {
  totalProblems: number;
}

export default function ProblemsHeader({ totalProblems }: ProblemsHeaderProps) {
  return (
    <div className="view-header flex justify-between items-center px-5 py-3 border-b border-[#E5E7EB] bg-white">
      <div className="view-title flex items-center gap-2">
        <AlertTriangle size={20} className="text-[#111827]" />
        <span className="text-[0.85rem] font-semibold text-[#111827]">Problems</span>
        {totalProblems > 0 && (
          <span className="problems-total-count bg-[#DC2626] text-white text-[0.7rem] font-semibold py-0.5 px-2 rounded-[10px] ml-1.5">
            {totalProblems}
          </span>
        )}
      </div>
      <div className="problems-summary">
        {totalProblems === 0 ? (
          <span className="all-clear text-[0.8rem] text-[#059669] font-medium">
            ✓ All clear! No immediate issues.
          </span>
        ) : (
          <span className="issues-found text-[0.8rem] text-[#DC2626] font-medium">
            {totalProblems} issue{totalProblems !== 1 ? 's' : ''} need attention
          </span>
        )}
      </div>
    </div>
  );
}


