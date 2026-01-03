'use client';

import type { TeamMemberWithStats } from './types';
import type { Task } from '@/store/tasks/tasksTypes';
import type { ContentItem } from '@/types/contentItem';
import type { Client } from '@/components/clients/types';
import type { TeamMember } from '@/data/mockData';
import MemberDetailHeader from './MemberDetailHeader';
import TaskFilters from './TaskFilters';
import TaskCard from './TaskCard';
import NoTasksView from './NoTasksView';
import type { TaskFilterStatus } from './types';

interface MemberDetailViewProps {
  member: TeamMemberWithStats;
  tasks: Task[];
  contentBank: ContentItem[];
  clients: Client[];
  team: TeamMember[];
  filterStatus: TaskFilterStatus;
  expandedTask: string | null;
  noteAuthor: string;
  newNote: string;
  isOverdue: (deadline: string) => boolean;
  onFilterChange: (status: TaskFilterStatus) => void;
  onTaskStatusToggle: (taskId: string, currentStatus: Task['status']) => void;
  onTaskToggleExpand: (taskId: string) => void;
  onNoteAuthorChange: (authorId: string) => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: (taskId: string) => void;
}

export default function MemberDetailView({
  member,
  tasks,
  contentBank,
  clients,
  team,
  filterStatus,
  expandedTask,
  noteAuthor,
  newNote,
  isOverdue,
  onFilterChange,
  onTaskStatusToggle,
  onTaskToggleExpand,
  onNoteAuthorChange,
  onNewNoteChange,
  onAddNote,
}: MemberDetailViewProps) {
  return (
    <>
      <MemberDetailHeader member={member} />
      <TaskFilters filterStatus={filterStatus} onFilterChange={onFilterChange} />
      <div className="task-list flex flex-col gap-2">
        {tasks.length === 0 ? (
          <NoTasksView />
        ) : (
          tasks.map((task) => {
            const content = contentBank.find((c) => c.id === task.contentId);
            const client = clients.find((c) => c.id === content?.clientId);
            const overdue = task.status !== 'done' && isOverdue(task.deadline);
            const isExpanded = expandedTask === task.id;
            return (
              <TaskCard
                key={task.id}
                task={task}
                content={content}
                client={client}
                team={team}
                isOverdue={overdue}
                isExpanded={isExpanded}
                noteAuthor={noteAuthor}
                newNote={newNote}
                onStatusToggle={() => onTaskStatusToggle(task.id, task.status)}
                onToggleExpand={() => onTaskToggleExpand(task.id)}
                onNoteAuthorChange={onNoteAuthorChange}
                onNewNoteChange={onNewNoteChange}
                onAddNote={() => onAddNote(task.id)}
              />
            );
          })
        )}
      </div>
    </>
  );
}





