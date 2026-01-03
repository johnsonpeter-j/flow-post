import type { TeamMember, Department } from '@/data/mockData';
import type { Task } from '@/store/tasks/tasksTypes';

export interface TeamMemberWithStats extends TeamMember {
  stats?: {
    total: number;
    pending: number;
    inProgress: number;
    done: number;
  };
}

export interface DepartmentStats {
  total: number;
  done: number;
  members: number;
}

export type TaskFilterStatus = 'all' | 'pending' | 'in-progress' | 'done';





