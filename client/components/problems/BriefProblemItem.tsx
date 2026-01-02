'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ProblemBrief } from './types';
import type { TeamMember } from '@/data/mockData';
import ProblemNotes from './ProblemNotes';

interface BriefProblemItemProps {
  brief: ProblemBrief;
  team: TeamMember[];
  isExpanded: boolean;
  noteAuthor: string;
  newNote: string;
  onToggleExpand: () => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
}

export default function BriefProblemItem({
  brief,
  team,
  isExpanded,
  noteAuthor,
  newNote,
  onToggleExpand,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
}: BriefProblemItemProps) {
  const router = useRouter();
  const briefNotes = brief.notes || [];

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
            style={{ background: `${brief.client?.color}15`, color: brief.client?.color }}
          >
            {brief.client?.name}
          </span>
          <span className="problem-waiting text-xs font-semibold text-[#6366F1] bg-[#E0E7FF] px-2 py-1 rounded-md">
            {brief.daysWaiting}d pending
          </span>
        </div>
        <p className="problem-item-title text-sm font-medium text-[#111827] mb-2">{brief.concept}</p>
        <div className="problem-item-meta flex items-center gap-3 text-xs text-[#6B7280]">
          <span className="problem-type">{brief.contentType}</span>
          <span className="problem-teams">{brief.teamsInvolved.length} teams</span>
        </div>
      </div>
      {isExpanded && (
        <div className="problem-item-expanded p-4 border-t border-[#E5E7EB] bg-white">
          <div className="expanded-section mb-4">
            <h4 className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-3">Brief Details</h4>
            <p className="text-xs text-[#374151] leading-relaxed mb-3">{brief.explanation}</p>
            <div className="expanded-details space-y-2">
              <div className="detail-row flex justify-between text-sm">
                <span className="text-[#6B7280]">Type:</span>
                <span className="text-[#111827] font-medium">{brief.contentType}</span>
              </div>
              <div className="detail-row flex justify-between text-sm">
                <span className="text-[#6B7280]">Category:</span>
                <span className="text-[#111827] font-medium capitalize">{brief.category}</span>
              </div>
              <div className="detail-row flex justify-between text-sm">
                <span className="text-[#6B7280]">Status:</span>
                <span
                  className={`status-tag text-xs font-semibold px-2 py-1 rounded-md capitalize ${
                    brief.status === 'approved'
                      ? 'bg-[#D1FAE5] text-[#059669]'
                      : brief.status === 'in-progress'
                      ? 'bg-[#DBEAFE] text-[#2563EB]'
                      : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}
                >
                  {brief.status}
                </span>
              </div>
              {brief.createdAt && (
                <div className="detail-row flex justify-between text-sm">
                  <span className="text-[#6B7280]">Created:</span>
                  <span className="text-[#111827] font-medium">
                    {new Date(brief.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <ProblemNotes
            notes={briefNotes}
            team={team}
            noteAuthor={noteAuthor}
            newNote={newNote}
            onNoteAuthorChange={onNoteAuthorChange}
            onNewNoteChange={onNewNoteChange}
            onAddNote={onAddNote}
          />
          <div className="expanded-actions mt-4 pt-4 border-t border-[#E5E7EB]">
            <button
              className="problem-action-btn flex items-center gap-1.5 py-2 px-4 bg-[#111827] text-white text-xs font-medium rounded-lg hover:bg-[#1F2937] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/clients/${brief.clientId}`);
              }}
            >
              <ArrowRight size={14} />
              View Brief
            </button>
          </div>
        </div>
      )}
      {!isExpanded && (
        <div className="problem-item-actions p-4 pt-0 flex justify-end">
          <button
            className="problem-action-btn flex items-center gap-1.5 py-1.5 px-3 bg-[#111827] text-white text-xs font-medium rounded-lg hover:bg-[#1F2937] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/clients/${brief.clientId}`);
            }}
          >
            View
          </button>
        </div>
      )}
    </div>
  );
}


