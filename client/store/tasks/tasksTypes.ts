export interface Task {
  id: string;
  contentId: string;
  type: string;
  assigneeId: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'done';
  description: string;
  notes?: Array<{
    id: string;
    authorId: string;
    text: string;
    createdAt: string;
  }>;
}

export interface TasksState {
  tasks: Task[];
}





