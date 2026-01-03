'use client';

import type { ContentItem } from '@/types/contentItem';
import type { Client } from '@/components/clients/types';

interface UnscheduledContentProps {
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

export default function UnscheduledContent({
  content,
  clients,
  draggedContent,
  onDragStart,
  onDragEnd,
}: UnscheduledContentProps) {
  if (content.length === 0) return null;

  return (
    <div className="sidebar-section mb-6">
      <h3 className="text-[0.8rem] font-semibold text-[#111827] mb-1 flex items-center justify-between">
        <span>Unscheduled</span>
        <span className="section-count text-[0.65rem] bg-[#F3F4F6] text-[#6B7280] py-0.5 px-1.5 rounded-lg">
          {content.length}
        </span>
      </h3>
      <p className="sidebar-hint text-[0.65rem] text-[#9CA3AF] mb-2.5">Drag to calendar</p>
      <div className="unscheduled-list flex flex-col gap-1.5">
        {content.map((item) => {
          const client = clients.find((c) => c.id === item.clientId);
          return (
            <div
              key={item.id}
              className={`unscheduled-item py-2.5 px-2.5 bg-[#FAFAFA] rounded-lg border-l-[3px] cursor-grab transition-all hover:bg-[#F3F4F6] hover:translate-x-0.5 active:cursor-grabbing ${
                draggedContent?.id === item.id ? 'opacity-40 rotate-[2deg]' : ''
              }`}
              style={{ borderLeftColor: client?.color }}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
              onDragEnd={onDragEnd}
            >
              <span
                className="unscheduled-client text-[0.6rem] font-semibold uppercase"
                style={{ color: client?.color }}
              >
                {client?.name}
              </span>
              <p className="unscheduled-idea text-[0.75rem] text-[#374151] mt-1 leading-[1.4]">
                {item.idea}
              </p>
              <span className="unscheduled-stage text-[0.6rem] text-[#9CA3AF] uppercase mt-1.5 inline-block bg-[#E5E7EB] py-0.5 px-1.5 rounded capitalize">
                {item.stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}





