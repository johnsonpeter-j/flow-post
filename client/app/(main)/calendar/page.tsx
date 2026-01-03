'use client';

import { useState } from 'react';
import { useReduxData } from '@/hooks/useReduxData';
import {
  CalendarHeader,
  CalendarGrid,
  CalendarSidebar,
  Toast,
} from '@/components/calendar';
import type { CalendarEvent, CalendarDayType, ToastType } from '@/components/calendar';
import { mockContentBank } from '@/data/mockData';

interface ContentItem {
  id: string;
  clientId: string;
  idea: string;
  type: string;
  stage: string;
  priority: string;
  createdAt: string;
  scheduledFor: string | null;
  platforms: string[];
  notes?: any[];
  postedAt?: string;
}

export default function CalendarPage() {
  const { clients, tasks } = useReduxData();
  const contentBank = mockContentBank;
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [draggedContent, setDraggedContent] = useState<ContentItem | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [filterClient, setFilterClient] = useState<string | null>(null);

  const getDaysInMonth = (date: Date): CalendarDayType[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days: CalendarDayType[] = [];

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Next month days to fill grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const formatDateString = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = formatDateString(date);
    const events: CalendarEvent[] = [];

    // Content scheduled for this date
    contentBank.forEach((content) => {
      if (content.scheduledFor === dateStr) {
        if (!filterClient || content.clientId === filterClient) {
          const client = clients.find((c) => c.id === content.clientId);
          events.push({
            type: 'post',
            content,
            client: client ? { id: client.id, name: client.name, color: client.color } : undefined,
          });
        }
      }
    });

    // Tasks with deadlines on this date
    tasks.forEach((task) => {
      if (task.deadline === dateStr && task.status !== 'done') {
        const content = contentBank.find((c) => c.id === task.contentId);
        if (!filterClient || content?.clientId === filterClient) {
          events.push({
            type: 'deadline',
            task,
            content,
          });
        }
      }
    });

    return events;
  };

  const unscheduledContent = contentBank.filter(
    (c) =>
      !c.scheduledFor &&
      c.stage !== 'posted' &&
      c.stage !== 'idea' &&
      (!filterClient || c.clientId === filterClient)
  );

  const upcomingContent = contentBank
    .filter((c) => c.scheduledFor && (!filterClient || c.clientId === filterClient))
    .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())
    .slice(0, 5);

  const days = getDaysInMonth(currentDate);
  const navigateMonth = (direction: number) =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  const isToday = (date: Date) =>
    date.toDateString() === new Date(2025, 0, 17).toDateString();

  const handleDragStart = (e: React.DragEvent, content: ContentItem) => {
    setDraggedContent(content);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    setDragOverDate(formatDateString(date));
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    const dateStr = formatDateString(date);
    if (draggedContent) {
      // Note: Schedule functionality would need to be implemented with ideaBank store
      const client = clients.find((c) => c.id === draggedContent.clientId);
      setToast({
        message: `Scheduled "${draggedContent.idea}" for ${new Date(dateStr).toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
          }
        )}`,
        client: client ? { id: client.id, name: client.name, color: client.color } : undefined,
      });
      setTimeout(() => setToast(null), 2500);
    }
    setDraggedContent(null);
    setDragOverDate(null);
  };

  const handleDragEnd = () => {
    setDraggedContent(null);
    setDragOverDate(null);
  };

  return (
    <div className="calendar-view flex-1 flex flex-col overflow-hidden relative">
      <CalendarHeader
        clients={clients}
        filterClient={filterClient}
        onFilterChange={setFilterClient}
        currentDate={currentDate}
        onNavigateMonth={navigateMonth}
      />

      <div className="calendar-layout flex-1 flex overflow-hidden">
        <div className="calendar-main flex-1 py-4 px-5 overflow-hidden flex flex-col">
          <CalendarGrid
            days={days}
            getEventsForDate={getEventsForDate}
            formatDateString={formatDateString}
            isToday={isToday}
            draggedContent={draggedContent}
            dragOverDate={dragOverDate}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </div>

        <CalendarSidebar
          unscheduledContent={unscheduledContent}
          upcomingContent={upcomingContent}
          clients={clients}
          draggedContent={draggedContent}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>

      <Toast toast={toast} />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
