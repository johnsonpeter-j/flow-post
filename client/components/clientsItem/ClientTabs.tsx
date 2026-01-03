import type { TabType } from './types';

interface ClientTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function ClientTabs({ activeTab, onTabChange }: ClientTabsProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB] px-6 flex gap-1">
      <button
        className={`py-3 px-4 bg-transparent border-none text-[0.85rem] font-medium cursor-pointer border-b-2 border-transparent -mb-px transition-colors ${
          activeTab === 'briefs'
            ? 'text-[#111827] border-[#111827]'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onTabChange('briefs')}
      >
        Content Briefs
      </button>
      <button
        className={`py-3 px-4 bg-transparent border-none text-[0.85rem] font-medium cursor-pointer border-b-2 border-transparent -mb-px transition-colors ${
          activeTab === 'content'
            ? 'text-[#111827] border-[#111827]'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onTabChange('content')}
      >
        Idea Bank
      </button>
      <button
        className={`py-3 px-4 bg-transparent border-none text-[0.85rem] font-medium cursor-pointer border-b-2 border-transparent -mb-px transition-colors ${
          activeTab === 'calendar'
            ? 'text-[#111827] border-[#111827]'
            : 'text-[#6B7280] hover:text-[#374151]'
        }`}
        onClick={() => onTabChange('calendar')}
      >
        Calendar
      </button>
    </div>
  );
}






