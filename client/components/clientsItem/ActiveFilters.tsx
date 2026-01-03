import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filterType: string;
  filterCategory: string;
  onRemoveType: () => void;
  onRemoveCategory: () => void;
}

export default function ActiveFilters({
  filterType,
  filterCategory,
  onRemoveType,
  onRemoveCategory,
}: ActiveFiltersProps) {
  if (filterType === 'all' && filterCategory === 'all') return null;

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filterType !== 'all' && (
        <span className="flex items-center gap-1.5 py-1 px-2 bg-[#F3F4F6] rounded-md text-[0.75rem] text-[#374151]">
          Type: {filterType}
          <button onClick={onRemoveType} className="hover:text-[#111827] transition-colors">
            <X size={12} />
          </button>
        </span>
      )}
      {filterCategory !== 'all' && (
        <span className="flex items-center gap-1.5 py-1 px-2 bg-[#F3F4F6] rounded-md text-[0.75rem] text-[#374151]">
          Category: {filterCategory}
          <button onClick={onRemoveCategory} className="hover:text-[#111827] transition-colors">
            <X size={12} />
          </button>
        </span>
      )}
    </div>
  );
}






