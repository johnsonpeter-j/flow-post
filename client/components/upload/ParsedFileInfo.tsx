'use client';

import { FileText, Sparkles } from 'lucide-react';
import type { ParsedData } from './types';

interface ParsedFileInfoProps {
  parsedData: ParsedData;
  itemCount: number;
}

export default function ParsedFileInfo({ parsedData, itemCount }: ParsedFileInfoProps) {
  return (
    <div className="parsed-info flex justify-between items-center p-4 bg-white border border-[#E5E7EB] rounded-xl">
      <div className="parsed-file flex items-center gap-3">
        <FileText size={20} className="text-[#6B7280]" />
        <div className="flex flex-col">
          <span className="file-name text-sm font-semibold text-[#111827]">{parsedData.fileName}</span>
          <span className="file-meta text-xs text-[#9CA3AF]">
            {parsedData.source.toUpperCase()} • {itemCount} items detected
          </span>
        </div>
      </div>
      <div className="ai-badge flex items-center gap-1.5 py-1 px-3 bg-[#F3E8FF] border border-[#E9D5FF] rounded-lg">
        <Sparkles size={14} className="text-[#7C3AED]" />
        <span className="text-[0.7rem] font-semibold text-[#7C3AED]">AI Parsed</span>
      </div>
    </div>
  );
}





