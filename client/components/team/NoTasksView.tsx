'use client';

import { CheckSquare } from 'lucide-react';

export default function NoTasksView() {
  return (
    <div className="no-tasks text-center py-12">
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 max-w-sm mx-auto">
        <div className="w-14 h-14 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
          <CheckSquare size={28} className="text-[#9CA3AF]" />
        </div>
        <h3 className="text-base font-semibold text-[#111827] mb-1">No tasks found</h3>
        <p className="text-[0.85rem] text-[#6B7280]">
          This team member doesn't have any tasks matching the current filter
        </p>
      </div>
    </div>
  );
}


