'use client';

import { GripVertical } from 'lucide-react';
import type { ContentItem } from '@/types/contentItem';
import type { Client } from '@/components/clients/types';

interface UpcomingContentProps {
  content: ContentItem[];
  clients: Client[];
  draggedContent: ContentItem | null;
  onDragStart: (e: React.DragEvent, content: ContentItem) => void;
  onDragEnd: () => void;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function UpcomingContent({
  content,
  clients,
  draggedContent,
  onDragStart,
  onDragEnd,
}: UpcomingContentProps) {
  return (
    <div className="sidebar-section">
      <h3 className="text-[0.8rem] font-semibold text-[#111827] mb-1">Upcoming</h3>
      <div className="upcoming-list flex flex-col gap-2">
        {content.map((item) => {
          const client = clients.find((c) => c.id === item.clientId);
          return (
            <div
              key={item.id}
              className={`upcoming-item flex gap-2.5 items-start py-2 px-2 rounded-lg cursor-grab transition-all hover:bg-[#F9FAFB] active:cursor-grabbing ${
                draggedContent?.id === item.id ? 'opacity-40' : ''
              }`}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
              onDragEnd={onDragEnd}
            >
              <div className="upcoming-date w-10 h-10 bg-[#F3F4F6] rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="upcoming-day text-[0.95rem] font-bold text-[#111827] leading-none">
                  {new Date(item.scheduledFor!).getDate()}
                </span>
                <span className="upcoming-month text-[0.55rem] text-[#6B7280] uppercase">
                  {monthNames[new Date(item.scheduledFor!).getMonth()].substring(0, 3)}
                </span>
              </div>
              <div className="upcoming-content flex-1 min-w-0">
                <span
                  className="upcoming-client text-[0.6rem] font-semibold uppercase block"
                  style={{ color: client?.color }}
                >
                  {client?.name}
                </span>
                <p className="upcoming-idea text-[0.75rem] text-[#374151] mt-0.5 line-clamp-2">
                  {item.idea}
                </p>
              </div>
              <GripVertical size={14} className="upcoming-grip text-[#D1D5DB] shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}





