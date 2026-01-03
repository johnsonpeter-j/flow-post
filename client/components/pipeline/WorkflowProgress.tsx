'use client';

import { Check, ChevronRight } from 'lucide-react';
import type { StageConfig } from './types';
import { stages } from './types';

interface WorkflowProgressProps {
  currentStage: string;
  stageConfigs: Record<string, StageConfig>;
  onStageClick: (stage: string) => void;
}

export default function WorkflowProgress({
  currentStage,
  stageConfigs,
  onStageClick,
}: WorkflowProgressProps) {
  return (
    <div className="modal-section workflow-section">
      <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Workflow Progress</h4>
      <div className="pipeline-workflow flex items-start justify-between flex-wrap gap-1">
        {stages.map((stage, index) => {
          const isCompleted = stages.indexOf(currentStage as typeof stages[number]) > index;
          const isCurrent = currentStage === stage;
          const StageIcon = stageConfigs[stage].icon;
          return (
            <div key={stage} className="flex items-center">
              <div
                className={`pipeline-workflow-step flex flex-col items-center gap-1.5 flex-1 min-w-[50px] max-w-[80px] cursor-pointer transition-all ${
                  isCompleted ? 'completed' : ''
                } ${isCurrent ? 'current' : ''}`}
                onClick={() => onStageClick(stage)}
              >
                <div
                  className={`pipeline-step-icon w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    isCompleted
                      ? 'bg-[#10B981] text-white'
                      : isCurrent
                      ? 'text-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]'
                      : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}
                  style={isCurrent ? { background: stageConfigs[stage].color } : {}}
                >
                  {isCompleted ? <Check size={14} /> : <StageIcon size={14} />}
                </div>
                <span
                  className={`pipeline-step-label text-[0.6rem] text-center font-medium ${
                    isCompleted
                      ? 'text-[#059669]'
                      : isCurrent
                      ? 'text-[#2563EB] font-semibold'
                      : 'text-[#6B7280]'
                  }`}
                >
                  {stageConfigs[stage].label}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`pipeline-workflow-connector flex items-center justify-center text-[#D1D5DB] mt-2.5 ${
                    isCompleted ? 'text-[#10B981]' : ''
                  }`}
                >
                  <ChevronRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}





