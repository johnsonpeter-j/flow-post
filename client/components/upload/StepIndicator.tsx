'use client';

import { Check } from 'lucide-react';
import type { UploadStep } from './types';

interface StepIndicatorProps {
  step: UploadStep;
}

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="upload-steps flex items-center justify-center gap-2 p-5 bg-white border border-[#E5E7EB] rounded-xl">
      <div
        className={`upload-step flex items-center gap-2 ${step >= 1 ? 'active' : ''} ${
          step > 1 ? 'completed' : ''
        }`}
      >
        <div
          className={`step-num w-7 h-7 rounded-full flex items-center justify-center text-[0.75rem] font-semibold ${
            step > 1
              ? 'bg-[#10B981] text-white'
              : step >= 1
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#F3F4F6] text-[#9CA3AF]'
          }`}
        >
          {step > 1 ? <Check size={14} /> : '1'}
        </div>
        <span
          className={`text-[0.85rem] font-medium ${
            step >= 1 ? (step > 1 ? 'text-[#059669]' : 'text-[#111827]') : 'text-[#9CA3AF]'
          }`}
        >
          Upload File
        </span>
      </div>
      <div className="step-line w-10 h-0.5 bg-[#E5E7EB]" />
      <div
        className={`upload-step flex items-center gap-2 ${step >= 2 ? 'active' : ''} ${
          step > 2 ? 'completed' : ''
        }`}
      >
        <div
          className={`step-num w-7 h-7 rounded-full flex items-center justify-center text-[0.75rem] font-semibold ${
            step > 2
              ? 'bg-[#10B981] text-white'
              : step >= 2
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#F3F4F6] text-[#9CA3AF]'
          }`}
        >
          {step > 2 ? <Check size={14} /> : '2'}
        </div>
        <span
          className={`text-[0.85rem] font-medium ${
            step >= 2 ? (step > 2 ? 'text-[#059669]' : 'text-[#111827]') : 'text-[#9CA3AF]'
          }`}
        >
          Preview & Map
        </span>
      </div>
      <div className="step-line w-10 h-0.5 bg-[#E5E7EB]" />
      <div className={`upload-step flex items-center gap-2 ${step >= 3 ? 'active' : ''}`}>
        <div
          className={`step-num w-7 h-7 rounded-full flex items-center justify-center text-[0.75rem] font-semibold ${
            step >= 3 ? 'bg-[#3B82F6] text-white' : 'bg-[#F3F4F6] text-[#9CA3AF]'
          }`}
        >
          3
        </div>
        <span
          className={`text-[0.85rem] font-medium ${
            step >= 3 ? 'text-[#111827]' : 'text-[#9CA3AF]'
          }`}
        >
          Complete
        </span>
      </div>
    </div>
  );
}





