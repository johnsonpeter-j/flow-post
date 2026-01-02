import { Video, Camera, Layers, Target, MessageSquare, Flame, Globe } from 'lucide-react';
import type { Brief } from './types';

interface BriefCardProps {
  brief: Brief;
  onClick: () => void;
}

export default function BriefCard({ brief, onClick }: BriefCardProps) {
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={12} />;
      case 'photo':
        return <Camera size={12} />;
      case 'carousel':
        return <Layers size={12} />;
      case 'campaign':
        return <Target size={12} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-xl p-4 cursor-pointer transition-all duration-150 hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-md capitalize ${
            brief.status === 'pending'
              ? 'bg-[#FEF3C7] text-[#D97706]'
              : brief.status === 'in-progress'
              ? 'bg-[#DBEAFE] text-[#2563EB]'
              : 'bg-[#D1FAE5] text-[#059669]'
          }`}
        >
          {brief.status}
        </span>
        <span
          className={`flex items-center gap-1 text-[0.65rem] font-medium px-2 py-0.5 rounded-md ${
            brief.category === 'trending'
              ? 'bg-[#FEF3C7] text-[#D97706]'
              : 'bg-[#DBEAFE] text-[#2563EB]'
          }`}
        >
          {brief.category === 'trending' ? <Flame size={12} /> : <Globe size={12} />}
          {brief.category}
        </span>
      </div>
      <h3 className="text-base font-semibold text-[#111827] mb-2">{brief.concept}</h3>
      <p className="text-[0.8rem] text-[#6B7280] leading-relaxed mb-3 line-clamp-2">
        {brief.explanation?.substring(0, 100)}...
      </p>
      <div className="flex items-center gap-3 text-[0.7rem] text-[#6B7280] mb-3">
        <span className="flex items-center gap-1">
          {getContentTypeIcon(brief.contentType)}
          {brief.contentType}
        </span>
        <span>{brief.teamsInvolved?.length || 0} teams</span>
        {(brief.notes || []).length > 0 && (
          <span className="flex items-center gap-1">
            <MessageSquare size={12} />
            {(brief.notes || []).length}
          </span>
        )}
      </div>
      {brief.moodTags && brief.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {brief.moodTags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="py-1 px-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-[0.7rem] text-[#6B7280]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}



