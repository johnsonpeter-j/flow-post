'use client';

import { CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ImportType } from './types';

interface SuccessStepProps {
  itemCount: number;
  importType: ImportType;
  selectedClient: string;
  onImportMore: () => void;
}

export default function SuccessStep({
  itemCount,
  importType,
  selectedClient,
  onImportMore,
}: SuccessStepProps) {
  const router = useRouter();

  return (
    <div className="upload-step-content flex flex-col items-center justify-center py-12">
      <div className="upload-success flex flex-col items-center gap-4 text-center max-w-md">
        <div className="success-icon w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center">
          <CheckCircle2 size={48} className="text-[#059669]" />
        </div>
        <h2 className="text-2xl font-semibold text-[#111827]">Import Complete!</h2>
        <p className="text-sm text-[#6B7280]">
          {itemCount} items have been added to your{' '}
          {importType === 'content' ? 'content bank' : 'content briefs'}.
        </p>
        <div className="success-actions flex gap-3 mt-4">
          <button
            className="action-btn flex items-center gap-1.5 py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            onClick={onImportMore}
          >
            <Plus size={16} />
            Import More
          </button>
          <button
            className="action-btn primary flex items-center gap-1.5 py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors"
            onClick={() => {
              if (importType === 'content') {
                router.push('/pipeline');
              } else {
                router.push(`/clients/${selectedClient}`);
              }
            }}
          >
            <ArrowRight size={16} />
            View {importType === 'content' ? 'Pipeline' : 'Briefs'}
          </button>
        </div>
      </div>
    </div>
  );
}





