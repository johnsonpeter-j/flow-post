'use client';

import { CheckCircle2, Circle, Clock, MessageSquare, ChevronDown } from 'lucide-react';
import type { Task } from '@/store/tasks/tasksTypes';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';
import type { TeamMember } from '@/data/mockData';
import TaskNotes from './TaskNotes';

interface TaskCardProps {
  task: Task;
  content: ContentItem | undefined;
  client: Client | undefined;
  team: TeamMember[];
  isOverdue: boolean;
  isExpanded: boolean;
  noteAuthor: string;
  newNote: string;
  onStatusToggle: () => void;
  onToggleExpand: () => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
}

export default function TaskCard({
  task,
  content,
  client,
  team,
  isOverdue,
  isExpanded,
  noteAuthor,
  newNote,
  onStatusToggle,
  onToggleExpand,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
}: TaskCardProps) {
  const taskNotes = task.notes || [];

  return (
    <div
      className={`task-card bg-white border rounded-xl transition-all ${
        isOverdue ? 'overdue border-[#FECACA] bg-[#FEF2F2]' : 'border-[#E5E7EB]'
      } ${isExpanded ? 'expanded shadow-md' : 'shadow-sm hover:shadow-md'}`}
    >
      <div className="task-card-main flex gap-3 py-3.5 px-4 items-start">
        <button
          className={`status-btn w-6 h-6 border-none bg-transparent cursor-pointer p-0 flex items-center justify-center shrink-0 mt-0.5 hover:opacity-80 transition-opacity ${
            task.status === 'pending'
              ? 'text-[#D1D5DB] hover:text-[#9CA3AF]'
              : task.status === 'in-progress'
              ? 'text-[#3B82F6]'
              : 'text-[#10B981]'
          }`}
          onClick={onStatusToggle}
        >
          {task.status === 'done' ? (
            <CheckCircle2 size={18} />
          ) : task.status === 'in-progress' ? (
            <div className="status-progress w-4 h-4 border-2 border-[#3B82F6] rounded-full border-r-transparent animate-spin" />
          ) : (
            <Circle size={18} />
          )}
        </button>
        <div className="task-content flex-1 cursor-pointer min-w-0" onClick={onToggleExpand}>
          <div className="task-header flex gap-2 mb-2 flex-wrap">
            {client && (
              <span
                className="task-client text-[0.65rem] font-semibold py-1 px-2 rounded-md uppercase tracking-wide"
                style={{
                  background: `${client.color}15`,
                  color: client.color,
                }}
              >
                {client.name}
              </span>
            )}
            <span className="task-type text-[0.65rem] py-1 px-2 bg-[#F3F4F6] text-[#6B7280] rounded-md font-medium">
              {task.type}
            </span>
          </div>
          <p className="task-idea text-[0.9rem] text-[#111827] font-medium mb-2.5 leading-relaxed">{content?.idea}</p>
          <div className="task-footer flex items-center gap-4">
            <span
              className={`task-deadline flex items-center gap-1.5 text-[0.75rem] font-medium ${
                isOverdue ? 'overdue text-[#DC2626]' : 'text-[#6B7280]'
              }`}
            >
              <Clock size={14} />
              {new Date(task.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="task-notes-count flex items-center gap-1.5 text-[0.75rem] text-[#9CA3AF]">
              <MessageSquare size={14} />
              {taskNotes.length} {taskNotes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>
        </div>
        <button
          className={`expand-btn w-8 h-8 border-none rounded-lg cursor-pointer flex items-center justify-center transition-all shrink-0 ${
            isExpanded
              ? 'bg-[#111827] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#374151]'
          }`}
          onClick={onToggleExpand}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isExpanded && (
        <TaskNotes
          notes={taskNotes}
          team={team}
          noteAuthor={noteAuthor}
          newNote={newNote}
          onNoteAuthorChange={onNoteAuthorChange}
          onNewNoteChange={onNewNoteChange}
          onAddNote={onAddNote}
        />
      )}
    </div>
  );
}


