'use client';

import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import ClientDropdown from '@/components/ClientDropdown';
import type { Client } from '@/components/clients/types';

interface CalendarHeaderProps {
  clients: Client[];
  filterClient: string | null;
  onFilterChange: (clientId: string | null) => void;
  currentDate: Date;
  onNavigateMonth: (direction: number) => void;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function CalendarHeader({
  clients,
  filterClient,
  onFilterChange,
  currentDate,
  onNavigateMonth,
}: CalendarHeaderProps) {
  return (
    <div className="view-header flex justify-between items-center px-5 py-3 border-b border-[#E5E7EB] bg-white">
      <div className="view-title flex items-center gap-2">
        <Calendar size={20} className="text-[#111827]" />
        <span className="text-[0.85rem] font-semibold text-[#111827]">Content Calendar</span>
      </div>
      <div className="view-actions flex items-center gap-3">
        <ClientDropdown clients={clients} selectedClient={filterClient} onSelect={onFilterChange} />
        <div className="month-nav flex items-center gap-2.5">
          <button
            className="nav-btn w-7 h-7 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6]"
            onClick={() => onNavigateMonth(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="current-month font-semibold text-[#111827] min-w-[130px] text-center text-[0.9rem]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            className="nav-btn w-7 h-7 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6]"
            onClick={() => onNavigateMonth(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}





