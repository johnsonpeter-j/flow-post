'use client';

import { useState, useRef, useEffect } from 'react';
import { Users, Plus, ChevronDown, Building2, User } from 'lucide-react';

interface TeamHeaderProps {
  teamCount: number;
  onAddDepartment?: () => void;
  onAddUser?: () => void;
}

export default function TeamHeader({ teamCount, onAddDepartment, onAddUser }: TeamHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDepartmentClick = () => {
    setIsDropdownOpen(false);
    onAddDepartment?.();
  };

  const handleUserClick = () => {
    setIsDropdownOpen(false);
    onAddUser?.();
  };

  return (
    <div className="view-header flex justify-between items-center px-5 py-3 border-b border-[#E5E7EB] bg-white">
      <div className="view-title flex items-center gap-2">
        <Users size={20} className="text-[#111827]" />
        <span className="text-[0.85rem] font-semibold text-[#111827]">Team</span>
        <span className="team-count text-[0.7rem] bg-[#F3F4F6] text-[#6B7280] py-0.5 px-2 rounded-lg font-semibold ml-1.5">
          {teamCount}
        </span>
      </div>
      <div className="view-actions relative" ref={dropdownRef}>
        <button
          className="action-btn primary flex items-center gap-1.5 py-2 px-3 bg-[#111827] border border-[#111827] rounded-lg text-[0.85rem] text-white font-medium cursor-pointer hover:bg-[#1F2937] transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Plus size={16} />
          Add
          <ChevronDown
            size={14}
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-[#E5E7EB] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-[100] min-w-[180px] overflow-hidden">
            <button
              className="w-full flex items-center gap-2.5 py-2.5 px-3 hover:bg-[#F3F4F6] transition-colors text-left"
              onClick={handleDepartmentClick}
            >
              <Building2 size={16} className="text-[#6B7280]" />
              <span className="text-[0.85rem] text-[#374151]">Department</span>
            </button>
            <button
              className="w-full flex items-center gap-2.5 py-2.5 px-3 hover:bg-[#F3F4F6] transition-colors text-left border-t border-[#E5E7EB]"
              onClick={handleUserClick}
            >
              <User size={16} className="text-[#6B7280]" />
              <span className="text-[0.85rem] text-[#374151]">User</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

