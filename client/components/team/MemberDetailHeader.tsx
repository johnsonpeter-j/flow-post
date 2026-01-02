'use client';

import type { TeamMemberWithStats } from './types';

interface MemberDetailHeaderProps {
  member: TeamMemberWithStats;
}

export default function MemberDetailHeader({ member }: MemberDetailHeaderProps) {
  return (
    <div className="detail-header flex justify-between items-start mb-6 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
      <div className="detail-member flex gap-4">
        <div
          className="detail-avatar w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
          style={{ background: member.color }}
        >
          {member.avatar}
        </div>
        <div className="detail-info">
          <h2 className="text-lg font-semibold text-[#111827] mb-1">{member.name}</h2>
          <span className="detail-role text-[0.8rem] text-[#6B7280] font-medium">{member.role}</span>
        </div>
      </div>
      <div className="detail-summary flex gap-6">
        <div className="summary-item text-center">
          <span className="summary-num text-[1.5rem] font-bold text-[#111827] block mb-1">
            {member.stats?.total || 0}
          </span>
          <span className="summary-label text-[0.7rem] text-[#6B7280] uppercase tracking-wide font-medium">Total</span>
        </div>
        <div className="summary-item text-center">
          <span className="summary-num active text-[1.5rem] font-bold text-[#3B82F6] block mb-1">
            {member.stats?.inProgress || 0}
          </span>
          <span className="summary-label text-[0.7rem] text-[#6B7280] uppercase tracking-wide font-medium">Active</span>
        </div>
        <div className="summary-item text-center">
          <span className="summary-num done text-[1.5rem] font-bold text-[#10B981] block mb-1">
            {member.stats?.done || 0}
          </span>
          <span className="summary-label text-[0.7rem] text-[#6B7280] uppercase tracking-wide font-medium">Done</span>
        </div>
      </div>
    </div>
  );
}


