'use client';

import type { TaskFilterStatus } from './types';

interface TaskFiltersProps {
  filterStatus: TaskFilterStatus;
  onFilterChange: (status: TaskFilterStatus) => void;
}

export default function TaskFilters({ filterStatus, onFilterChange }: TaskFiltersProps) {
  const filters: TaskFilterStatus[] = ['all', 'pending', 'in-progress', 'done'];

  return (
    <div className="detail-filters flex gap-2 mb-5">
      {filters.map((status) => (
        <button
          key={status}
          className={`filter-btn py-2 px-4 bg-white border rounded-lg text-[0.8rem] font-medium cursor-pointer transition-all ${
            filterStatus === status
              ? 'active bg-[#111827] border-[#111827] text-white shadow-sm'
              : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]'
          }`}
          onClick={() => onFilterChange(status)}
        >
          {status === 'in-progress'
            ? 'Active'
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}


