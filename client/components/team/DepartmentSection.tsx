'use client';

import { ChevronDown } from 'lucide-react';
import type { Department, TeamMember } from '@/data/mockData';
import type { DepartmentStats } from './types';
import { getDeptIcon } from './utils';
import MemberCard from './MemberCard';

interface DepartmentSectionProps {
  department: Department;
  members: TeamMember[];
  deptStats: DepartmentStats;
  isExpanded: boolean;
  selectedMemberId: string | null;
  getTaskStats: (memberId: string) => {
    total: number;
    pending: number;
    inProgress: number;
    done: number;
  };
  hasOverdue: (memberId: string) => boolean;
  onToggle: () => void;
  onMemberSelect: (member: TeamMember) => void;
}

export default function DepartmentSection({
  department,
  members,
  deptStats,
  isExpanded,
  selectedMemberId,
  getTaskStats,
  hasOverdue,
  onToggle,
  onMemberSelect,
}: DepartmentSectionProps) {
  return (
    <div className="dept-section border-b border-[#E5E7EB] last:border-b-0">
      <div
        className="dept-header flex items-center justify-between py-3.5 px-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors"
        onClick={onToggle}
      >
        <div className="dept-info flex items-center gap-3">
          <div
            className="dept-icon-wrapper w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${department.color}15`, color: department.color }}
          >
            <span className="text-base">{getDeptIcon(department.icon)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="dept-name text-[0.85rem] font-semibold text-[#111827]">{department.name}</span>
            <span className="dept-count text-[0.65rem] bg-[#F3F4F6] text-[#6B7280] py-0.5 px-2 rounded-md font-medium">
              {members.length}
            </span>
          </div>
        </div>
        <div className="dept-meta flex items-center gap-3">
          {deptStats.total > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="dept-tasks-done text-[0.7rem] font-medium text-[#10B981]">
                {deptStats.done}
              </span>
              <span className="dept-tasks-separator text-[0.7rem] text-[#D1D5DB]">/</span>
              <span className="dept-tasks-total text-[0.7rem] text-[#6B7280]">
                {deptStats.total}
              </span>
            </div>
          )}
          <ChevronDown
            size={16}
            className={`dept-chevron text-[#9CA3AF] transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="dept-members py-2 px-3 pb-3 bg-[#FAFAFA]">
          {members.length === 0 ? (
            <div className="text-center py-4 text-[0.75rem] text-[#9CA3AF]">
              No members in this department
            </div>
          ) : (
            members.map((member) => {
              const stats = getTaskStats(member.id);
              return (
                <MemberCard
                  key={member.id}
                  member={member}
                  stats={stats}
                  isSelected={selectedMemberId === member.id}
                  hasOverdue={hasOverdue(member.id)}
                  onClick={() => onMemberSelect(member)}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}


