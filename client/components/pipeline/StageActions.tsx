'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { StageConfig } from './types';
import { stages } from './types';
import { getNextStage, getPrevStage } from './utils';

interface StageActionsProps {
  currentStage: string;
  stageConfigs: Record<string, StageConfig>;
  onMoveStage: (stage: string) => void;
}

export default function StageActions({
  currentStage,
  stageConfigs,
  onMoveStage,
}: StageActionsProps) {
  const nextStage = getNextStage(currentStage);
  const prevStage = getPrevStage(currentStage);

  return (
    <div className="modal-actions flex gap-2.5 justify-end pt-4 border-t border-[#E5E7EB]">
      {prevStage && (
        <button
          className="stage-action-btn prev flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-[0.8rem] font-medium cursor-pointer font-inherit transition-all bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
          onClick={() => onMoveStage(prevStage)}
        >
          <ChevronLeft size={16} />
          Move to {stageConfigs[prevStage].label}
        </button>
      )}
      {nextStage && (
        <button
          className="stage-action-btn next flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-[0.8rem] font-medium cursor-pointer font-inherit transition-all bg-[#111827] border border-[#111827] text-white hover:bg-[#1F2937]"
          onClick={() => onMoveStage(nextStage)}
        >
          Move to {stageConfigs[nextStage].label}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

