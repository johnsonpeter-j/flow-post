import { Building2, Plus, Search } from 'lucide-react';

interface ClientsHeaderProps {
  clientCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClient: () => void;
}

export default function ClientsHeader({
  clientCount,
  searchQuery,
  onSearchChange,
  onAddClient,
}: ClientsHeaderProps) {
  return (
    <div className="p-3.5 px-5 bg-white border-b border-[#E5E7EB] flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#111827]">
        <Building2 size={20} className="text-[#6B7280]" />
        <span>Clients</span>
        <span className="text-[0.7rem] text-[#9CA3AF] bg-[#F3F4F6] py-0.5 px-2 rounded-[10px]">
          {clientCount}
        </span>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 py-2 px-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <Search size={16} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-none outline-none bg-transparent text-[0.8rem] text-[#111827] w-40 placeholder:text-[#9CA3AF]"
          />
        </div>
        <button
          className="flex items-center gap-1.5 py-1.75 px-3 bg-[#111827] border border-[#111827] rounded-md text-white text-[0.75rem] font-medium cursor-pointer hover:bg-[#1F2937] transition-colors"
          onClick={onAddClient}
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>
    </div>
  );
}






