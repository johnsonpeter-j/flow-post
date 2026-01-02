'use client';

import { Users } from 'lucide-react';

export default function NoSelectionView() {
  return (
    <div className="no-selection h-full flex flex-col items-center justify-center text-[#9CA3AF] px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
          <Users size={32} className="text-[#9CA3AF] opacity-60" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827] mb-2">Select a team member</h3>
        <p className="text-[0.85rem] text-[#6B7280]">
          Choose a team member from the sidebar to view their tasks and details
        </p>
      </div>
    </div>
  );
}


