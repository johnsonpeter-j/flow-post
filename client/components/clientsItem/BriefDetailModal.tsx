'use client';

import { useState } from 'react';
import {
  X,
  Video,
  Camera,
  Layers,
  Target,
  Flame,
  Globe,
  ExternalLink,
  Music,
  MessageSquare,
  Send,
} from 'lucide-react';
import WorkflowTracker from './WorkflowTracker';
import type { Brief } from './types';
import type { Department, TeamMember } from '@/data/mockData';

interface BriefDetailModalProps {
  brief: Brief | null;
  onClose: () => void;
  departments: Department[];
  team: TeamMember[];
  onAddNote: (briefId: string, note: { authorId: string; text: string }) => void;
}

export default function BriefDetailModal({
  brief,
  onClose,
  departments,
  team,
  onAddNote,
}: BriefDetailModalProps) {
  const [briefNewNote, setBriefNewNote] = useState('');
  const [briefNoteAuthor, setBriefNoteAuthor] = useState('');

  if (!brief) return null;

  const getMemberById = (memberId: string) => team.find((m) => m.id === memberId);

  const formatNoteTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' at ' +
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    );
  };

  const handleAddNote = () => {
    if (!briefNewNote.trim() || !briefNoteAuthor) return;
    onAddNote(brief.id, {
      authorId: briefNoteAuthor,
      text: briefNewNote.trim(),
    });
    setBriefNewNote('');
    setBriefNoteAuthor('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="bg-white rounded-2xl w-[90%] max-w-[640px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 px-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <div className="modal-title">
            <h2 className="text-xl font-semibold text-[#111827] mb-2">{brief.concept}</h2>
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
          </div>
          <button className="bg-transparent border-none text-[#9CA3AF] cursor-pointer p-1 hover:text-[#6B7280] transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 modal-content">
          {/* Workflow Progress Tracker */}
          <div className="modal-section workflow-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-3 uppercase tracking-wide">Workflow Progress</h4>
            <WorkflowTracker
              contentType={brief.contentType}
              currentStage={brief.currentStage}
              status={brief.status}
              departments={departments}
              team={team}
              teamsInvolved={brief.teamsInvolved}
            />
          </div>

          <div className="modal-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Explanation</h4>
            <p className="text-sm text-[#6B7280] leading-relaxed">{brief.explanation}</p>
          </div>

          <div className="modal-row flex gap-4 mb-6">
            <div className="modal-section flex-1">
              <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Content Type</h4>
              <div className="detail-tag inline-flex items-center gap-1.5 py-1 px-2.5 bg-[#F3F4F6] rounded-md text-[0.75rem] text-[#374151]">
                {brief.contentType === 'video' && <Video size={14} />}
                {brief.contentType === 'photo' && <Camera size={14} />}
                {brief.contentType === 'carousel' && <Layers size={14} />}
                {brief.contentType === 'campaign' && <Target size={14} />}
                {brief.contentType}
              </div>
            </div>
            <div className="modal-section flex-1">
              <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Category</h4>
              <div
                className={`detail-tag inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-[0.75rem] ${
                  brief.category === 'trending'
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : 'bg-[#DBEAFE] text-[#2563EB]'
                }`}
              >
                {brief.category === 'trending' ? <Flame size={14} /> : <Globe size={14} />}
                {brief.category}
              </div>
            </div>
          </div>

          <div className="modal-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Mood</h4>
            <p className="mood-text text-sm text-[#6B7280] mb-3">{brief.mood}</p>
            <div className="mood-tags-display flex flex-wrap gap-1.5">
              {brief.moodTags.map((tag) => (
                <span key={tag} className="mood-chip py-1 px-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-[0.7rem] text-[#6B7280]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">References</h4>
            <div className="references-display flex flex-col gap-2">
              {brief.references.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-link flex items-center gap-1.5 text-[0.75rem] text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  <ExternalLink size={14} />
                  {ref.title}
                </a>
              ))}
            </div>
          </div>

          <div className="modal-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Teams Involved</h4>
            <div className="teams-display flex flex-wrap gap-2">
              {brief.teamsInvolved.map((deptId) => {
                const dept = departments.find((d) => d.id === deptId);
                return (
                  <span
                    key={deptId}
                    className="team-chip py-1 px-2.5 rounded-md text-[0.75rem] font-medium border"
                    style={{ background: `${dept?.color}15`, color: dept?.color, borderColor: dept?.color }}
                  >
                    {dept?.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="modal-section mb-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wide">Music</h4>
            <div className="music-display flex gap-3">
              <div className="music-icon w-9 h-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]">
                <Music size={18} />
              </div>
              <div className="music-info flex-1">
                <div className="flex gap-3 mb-1">
                  <span className="music-type text-[0.75rem] font-medium text-[#374151] capitalize">{brief.music.type}</span>
                  {brief.music.mood && <span className="music-mood text-[0.75rem] text-[#6B7280]">{brief.music.mood}</span>}
                </div>
                {brief.music.reference && <p className="music-reference text-[0.75rem] text-[#6B7280]">{brief.music.reference}</p>}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="modal-section notes-section border-t border-[#E5E7EB] pt-6">
            <h4 className="text-sm font-semibold text-[#374151] mb-3 uppercase tracking-wide flex items-center gap-1.5">
              <MessageSquare size={14} />
              Notes ({(brief.notes || []).length})
            </h4>

            {(brief.notes || []).length > 0 && (
              <div className="modal-notes-list flex flex-col gap-3 mb-4">
                {(brief.notes || []).map((note) => {
                  const author = getMemberById(note.authorId);
                  return (
                    <div key={note.id} className="modal-note-item flex gap-3">
                      <div
                        className="modal-note-avatar w-6 h-6 rounded-lg flex items-center justify-center text-white text-[0.6rem] font-semibold shrink-0"
                        style={{ background: author?.color || '#6B7280' }}
                      >
                        {author?.avatar || '?'}
                      </div>
                      <div className="modal-note-content flex-1">
                        <div className="modal-note-meta flex justify-between mb-1">
                          <span className="modal-note-author text-[0.7rem] font-semibold text-[#111827]">{author?.name || 'Unknown'}</span>
                          <span className="modal-note-time text-[0.6rem] text-[#9CA3AF]">{formatNoteTime(note.createdAt)}</span>
                        </div>
                        <p className="modal-note-text text-[0.75rem] text-[#374151] leading-relaxed">{note.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="modal-add-note">
              <div className="modal-note-input-row mb-2">
                <select
                  className="modal-note-author-select w-full py-2 px-3 border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF]"
                  value={briefNoteAuthor}
                  onChange={(e) => setBriefNoteAuthor(e.target.value)}
                >
                  <option value="">Select your name...</option>
                  {team.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-note-input-row mb-2">
                <textarea
                  placeholder="Add a note..."
                  value={briefNewNote}
                  onChange={(e) => setBriefNewNote(e.target.value)}
                  rows={2}
                  className="w-full py-2 px-3 border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF] resize-none"
                />
              </div>
              <div className="modal-note-actions">
                <button
                  className="modal-save-note-btn flex items-center gap-1.5 py-2 px-3 bg-[#111827] border-none rounded-lg text-[0.75rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddNote}
                  disabled={!briefNewNote.trim() || !briefNoteAuthor}
                >
                  <Send size={14} />
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
