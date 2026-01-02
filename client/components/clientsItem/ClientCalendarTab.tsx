'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, X, Clock, Plus } from 'lucide-react';
import type { Client } from '@/components/clients/types';

interface ContentItem {
  id: string;
  clientId: string;
  idea: string;
  stage: string;
  scheduledFor: string | null;
  postedAt?: string;
}

interface ClientCalendarTabProps {
  client: Client;
  clientContent: ContentItem[];
  onScheduleContent: (contentId: string, date: string) => void;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date(2025, 0, 17); // Current date in the app

export default function ClientCalendarTab({ client, clientContent, onScheduleContent }: ClientCalendarTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [draggedContent, setDraggedContent] = useState<ContentItem | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return clientContent.filter((c) => c.scheduledFor === dateStr);
  };

  const unscheduledContent = clientContent.filter((c) => !c.scheduledFor && c.stage !== 'posted' && c.stage !== 'idea');

  // Get post status: 'on-time', 'late', 'missed', 'upcoming', 'due-today'
  const getPostStatus = (content: ContentItem) => {
    if (!content.scheduledFor) return 'upcoming';
    const scheduledDate = new Date(content.scheduledFor);

    if (content.stage === 'posted' && content.postedAt) {
      const postedDate = new Date(content.postedAt);
      if (postedDate <= scheduledDate) {
        return 'on-time';
      } else {
        return 'late';
      }
    } else if (scheduledDate < today && content.stage !== 'posted') {
      return 'missed';
    } else if (scheduledDate.toDateString() === today.toDateString()) {
      return 'due-today';
    } else {
      return 'upcoming';
    }
  };

  // Calculate stats for the legend
  const postedContent = clientContent.filter((c) => c.stage === 'posted' && c.scheduledFor);
  const onTimeCount = postedContent.filter((c) => {
    if (!c.scheduledFor || !c.postedAt) return false;
    const scheduled = new Date(c.scheduledFor);
    const posted = new Date(c.postedAt);
    return posted <= scheduled;
  }).length;
  const lateCount = postedContent.filter((c) => {
    if (!c.scheduledFor || !c.postedAt) return false;
    const scheduled = new Date(c.scheduledFor);
    const posted = new Date(c.postedAt);
    return posted > scheduled;
  }).length;
  const missedCount = clientContent.filter((c) => {
    if (!c.scheduledFor || c.stage === 'posted') return false;
    return new Date(c.scheduledFor) < today;
  }).length;

