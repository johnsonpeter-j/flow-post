'use client';

import type { TeamMember } from '@/data/mockData';

interface MemberCardProps {
  member: TeamMember;
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    done: number;
  };
  isSelected: boolean;
  hasOverdue: boolean;
  onClick: () => void;
}

export default function MemberCard({
  member,
  stats,
  isSelected,
  hasOverdue,
  onClick,
}: MemberCardProps) {
  return (
    <div
      className={`member-card flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer mb-1.5 transition-all duration-150 ${
        isSelected
          ? 'selected bg-white border border-[#E5E7EB] shadow-sm'
          : 'hover:bg-white hover:shadow-sm border border-transparent'
      }`}
      onClick={onClick}
    >
      <div
        className="member-avatar w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-[0.75rem] shadow-sm"
        style={{ background: member.color }}
      >
        {member.avatar}
      </div>
      <div className="member-info flex-1 min-w-0">
        <span className="member-name text-[0.8rem] font-semibold text-[#111827] block truncate">
          {member.name}
        </span>
        <span className="member-role text-[0.7rem] text-[#6B7280]">{member.role}</span>
      </div>
      <div className="member-stats flex gap-1.5 shrink-0">
        {stats.inProgress > 0 && (
          <span className="stat-badge active text-[0.65rem] font-semibold py-0.5 px-1.5 rounded-md bg-[#DBEAFE] text-[#2563EB]">
            {stats.inProgress}
          </span>
        )}
        {stats.pending > 0 && (
          <span className="stat-badge pending text-[0.65rem] font-semibold py-0.5 px-1.5 rounded-md bg-[#FEF3C7] text-[#D97706]">
            {stats.pending}
          </span>
        )}
        {hasOverdue && (
          <span className="stat-badge overdue text-[0.65rem] font-semibold py-0.5 px-1.5 rounded-md bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center min-w-[18px]">
            !
          </span>
        )}
      </div>
    </div>
  );
}


