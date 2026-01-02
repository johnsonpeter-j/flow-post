'use client';

import { X, Calendar, AlertTriangle, Instagram, Facebook, Linkedin, Twitter, Play } from 'lucide-react';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';
import type { TeamMember } from '@/data/mockData';
import type { StageConfig } from './types';
import WorkflowProgress from './WorkflowProgress';
import ContentNotes from './ContentNotes';
import StageActions from './StageActions';
import { getContentType } from './utils';

interface ContentDetailModalProps {
  content: ContentItem;
  clients: Client[];
  team: TeamMember[];
  stageConfigs: Record<string, StageConfig>;
  noteAuthor: string;
  newNote: string;
  onClose: () => void;
  onStageClick: (stage: string) => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
  onMoveStage: (stage: string) => void;
}

export default function ContentDetailModal({
  content,
  clients,
  team,
  stageConfigs,
  noteAuthor,
  newNote,
  onClose,
  onStageClick,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
  onMoveStage,
}: ContentDetailModalProps) {
  const client = clients.find((c) => c.id === content.clientId);
  const TypeInfo = getContentType(content.type);

  return (
    <div
      className="pipeline-modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="pipeline-modal bg-white rounded-2xl w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between items-start py-5 px-6 border-b border-[#E5E7EB]">
          <div className="modal-title flex-1">
            <h2 className="text-[1.15rem] font-semibold text-[#111827] mb-2 leading-[1.4]">
              {content.idea}
            </h2>
            <span
              className="stage-badge text-[0.7rem] font-semibold py-1 px-2.5 rounded-lg inline-flex items-center gap-1"
              style={{
                background: `${stageConfigs[content.stage].color}15`,
                color: stageConfigs[content.stage].color,
              }}
            >
              {stageConfigs[content.stage].label}
            </span>
          </div>
          <button
            className="close-btn w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] transition-colors"
            onClick={onClose}
          >
            <X size={20} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="modal-content flex flex-col gap-5 p-6">
          <WorkflowProgress
            currentStage={content.stage}
            stageConfigs={stageConfigs}
            onStageClick={onStageClick}
          />

          {/* Client Info */}
          <div className="modal-section">
            <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Client</h4>
            <div className="modal-client-info flex items-center gap-3 py-3 px-3 bg-[#F9FAFB] rounded-[10px]">
              <div
                className="modal-client-logo w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-bold text-[0.9rem]"
                style={{ background: client?.color }}
              >
                {client?.logo}
              </div>
              <div>
                <span className="modal-client-name text-[0.9rem] font-semibold text-[#111827] block">
                  {client?.name}
                </span>
                <span className="modal-client-industry text-[0.75rem] text-[#6B7280]">
                  {client?.industry}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-row flex gap-5">
            <div className="modal-section flex-1">
              <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Content Type</h4>
              <div className="detail-tag inline-flex items-center gap-1.5 py-2 px-3 bg-[#F3F4F6] rounded-lg text-[0.8rem] text-[#374151]">
                <TypeInfo.icon size={14} />
                {TypeInfo.label}
              </div>
            </div>
            <div className="modal-section flex-1">
              <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Priority</h4>
              <div
                className={`detail-tag priority-tag inline-flex items-center gap-1 uppercase font-semibold text-[0.75rem] py-2 px-3 rounded-lg ${
                  content.priority === 'urgent'
                    ? 'bg-[#FEE2E2] text-[#DC2626]'
                    : content.priority === 'high'
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : content.priority === 'medium'
                    ? 'bg-[#E0E7FF] text-[#4F46E5]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}
              >
                {content.priority === 'urgent' && <AlertTriangle size={14} />}
                {content.priority}
              </div>
            </div>
          </div>

          {content.scheduledFor && (
            <div className="modal-section">
              <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Scheduled For</h4>
              <div className="detail-tag inline-flex items-center gap-1.5 py-2 px-3 bg-[#F3F4F6] rounded-lg text-[0.8rem] text-[#374151]">
                <Calendar size={14} />
                {new Date(content.scheduledFor).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          )}

          <div className="modal-section">
            <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Platforms</h4>
            <div className="platforms-display flex flex-wrap gap-2">
              {content.platforms?.map((platform) => (
                <span
                  key={platform}
                  className={`platform-chip inline-flex items-center gap-1.5 py-2 px-3 rounded-lg text-[0.8rem] font-medium capitalize ${
                    platform === 'instagram'
                      ? 'bg-gradient-to-br from-[rgba(131,58,180,0.1)] to-[rgba(225,48,108,0.1)] text-[#C13584]'
                      : platform === 'facebook'
                      ? 'bg-[rgba(24,119,242,0.1)] text-[#1877F2]'
                      : platform === 'linkedin'
                      ? 'bg-[rgba(10,102,194,0.1)] text-[#0A66C2]'
                      : platform === 'twitter'
                      ? 'bg-[rgba(29,161,242,0.1)] text-[#1DA1F2]'
                      : 'bg-[rgba(0,0,0,0.05)] text-[#010101]'
                  }`}
                >
                  {platform === 'instagram' && <Instagram size={14} />}
                  {platform === 'facebook' && <Facebook size={14} />}
                  {platform === 'linkedin' && <Linkedin size={14} />}
                  {platform === 'twitter' && <Twitter size={14} />}
                  {platform === 'tiktok' && <Play size={14} />}
                  {platform === 'youtube' && <Play size={14} />}
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <ContentNotes
            content={content}
            team={team}
            noteAuthor={noteAuthor}
            newNote={newNote}
            onNoteAuthorChange={onNoteAuthorChange}
            onNewNoteChange={onNewNoteChange}
            onAddNote={onAddNote}
          />

          <StageActions
            currentStage={content.stage}
            stageConfigs={stageConfigs}
            onMoveStage={onMoveStage}
          />
        </div>
      </div>
    </div>
  );
}


