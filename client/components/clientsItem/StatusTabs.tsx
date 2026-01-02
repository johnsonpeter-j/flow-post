import type { Brief } from './types';

interface StatusTabsProps {
  filterStatus: string;
  onStatusChange: (status: string) => void;
  briefs: Brief[];
}

export default function StatusTabs({ filterStatus, onStatusChange, briefs }: StatusTabsProps) {
  const getStatusCount = (status: string) => {
    if (status === 'all') return briefs.length;
    return briefs.filter((b) => b.status === status).length;
  };

  return (
    <div className="flex gap-1.5 mb-5 p-1 bg-[#F3F4F6] rounded-[10px] w-fit">
      <button
        className={`py-2 px-3 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-all ${
          filterStatus === 'all'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onStatusChange('all')}
      >
        All
        <span className="ml-1.5 text-[0.7rem] text-[#9CA3AF]">({getStatusCount('all')})</span>
      </button>
      <button
        className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-all ${
          filterStatus === 'pending'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onStatusChange('pending')}
      >
        <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
        Pending
        <span className="ml-1.5 text-[0.7rem] text-[#9CA3AF]">({getStatusCount('pending')})</span>
      </button>
      <button
        className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-all ${
          filterStatus === 'in-progress'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onStatusChange('in-progress')}
      >
        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
        In Progress
        <span className="ml-1.5 text-[0.7rem] text-[#9CA3AF]">({getStatusCount('in-progress')})</span>
      </button>
      <button
        className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-all ${
          filterStatus === 'approved'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onStatusChange('approved')}
      >
        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
        Approved
        <span className="ml-1.5 text-[0.7rem] text-[#9CA3AF]">({getStatusCount('approved')})</span>
      </button>
    </div>
  );
}



