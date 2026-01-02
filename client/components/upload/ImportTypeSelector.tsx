'use client';

import { Layers, FileText } from 'lucide-react';
import type { ImportType } from './types';

interface ImportTypeSelectorProps {
  importType: ImportType;
  onTypeChange: (type: ImportType) => void;
}

export default function ImportTypeSelector({ importType, onTypeChange }: ImportTypeSelectorProps) {
  return (
    <div className="option-card bg-white border border-[#E5E7EB] rounded-xl p-4">
      <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Import Type</h4>
      <div className="import-type-selector flex gap-2.5">
        <button
          className={`import-type-btn flex-1 flex flex-col items-center gap-1.5 p-4 bg-[#F9FAFB] border-2 rounded-lg cursor-pointer transition-all ${
            importType === 'content'
              ? 'border-[#3B82F6] bg-[#EFF6FF]'
              : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
          }`}
          onClick={() => onTypeChange('content')}
        >
          <Layers size={18} className={importType === 'content' ? 'text-[#3B82F6]' : 'text-[#6B7280]'} />
          <span
            className={`text-[0.8rem] font-medium ${
              importType === 'content' ? 'text-[#111827]' : 'text-[#6B7280]'
            }`}
          >
            Content Ideas
          </span>
          <p className="text-[0.7rem] text-[#9CA3AF]">Import to content bank</p>
        </button>
        <button
          className={`import-type-btn flex-1 flex flex-col items-center gap-1.5 p-4 bg-[#F9FAFB] border-2 rounded-lg cursor-pointer transition-all ${
            importType === 'briefs'
              ? 'border-[#3B82F6] bg-[#EFF6FF]'
              : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
          }`}
          onClick={() => onTypeChange('briefs')}
        >
          <FileText size={18} className={importType === 'briefs' ? 'text-[#3B82F6]' : 'text-[#6B7280]'} />
          <span
            className={`text-[0.8rem] font-medium ${
              importType === 'briefs' ? 'text-[#111827]' : 'text-[#6B7280]'
            }`}
          >
            Content Briefs
          </span>
          <p className="text-[0.7rem] text-[#9CA3AF]">Import detailed briefs</p>
        </button>
      </div>
    </div>
  );
}


