'use client';

import { MessageSquare, Send } from 'lucide-react';
import type { TeamMember } from '@/data/mockData';
import { getMemberById, formatNoteTime } from './utils';

interface Note {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

interface TaskNotesProps {
  notes: Note[];
  team: TeamMember[];
  noteAuthor: string;
  newNote: string;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
}

export default function TaskNotes({
  notes,
  team,
  noteAuthor,
  newNote,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
}: TaskNotesProps) {
  return (
    <div className="task-notes-section border-t border-[#E5E7EB] py-3.5 px-3.5 bg-[#FAFAFA] rounded-b-[10px] animate-[slideDown_0.2s_ease]">
      <div className="notes-header mb-3">
        <h4 className="text-[0.8rem] font-semibold text-[#374151] flex items-center gap-1.5 m-0">
          <MessageSquare size={14} />
          Notes ({notes.length})
        </h4>
      </div>

      {notes.length > 0 && (
        <div className="notes-list flex flex-col gap-2.5 mb-3.5">
          {notes.map((note) => {
            const author = getMemberById(note.authorId, team);
            return (
              <div key={note.id} className="note-item flex gap-2.5">
                <div
                  className="note-author-avatar w-8 h-8 rounded-lg flex items-center justify-center text-white text-[0.7rem] font-semibold shrink-0"
                  style={{ background: author?.color || '#6B7280' }}
                >
                  {author?.avatar || '?'}
                </div>
                <div className="note-content flex-1 bg-white border border-[#E5E7EB] rounded-lg py-2.5 px-3">
                  <div className="note-meta flex items-center gap-2 mb-1">
                    <span className="note-author-name text-[0.75rem] font-semibold text-[#111827]">
                      {author?.name || 'Unknown'}
                    </span>
                    <span className="note-time text-[0.65rem] text-[#9CA3AF]">
                      {formatNoteTime(note.createdAt)}
                    </span>
                  </div>
                  <p className="note-text text-[0.8rem] text-[#374151] leading-[1.5] m-0">{note.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="add-note-form bg-white border border-[#E5E7EB] rounded-[10px] p-3">
        <div className="note-input-row mb-2.5">
          <select
            className="note-author-select w-full py-2 px-2.5 border border-[#E5E7EB] rounded-md text-[0.8rem] font-inherit text-[#374151] bg-white cursor-pointer focus:outline-none focus:border-[#3B82F6]"
            value={noteAuthor}
            onChange={(e) => onNoteAuthorChange(e.target.value)}
          >
            <option value="">Select name...</option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="note-input-row mb-2.5">
          <textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
            rows={2}
            className="w-full py-2.5 px-3 border border-[#E5E7EB] rounded-md text-[0.8rem] font-inherit text-[#374151] resize-none focus:outline-none focus:border-[#3B82F6] placeholder:text-[#9CA3AF]"
          />
        </div>
        <div className="note-actions flex justify-end mt-2.5">
          <button
            className="save-note-btn flex items-center gap-1.5 py-2 px-3.5 bg-[#111827] border-none rounded-md text-[0.8rem] text-white cursor-pointer font-inherit transition-all hover:bg-[#1F2937] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onAddNote}
            disabled={!newNote.trim() || !noteAuthor}
          >
            <Send size={14} />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}