  const days = getDaysInMonth(currentDate);
  const navigateMonth = (direction: number) =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const formatDateString = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

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
      onScheduleContent(draggedContent.id, dateStr);
    }
    setDraggedContent(null);
    setDragOverDate(null);
  };

  return (
    <div className="client-calendar-tab p-6">
      <div className="calendar-tab-header flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="month-nav flex items-center gap-2">
          <button className="nav-btn w-9 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors flex items-center justify-center" onClick={() => navigateMonth(-1)}>
            <ChevronLeft size={18} />
          </button>
          <span className="current-month text-base font-semibold text-[#111827] min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className="nav-btn w-9 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors flex items-center justify-center" onClick={() => navigateMonth(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="calendar-legend flex items-center gap-4 flex-wrap">
          <span className="legend-item on-time flex items-center gap-1.5 text-[0.75rem] text-[#059669]">
            <CheckCircle2 size={12} />
            On time ({onTimeCount})
          </span>
          <span className="legend-item late flex items-center gap-1.5 text-[0.75rem] text-[#DC2626]">
            <AlertCircle size={12} />
            Late ({lateCount})
          </span>
          <span className="legend-item missed flex items-center gap-1.5 text-[0.75rem] text-[#D97706]">
            <X size={12} />
            Missed ({missedCount})
          </span>
        </div>
      </div>

      <div className="calendar-tab-layout flex gap-4">
        <div className="calendar-tab-main flex-1 bg-white border border-[#E5E7EB] rounded-xl p-4">
          <div className="calendar-header grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="day-header text-center text-[0.7rem] font-semibold text-[#9CA3AF] py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-body compact grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const events = getEventsForDate(day.date);
              const dateStr = formatDateString(day.date);
              const isDragOver = dragOverDate === dateStr;
              return (
                <div
                  key={index}
                  className={`calendar-day min-h-[80px] border border-[#E5E7EB] rounded-lg p-1.5 transition-all ${
                    !day.isCurrentMonth ? 'opacity-40' : ''
                  } ${isToday(day.date) ? 'bg-[#EFF6FF] border-[#3B82F6]' : ''} ${isDragOver ? 'bg-[#FEF3C7] border-[#F59E0B]' : ''}`}
                  onDragOver={(e) => handleDragOver(e, day.date)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day.date)}
                >
                  <span className={`day-number text-[0.75rem] font-medium ${isToday(day.date) ? 'text-[#2563EB]' : 'text-[#374151]'}`}>
                    {day.date.getDate()}
                  </span>
                  <div className="day-events mt-1 space-y-1">
                    {events.slice(0, 2).map((content, i) => {
                      const status = getPostStatus(content);
                      return (
                        <div
                          key={i}
                          className={`day-event post ${status} flex items-center justify-between gap-1 px-1.5 py-0.5 rounded text-[0.65rem] border-l-2`}
                          style={{ borderLeftColor: client.color }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, content)}
                        >
                          <span className="event-text truncate flex-1">{content.idea.substring(0, 12)}...</span>
                          <span className={`event-status-icon ${status} shrink-0`}>
                            {status === 'on-time' && <CheckCircle2 size={10} className="text-[#059669]" />}
                            {status === 'late' && <AlertCircle size={10} className="text-[#DC2626]" />}
                            {status === 'missed' && <X size={10} className="text-[#D97706]" />}
                            {status === 'due-today' && <Clock size={10} className="text-[#F59E0B]" />}
                          </span>
                        </div>
                      );
                    })}
                    {events.length > 2 && <span className="more-events text-[0.6rem] text-[#9CA3AF] px-1">+{events.length - 2}</span>}
                  </div>
                  {isDragOver && (
                    <div className="drop-indicator absolute inset-0 flex items-center justify-center bg-[#FEF3C7] bg-opacity-50 rounded-lg">
                      <Plus size={12} className="text-[#F59E0B]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-tab-sidebar w-64 bg-white border border-[#E5E7EB] rounded-xl p-4">
          <div className="sidebar-section">
            <h3 className="flex justify-between items-center mb-3 text-sm font-semibold text-[#111827]">
              <span>Unscheduled</span>
              <span className="section-count text-[0.7rem] font-medium text-[#9CA3AF] bg-[#F3F4F6] py-0.5 px-2 rounded-[10px]">
                {unscheduledContent.length}
              </span>
            </h3>
            <div className="unscheduled-list space-y-2 max-h-[600px] overflow-y-auto">
              {unscheduledContent.map((content) => (
                <div
                  key={content.id}
                  className="unscheduled-item p-2.5 bg-[#F9FAFB] border-l-2 rounded-lg cursor-move hover:bg-[#F3F4F6] transition-colors"
                  style={{ borderLeftColor: client.color }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, content)}
                >
                  <p className="unscheduled-idea text-[0.75rem] text-[#374151] mb-1 line-clamp-2">{content.idea}</p>
                  <span
                    className={`unscheduled-stage text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-md capitalize ${
                      content.stage === 'execution'
                        ? 'bg-[#DBEAFE] text-[#2563EB]'
                        : content.stage === 'approval'
                        ? 'bg-[#F3E8FF] text-[#7C3AED]'
                        : content.stage === 'ready'
                        ? 'bg-[#D1FAE5] text-[#059669]'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {content.stage}
                  </span>
                </div>
              ))}
              {unscheduledContent.length === 0 && <p className="empty-text text-[0.75rem] text-[#9CA3AF] text-center py-4">All content scheduled!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


