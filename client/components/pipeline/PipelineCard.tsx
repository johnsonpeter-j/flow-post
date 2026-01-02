'use client';

import { Calendar, MessageSquare, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';
import { getContentType } from './utils';

interface PipelineCardProps {
  content: ContentItem;
  client: Client | undefined;
  onClick: () => void;
}

export default function PipelineCard({ content, client, onClick }: PipelineCardProps) {
  const TypeInfo = getContentType(content.type);

  return (
    <div
      className="pipeline-card bg-white rounded-[10px] p-3.5 cursor-pointer transition-all border border-transparent hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="pipeline-card-header flex justify-between items-center mb-2">
        <span
          className="card-client text-[0.6rem] font-semibold py-0.5 px-2 rounded-md uppercase"
          style={{
            background: `${client?.color}15`,
            color: client?.color,
          }}
        >
          {client?.name}
        </span>
        <span
          className={`card-priority text-[0.55rem] font-semibold py-0.5 px-1.5 rounded uppercase ${
            content.priority === 'urgent'
              ? 'bg-[#FEE2E2] text-[#DC2626]'
              : content.priority === 'high'
              ? 'bg-[#FEF3C7] text-[#D97706]'
              : content.priority === 'medium'
              ? 'bg-[#E0E7FF] text-[#4F46E5]'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}
        >
          {content.priority}
        </span>
      </div>
      <p className="card-idea text-[0.85rem] text-[#111827] leading-[1.5] font-medium mb-2.5">
        {content.idea}
      </p>
      <div className="pipeline-card-footer flex gap-3 items-center">
        <span className="card-type flex items-center gap-1 text-[0.7rem] text-[#6B7280]">
          <TypeInfo.icon size={12} />
          {TypeInfo.label}
        </span>
        {content.scheduledFor && (
          <span className="card-date flex items-center gap-1 text-[0.7rem] text-[#6B7280]">
            <Calendar size={12} />
            {new Date(content.scheduledFor).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
        {(content.notes || []).length > 0 && (
          <span className="card-notes-count flex items-center gap-1 text-[0.7rem] text-[#3B82F6] ml-auto">
            <MessageSquare size={12} />
            {(content.notes || []).length}
          </span>
        )}
      </div>
      {content.platforms && content.platforms.length > 0 && (
        <div className="pipeline-card-platforms flex gap-1.5 mt-2.5 pt-2.5 border-t border-[#F3F4F6] text-[#9CA3AF]">
          {content.platforms.includes('instagram') && <Instagram size={12} />}
          {content.platforms.includes('facebook') && <Facebook size={12} />}
          {content.platforms.includes('linkedin') && <Linkedin size={12} />}
          {content.platforms.includes('twitter') && <Twitter size={12} />}
        </div>
      )}
    </div>
  );
}


