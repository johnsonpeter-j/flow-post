import type { ContentItem } from '@/store/content/contentTypes';
import type { Task } from '@/store/tasks/tasksTypes';
import type { Brief } from '@/components/clientsItem/types';
import type { Client } from '@/components/clients/types';
import type { TeamMember } from '@/data/mockData';

export interface ProblemTask extends Task {
  content?: ContentItem;
  client?: Client;
  assignee?: TeamMember;
  daysOverdue?: number;
}

export interface ProblemContent extends ContentItem {
  client?: Client;
  daysMissed?: number;
  daysStalled?: number;
  daysWaiting?: number;
}

export interface ProblemBrief extends Brief {
  client?: Client;
  daysWaiting?: number;
}

export interface ProblemMember extends TeamMember {
  activeTasks: number;
  overdueTasks: number;
}

export type ProblemType =
  | 'overdue-tasks'
  | 'missed-posts'
  | 'urgent-items'
  | 'pending-approvals'
  | 'stalled-content'
  | 'workload-issues'
  | 'stalled-briefs';


