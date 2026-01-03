'use client';

import { Plus } from 'lucide-react';
import type { CalendarEvent, CalendarDay as CalendarDayType } from './types';
import type { ContentItem } from '@/types/contentItem';

interface CalendarDayProps {
  day: CalendarDayType;
  events: CalendarEvent[];
  isToday: boolean;
  isDragOver: boolean;
  draggedContent: ContentItem | null;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, content: ContentItem) => void;
  onDragEnd: () => void;
}

export default function CalendarDay({
  day,
  events,
  isToday,
  isDragOver,
  draggedContent,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
}: CalendarDayProps) {
  return (
    <div
      className={`calendar-day bg-white p-1.5 min-h-[80px] flex flex-col relative transition-all ${
        !day.isCurrentMonth ? 'other-month bg-[#FAFAFA]' : ''
      } ${isToday ? 'today bg-[#F0F9FF]' : ''} ${
        isDragOver ? 'drag-over bg-[#E0E7FF] shadow-[inset_0_0_0_2px_#6366F1]' : ''
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <span
        className={`day-number text-[0.75rem] font-medium mb-1 ${
          !day.isCurrentMonth
            ? 'text-[#D1D5DB]'
            : isToday
            ? 'bg-[#111827] text-white w-[22px] h-[22px] rounded-full flex items-center justify-center'
            : 'text-[#374151]'
        }`}
      >
        {day.date.getDate()}
      </span>
      <div className="day-events flex-1 flex flex-col gap-0.5 overflow-hidden">
        {events.slice(0, 2).map((event, i) => (
          <div
            key={i}
            className={`day-event py-0.5 px-1.5 rounded text-[0.6rem] whitespace-nowrap overflow-hidden text-ellipsis transition-all ${
              event.type === 'post'
                ? 'bg-[#F3F4F6] border-l-2 text-[#374151] cursor-grab hover:bg-[#E5E7EB]'
                : 'bg-[#FEF3C7] text-[#92400E] cursor-default'
            } ${draggedContent?.id === event.content?.id ? 'opacity-40' : ''}`}
            style={
              event.type === 'post' && event.client
                ? { borderLeftColor: event.client.color }
                : {}
            }
            draggable={event.type === 'post'}
            onDragStart={(e) =>
              event.type === 'post' && event.content && onDragStart(e, event.content)
            }
            onDragEnd={onDragEnd}
          >
            {event.type === 'post' ? (
              <span className="event-title">{event.content?.idea.substring(0, 18)}...</span>
            ) : (
              <span className="event-title">📌 {event.task?.type}</span>
            )}
          </div>
        ))}
        {events.length > 2 && (
          <span className="more-events text-[0.55rem] text-[#9CA3AF] py-0.5 px-0.5">
            +{events.length - 2}
          </span>
        )}
      </div>
      {isDragOver && (
        <div className="drop-indicator absolute inset-1 bg-[rgba(99,102,241,0.1)] border-2 border-dashed border-[#6366F1] rounded-md flex flex-col items-center justify-center gap-0.5 text-[#6366F1] text-[0.6rem] font-semibold pointer-events-none">
          <Plus size={14} />
          Drop
        </div>
      )}
    </div>
  );
}





