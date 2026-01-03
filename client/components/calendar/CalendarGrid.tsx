'use client';

import CalendarDay from './CalendarDay';
import type { CalendarDay as CalendarDayType, CalendarEvent } from './types';
import type { ContentItem } from '@/types/contentItem';

interface CalendarGridProps {
  days: CalendarDayType[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  formatDateString: (date: Date) => string;
  isToday: (date: Date) => boolean;
  draggedContent: ContentItem | null;
  dragOverDate: string | null;
  onDragOver: (e: React.DragEvent, date: Date) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, date: Date) => void;
  onDragStart: (e: React.DragEvent, content: ContentItem) => void;
  onDragEnd: () => void;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({
  days,
  getEventsForDate,
  formatDateString,
  isToday,
  draggedContent,
  dragOverDate,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
}: CalendarGridProps) {
  return (
    <div className="calendar-grid flex-1 flex flex-col min-h-0">
      <div className="calendar-header grid grid-cols-7 mb-1.5">
        {dayNames.map((day) => (
          <div
            key={day}
            className="day-header py-2 text-center text-[0.7rem] font-semibold text-[#6B7280] uppercase"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body flex-1 grid grid-cols-7 grid-rows-6 gap-px bg-[#E5E7EB] rounded-[10px] overflow-hidden">
        {days.map((day, index) => {
          const events = getEventsForDate(day.date);
          const dateStr = formatDateString(day.date);
          const isDragOver = dragOverDate === dateStr;
          return (
            <CalendarDay
              key={index}
              day={day}
              events={events}
              isToday={isToday(day.date)}
              isDragOver={isDragOver}
              draggedContent={draggedContent}
              onDragOver={(e) => onDragOver(e, day.date)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, day.date)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </div>
    </div>
  );
}





