import { Plus } from 'lucide-react';

interface AddClientCardProps {
  onClick: () => void;
}

export default function AddClientCard({ onClick }: AddClientCardProps) {
  return (
    <button
      className="bg-white border border-dashed border-[#E5E7EB] rounded-xl p-5 cursor-pointer transition-all duration-150 text-[#9CA3AF] hover:border-[#6B7280] hover:text-[#6B7280] hover:bg-[#F9FAFB] min-h-[200px] flex flex-col items-center justify-center gap-3"
      onClick={onClick}
    >
      <Plus size={32} />
      <span className="text-[0.85rem] font-medium">Add New Client</span>
    </button>
  );
}



