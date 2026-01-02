'use client';

import { ArrowRight } from 'lucide-react';

interface MonthlyProgressCardProps {
  month: string;
  planned: number;
  posted: number;
}

export default function MonthlyProgressCard({ month, planned, posted }: MonthlyProgressCardProps) {
  const completionPercentage = planned > 0 ? (posted / planned) * 100 : 0;

  return (
    <div className="monthly-progress-card bg-white border border-[#E5E7EB] rounded-xl p-5 mb-1">
      <div className="monthly-header flex justify-between items-center mb-5">
        <h3 className="text-[1.1rem] font-bold text-[#111827]">{month}</h3>
        <span className="monthly-label text-[0.75rem] text-[#6B7280] bg-[#F3F4F6] py-1 px-2.5 rounded-xl">
          Content Progress
        </span>
      </div>
      <div className="monthly-stats flex items-center justify-center gap-8 mb-5">
        <div className="monthly-stat flex flex-col items-center gap-2">
          <div className="monthly-circle planned w-16 h-16 rounded-full flex items-center justify-center bg-[#DBEAFE]">
            <span className="monthly-num text-2xl font-bold text-[#111827]">{planned}</span>
          </div>
          <span className="monthly-stat-label text-[0.75rem] text-[#6B7280] font-medium">Planned</span>
        </div>
        <div className="monthly-progress-arrow text-[#D1D5DB]">
          <ArrowRight size={20} />
        </div>
        <div className="monthly-stat flex flex-col items-center gap-2">
          <div className="monthly-circle posted w-16 h-16 rounded-full flex items-center justify-center bg-[#D1FAE5]">
            <span className="monthly-num text-2xl font-bold text-[#111827]">{posted}</span>
          </div>
          <span className="monthly-stat-label text-[0.75rem] text-[#6B7280] font-medium">Posted</span>
        </div>
        <div className="monthly-stat completion flex flex-col items-center gap-2">
          <div className="completion-ring w-16 h-16 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
            <span className="completion-percent absolute inset-0 flex items-center justify-center text-[0.9rem] font-bold text-[#10B981]">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <span className="monthly-stat-label text-[0.75rem] text-[#6B7280] font-medium">Completion</span>
        </div>
      </div>
      <div className="monthly-bar h-2 bg-[#E5E7EB] rounded overflow-hidden mb-3">
        <div
          className="monthly-bar-fill h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded transition-all"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      <div className="monthly-footer flex justify-between text-[0.75rem] text-[#6B7280]">
        <span>
          {posted} of {planned} posts published
        </span>
        <span>{planned - posted} remaining</span>
      </div>
    </div>
  );
}


