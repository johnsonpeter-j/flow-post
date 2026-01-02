import { Plus, FileText } from 'lucide-react';
import BriefFilters from './BriefFilters';
import StatusTabs from './StatusTabs';
import ActiveFilters from './ActiveFilters';
import BriefCard from './BriefCard';
import BriefCreator from './BriefCreator';
import type { Brief } from './types';

interface NewBrief {
  concept: string;
  explanation: string;
  mood: string;
  moodTags: string[];
  references: Array<{ type: string; url: string; title: string }>;
  contentType: string;
  category: 'trending' | 'general';
  teamsInvolved: string[];
  music: { type: string; mood: string; reference: string };
}

interface BriefsTabProps {
  briefs: Brief[];
  filteredBriefs: Brief[];
  filterType: string;
  filterStatus: string;
  filterCategory: string;
  onFilterTypeChange: (type: string) => void;
  onFilterStatusChange: (status: string) => void;
  onFilterCategoryChange: (category: string) => void;
  onBriefClick: (brief: Brief) => void;
  isCreating: boolean;
  newBrief: NewBrief;
  onBriefChange: (brief: NewBrief) => void;
  onSaveBrief: () => void;
  onCancelBrief: () => void;
  onCreateBrief: () => void;
}

export default function BriefsTab({
  briefs,
  filteredBriefs,
  filterType,
  filterStatus,
  filterCategory,
  onFilterTypeChange,
  onFilterStatusChange,
  onFilterCategoryChange,
  onBriefClick,
  isCreating,
  newBrief,
  onBriefChange,
  onSaveBrief,
  onCancelBrief,
  onCreateBrief,
}: BriefsTabProps) {
  const activeFilterCount = [filterType, filterStatus, filterCategory].filter((f) => f !== 'all').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.1rem] font-semibold text-[#111827] flex items-center gap-2">
          Content Briefs{' '}
          <span className="text-[0.75rem] font-medium text-[#9CA3AF]">
            {filteredBriefs.length}
            {(filterType !== 'all' || filterCategory !== 'all') && ` of ${briefs.length}`}
          </span>
        </h2>
        <div className="flex items-center gap-3">
          <BriefFilters
            filterType={filterType}
            filterCategory={filterCategory}
            onFilterTypeChange={onFilterTypeChange}
            onFilterCategoryChange={onFilterCategoryChange}
          />
          <button
            className="flex items-center gap-1.5 py-1.75 px-3 bg-[#111827] border border-[#111827] rounded-md text-white text-[0.75rem] font-medium cursor-pointer hover:bg-[#1F2937] transition-colors"
            onClick={onCreateBrief}
          >
            <Plus size={16} />
            New Brief
          </button>
        </div>
      </div>

      <StatusTabs filterStatus={filterStatus} onStatusChange={onFilterStatusChange} briefs={briefs} />

      <ActiveFilters
        filterType={filterType}
        filterCategory={filterCategory}
        onRemoveType={() => onFilterTypeChange('all')}
        onRemoveCategory={() => onFilterCategoryChange('all')}
      />

      {isCreating && (
        <BriefCreator newBrief={newBrief} onBriefChange={onBriefChange} onSave={onSaveBrief} onCancel={onCancelBrief} />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {filteredBriefs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-[#9CA3AF]">
            <FileText size={32} className="mb-4 opacity-40" />
            <h4 className="text-[#6B7280] mb-1">No briefs found</h4>
            <p className="text-sm">
              {activeFilterCount > 0 ? 'Try adjusting your filters' : 'Create your first content brief'}
            </p>
            {activeFilterCount > 0 && (
              <button
                className="mt-3 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                onClick={() => {
                  onFilterTypeChange('all');
                  onFilterStatusChange('all');
                  onFilterCategoryChange('all');
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          filteredBriefs.map((brief) => (
            <BriefCard key={brief.id} brief={brief} onClick={() => onBriefClick(brief)} />
          ))
        )}
      </div>
    </div>
  );
}


