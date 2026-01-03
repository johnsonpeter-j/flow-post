'use client';

import { Send } from 'lucide-react';
import type { TeamMember } from '@/data/mockData';
import { getMemberById, formatNoteTime } from './utils';

interface Note {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

interface ProblemNotesProps {
  notes: Note[];
  team: TeamMember[];
  noteAuthor: string;
  newNote: string;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
}

export default function ProblemNotes({
  notes,
  team,
  noteAuthor,
  newNote,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
}: ProblemNotesProps) {
  return (
    <div className="expanded-section">
      <h4 className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-3">
        Notes ({notes.length})
      </h4>
      {notes.length > 0 && (
        <div className="expanded-notes space-y-2 mb-3">
          {notes.map((note) => {
            const author = getMemberById(note.authorId, team);
            return (
              <div key={note.id} className="expanded-note flex gap-2">
                <span
                  className="note-avatar w-6 h-6 rounded-lg flex items-center justify-center text-white text-[0.6rem] font-semibold shrink-0"
                  style={{ background: author?.color }}
                >
                  {author?.avatar}
                </span>
                <div className="note-body flex-1">
                  <div className="note-header flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#111827]">{author?.name}</span>
                    <span className="text-[#9CA3AF]">{formatNoteTime(note.createdAt)}</span>
                  </div>
                  <p className="note-text text-sm text-[#374151]">{note.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="add-note-inline flex gap-2">
        <select
          className="flex-1 py-2 px-3 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:border-[#9CA3AF]"
          value={noteAuthor}
          onChange={(e) => onNoteAuthorChange(e.target.value)}
        >
          <option value="">Select name...</option>
          {team.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          className="flex-1 py-2 px-3 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => onNewNoteChange(e.target.value)}
        />
        <button
          className="w-9 h-9 flex items-center justify-center bg-[#111827] text-white rounded-lg hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onAddNote}
          disabled={!newNote.trim() || !noteAuthor}
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
}





