'use client';

import { Send, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ProblemContent } from './types';
import type { TeamMember } from '@/data/mockData';
import { getContentType } from './utils';
import ProblemNotes from './ProblemNotes';

interface ContentProblemItemProps {
  content: ProblemContent;
  team: TeamMember[];
  isExpanded: boolean;
  noteAuthor: string;
  newNote: string;
  variant: 'missed' | 'urgent' | 'approval' | 'stalled';
  onToggleExpand: () => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
  onAction?: () => void;
}

export default function ContentProblemItem({
  content,
  team,
  isExpanded,
  noteAuthor,
  newNote,
  variant,
  onToggleExpand,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
  onAction,
}: ContentProblemItemProps) {
  const router = useRouter();
  const TypeInfo = getContentType(content.type);
  const contentNotes = content.notes || [];

  const getBadgeText = () => {
    switch (variant) {
      case 'missed':
        return `${content.daysMissed}d late`;
      case 'urgent':
        return 'URGENT';
      case 'approval':
        return `${content.daysWaiting}d waiting`;
      case 'stalled':
        return `${content.daysStalled}d in ${content.stage}`;
      default:
        return '';
    }
  };

  const getBadgeStyle = () => {
    switch (variant) {
      case 'missed':
        return 'text-[#DC2626] bg-[#FEE2E2]';
      case 'urgent':
        return 'text-[#DC2626] bg-[#FEE2E2]';
      case 'approval':
        return 'text-[#6366F1] bg-[#E0E7FF]';
      case 'stalled':
        return 'text-[#D97706] bg-[#FEF3C7]';
      default:
        return '';
    }
  };

  const getActionButton = () => {
    switch (variant) {
      case 'missed':
        return (
          <button
            className="problem-action-btn flex items-center gap-1.5 py-2 px-4 bg-[#111827] text-white text-xs font-medium rounded-lg hover:bg-[#1F2937] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
              router.push(`/clients/${content.clientId}`);
            }}
          >
            <Send size={14} />
            {isExpanded ? 'Post Now' : 'Post'}
          </button>
        );
      case 'approval':
        return (
          <button
            className="problem-action-btn approve flex items-center gap-1.5 py-2 px-4 bg-[#10B981] text-white text-xs font-medium rounded-lg hover:bg-[#059669] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
              router.push(`/clients/${content.clientId}`);
            }}
          >
            <Check size={14} />
            Approve
          </button>
        );
      default:
        return (
          <button
            className="problem-action-btn flex items-center gap-1.5 py-2 px-4 bg-[#111827] text-white text-xs font-medium rounded-lg hover:bg-[#1F2937] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/clients/${content.clientId}`);
            }}
          >
            <ArrowRight size={14} />
            {isExpanded ? 'View Details' : 'View'}
          </button>
        );
    }
  };

  return (
    <div
      className={`problem-item bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg overflow-hidden transition-all ${
        isExpanded ? 'expanded' : ''
      }`}
    >
      <div
        className="problem-item-compact p-4 cursor-pointer hover:bg-[#F3F4F6] transition-colors"
        onClick={onToggleExpand}
      >
        <div className="problem-item-header flex justify-between items-center mb-2">
          <span
            className="problem-client text-xs font-semibold px-2 py-1 rounded-md"
            style={{ background: `${content.client?.color}15`, color: content.client?.color }}
          >
            {content.client?.name}
          </span>
          <span className={`problem-badge text-xs font-semibold px-2 py-1 rounded-md ${getBadgeStyle()}`}>
            {getBadgeText()}
          </span>
        </div>
        <p className="problem-item-title text-sm font-medium text-[#111827] mb-2">{content.idea}</p>
        <div className="problem-item-meta flex items-center gap-3 text-xs text-[#6B7280]">
          <span className="problem-type flex items-center gap-1">
            <TypeInfo.icon size={12} />
            {TypeInfo.label}
          </span>
          {variant !== 'approval' && <span className="problem-stage">{content.stage}</span>}
        </div>
      </div>
      {isExpanded && (
        <div className="problem-item-expanded p-4 border-t border-[#E5E7EB] bg-white">
          <div className="expanded-section mb-4">
            <h4 className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-3">Content Details</h4>
            <div className="expanded-details space-y-2">
              <div className="detail-row flex justify-between text-sm">
                <span className="text-[#6B7280]">Type:</span>
                <span className="text-[#111827] font-medium">{TypeInfo.label}</span>
              </div>
              {variant !== 'approval' && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Stage:</span>
                  <span
                    className={`status-tag text-xs font-semibold px-2 py-1 rounded-md capitalize ${
                      content.stage === 'ready'
                        ? 'bg-[#D1FAE5] text-[#059669]'
                        : content.stage === 'approval'
                        ? 'bg-[#F3E8FF] text-[#7C3AED]'
                        : 'bg-[#DBEAFE] text-[#2563EB]'
                    }`}
                  >
                    {content.stage}
                  </span>
                </div>
              )}
              {content.scheduledFor && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Scheduled:</span>
                  <span className="text-[#111827] font-medium">
                    {new Date(content.scheduledFor).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {variant === 'approval' && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Priority:</span>
                  <span
                    className={`priority-tag text-xs font-semibold px-2 py-1 rounded-md capitalize ${
                      content.priority === 'urgent' || content.priority === 'high'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : content.priority === 'medium'
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {content.priority}
                  </span>
                </div>
              )}
              {variant !== 'approval' && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Priority:</span>
                  <span
                    className={`priority-tag text-xs font-semibold px-2 py-1 rounded-md capitalize ${
                      content.priority === 'urgent' || content.priority === 'high'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : content.priority === 'medium'
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {content.priority}
                  </span>
                </div>
              )}
              {variant === 'urgent' && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Created:</span>
                  <span className="text-[#111827] font-medium">
                    {new Date(content.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
              {variant === 'approval' && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Created:</span>
                  <span className="text-[#111827] font-medium">
                    {new Date(content.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
            {content.platforms && content.platforms.length > 0 && (
              <div className="expanded-platforms flex flex-wrap gap-1.5 mt-3">
                {content.platforms.map((p) => (
                  <span
                    key={p}
                    className="platform-mini text-[0.65rem] px-2 py-0.5 bg-[#F3F4F6] rounded-md text-[#6B7280]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
          <ProblemNotes
            notes={contentNotes}
            team={team}
            noteAuthor={noteAuthor}
            newNote={newNote}
            onNoteAuthorChange={onNoteAuthorChange}
            onNewNoteChange={onNewNoteChange}
            onAddNote={onAddNote}
          />
          <div className="expanded-actions mt-4 pt-4 border-t border-[#E5E7EB]">{getActionButton()}</div>
        </div>
      )}
      {!isExpanded && <div className="problem-item-actions p-4 pt-0 flex justify-end">{getActionButton()}</div>}
    </div>
  );
}





