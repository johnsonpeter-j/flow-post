'use client';

import { CheckCircle2, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ProblemTask } from './types';
import type { TeamMember } from '@/data/mockData';
import ProblemNotes from './ProblemNotes';

interface TaskProblemItemProps {
  task: ProblemTask;
  team: TeamMember[];
  isExpanded: boolean;
  noteAuthor: string;
  newNote: string;
  onToggleExpand: () => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
  onMarkDone?: () => void;
}

export default function TaskProblemItem({
  task,
  team,
  isExpanded,
  noteAuthor,
  newNote,
  onToggleExpand,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
  onMarkDone,
}: TaskProblemItemProps) {
  const router = useRouter();
  const taskNotes = task.notes || [];

  return (
    <div
      className={`problem-item flex flex-col p-0 rounded-lg border border-[#F3F4F6] bg-[#FAFAFA] transition-all cursor-pointer overflow-hidden ${
        isExpanded
          ? 'expanded col-[1/-1] bg-white border-[#D1D5DB] shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
          : 'hover:bg-[#F3F4F6] hover:border-[#E5E7EB]'
      }`}
    >
      <div className="problem-item-compact p-3" onClick={onToggleExpand}>
        <div className="problem-item-header flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span
            className="problem-client text-[0.6rem] font-semibold py-0.5 px-1.5 rounded uppercase"
            style={{ background: `${task.client?.color}15`, color: task.client?.color }}
          >
            {task.client?.name}
          </span>
          <span className="problem-overdue text-[0.6rem] font-semibold text-[#DC2626] bg-[#FEE2E2] py-0.5 px-1.5 rounded">
            {task.daysOverdue}d overdue
          </span>
        </div>
        <p className="problem-item-title text-[0.8rem] font-medium text-[#111827] mb-1.5 leading-[1.4] line-clamp-2">
          {task.content?.idea}
        </p>
        <div className="problem-item-meta flex flex-wrap gap-2">
          <span className="problem-type text-[0.65rem] text-[#6B7280]">{task.type}</span>
          <span className="problem-assignee flex items-center gap-1 text-[0.65rem] text-[#6B7280]">
            <span
              className="assignee-avatar w-4 h-4 rounded flex items-center justify-center text-white text-[0.5rem] font-semibold"
              style={{ background: task.assignee?.color }}
            >
              {task.assignee?.avatar}
            </span>
            {task.assignee?.name}
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="problem-item-expanded p-4 border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="expanded-section mb-4">
            <h4 className="text-[0.75rem] font-semibold text-[#374151] mb-2.5 uppercase tracking-[0.5px]">
              Task Details
            </h4>
            <div className="expanded-details grid grid-cols-2 gap-2">
              <div className="detail-row flex justify-between text-[0.75rem] py-1.5 px-2.5 bg-white rounded-md border border-[#E5E7EB]">
                <span className="text-[#6B7280]">Type:</span>
                <span className="text-[#111827] font-medium">{task.type}</span>
              </div>
              <div className="detail-row flex justify-between text-[0.75rem] py-1.5 px-2.5 bg-white rounded-md border border-[#E5E7EB]">
                <span className="text-[#6B7280]">Deadline:</span>
                <span className="text-[#111827] font-medium">
                  {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="detail-row flex justify-between text-[0.75rem] py-1.5 px-2.5 bg-white rounded-md border border-[#E5E7EB]">
                <span className="text-[#6B7280]">Status:</span>
                <span
                  className={`status-tag py-0.5 px-1.5 rounded text-[0.65rem] capitalize ${
                    task.status === 'done'
                      ? 'bg-[#D1FAE5] text-[#059669]'
                      : task.status === 'in-progress'
                      ? 'bg-[#DBEAFE] text-[#2563EB]'
                      : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="detail-row flex justify-between text-[0.75rem] py-1.5 px-2.5 bg-white rounded-md border border-[#E5E7EB]">
                <span className="text-[#6B7280]">Assignee:</span>
                <span className="text-[#111827] font-medium">{task.assignee?.name}</span>
              </div>
            </div>
          </div>
          <ProblemNotes
            notes={taskNotes}
            team={team}
            noteAuthor={noteAuthor}
            newNote={newNote}
            onNoteAuthorChange={onNoteAuthorChange}
            onNewNoteChange={onNewNoteChange}
            onAddNote={onAddNote}
          />
          <div className="expanded-actions mt-4 pt-4 border-t border-[#E5E7EB]">
            <button
              className="problem-action-btn complete flex items-center gap-1.5 py-2 px-4 bg-[#10B981] text-white text-xs font-medium rounded-lg hover:bg-[#059669] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onMarkDone?.();
              }}
            >
              <CheckCircle2 size={14} />
              Mark Done
            </button>
          </div>
        </div>
      )}
      {!isExpanded && (
        <div className="problem-item-actions p-4 pt-0 flex justify-end">
          <button
            className="problem-action-btn complete flex items-center gap-1.5 py-1.5 px-3 bg-[#10B981] text-white text-xs font-medium rounded-lg hover:bg-[#059669] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMarkDone?.();
            }}
          >
            <CheckCircle2 size={14} />
            Done
          </button>
        </div>
      )}
    </div>
  );
}


