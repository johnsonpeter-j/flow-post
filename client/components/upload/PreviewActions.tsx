'use client';

import { Check } from 'lucide-react';

interface PreviewActionsProps {
  itemCount: number;
  onCancel: () => void;
  onImport: () => void;
}

export default function PreviewActions({ itemCount, onCancel, onImport }: PreviewActionsProps) {
  return (
    <div className="preview-actions flex justify-end gap-3">
      <button
        className="action-btn py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="action-btn primary flex items-center gap-1.5 py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors"
        onClick={onImport}
      >
        <Check size={16} />
        Import {itemCount} Items
      </button>
    </div>
  );
}


