'use client';

import type { ProblemMember } from './types';

interface WorkloadProblemItemProps {
  member: ProblemMember;
}

export default function WorkloadProblemItem({ member }: WorkloadProblemItemProps) {
  return (
    <div className="problem-item workload bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
      <div className="problem-item-compact flex justify-between items-center">
        <div className="workload-member flex items-center gap-3">
          <span
            className="workload-avatar w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: member.color }}
          >
            {member.avatar}
          </span>
          <div className="workload-info">
            <span className="workload-name block text-sm font-semibold text-[#111827]">{member.name}</span>
            <span className="workload-role block text-xs text-[#6B7280]">{member.role}</span>
          </div>
        </div>
        <div className="workload-stats flex gap-3">
          <span className="workload-stat active text-xs font-semibold text-[#6366F1] bg-[#E0E7FF] px-3 py-1 rounded-lg">
            {member.activeTasks} active
          </span>
          {member.overdueTasks > 0 && (
            <span className="workload-stat overdue text-xs font-semibold text-[#DC2626] bg-[#FEE2E2] px-3 py-1 rounded-lg">
              {member.overdueTasks} overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
}





