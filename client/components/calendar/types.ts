import type { ContentItem } from '@/store/content/contentTypes';
import type { Task } from '@/store/tasks/tasksTypes';

export interface CalendarEvent {
  type: 'post' | 'deadline';
  content?: ContentItem;
  task?: Task;
  client?: { id: string; name: string; color: string };
}

export interface Toast {
  message: string;
  client?: { id: string; name: string; color: string };
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}


