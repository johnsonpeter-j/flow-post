'use client';

import UnscheduledContent from './UnscheduledContent';
import UpcomingContent from './UpcomingContent';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';

interface CalendarSidebarProps {
  unscheduledContent: ContentItem[];
  upcomingContent: ContentItem[];
  clients: Client[];
  draggedContent: ContentItem | null;
  onDragStart: (e: React.DragEvent, content: ContentItem) => void;
  onDragEnd: () => void;
}

export default function CalendarSidebar({
  unscheduledContent,
  upcomingContent,
  clients,
  draggedContent,
  onDragStart,
  onDragEnd,
}: CalendarSidebarProps) {
  return (
    <div className="calendar-sidebar w-[280px] bg-white border-l border-[#E5E7EB] p-4 overflow-y-auto shrink-0">
      <UnscheduledContent
        content={unscheduledContent}
        clients={clients}
        draggedContent={draggedContent}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
      <UpcomingContent
        content={upcomingContent}
        clients={clients}
        draggedContent={draggedContent}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}


