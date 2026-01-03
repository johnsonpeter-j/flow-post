'use client';

import { Upload, X } from 'lucide-react';
import type { UploadStep } from './types';

interface UploadHeaderProps {
  step: UploadStep;
  onStartOver?: () => void;
}

export default function UploadHeader({ step, onStartOver }: UploadHeaderProps) {
  return (
    <div className="view-header flex justify-between items-center p-6 border-b border-[#E5E7EB] bg-white">
      <div className="view-title flex items-center gap-2">
        <Upload size={20} className="text-[#111827]" />
        <span className="text-lg font-semibold text-[#111827]">Bulk Import</span>
      </div>
      {step > 1 && step < 3 && (
        <button
          className="action-btn flex items-center gap-1.5 py-2 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
          onClick={onStartOver}
        >
          <X size={16} />
          Start Over
        </button>
      )}
    </div>
  );
}





