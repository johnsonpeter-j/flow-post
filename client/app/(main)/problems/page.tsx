'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckSquare,
  Layers,
  Users,
  FileText,
} from 'lucide-react';
import { useReduxData } from '@/hooks/useReduxData';
import {
  ProblemsHeader,
  NoProblemsView,
  ProblemSection,
  TaskProblemItem,
  ContentProblemItem,
  BriefProblemItem,
  WorkloadProblemItem,
} from '@/components/problems';
import type { ProblemTask, ProblemContent, ProblemBrief, ProblemMember } from '@/components/problems';
import { mockContentBank } from '@/data/mockData';

export default function ProblemsPage() {
  const router = useRouter();
  const { clients, briefs, tasks: mockTasks, team: mockTeam, updateTaskStatus, addTaskNote } =
    useReduxData();
  const contentBank = mockContentBank;
  const today = new Date('2025-01-17');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');

  // Legacy mock tasks fallback
  const fallbackTasks: ProblemTask[] = [
    {
      id: 't1',
      contentId: 'cb2',
      type: 'photoshoot',
      assigneeId: 'u11',
      deadline: '2025-01-15',
      status: 'in-progress',
      description: 'Schedule with customer',
      notes: [
        {
          id: 'n1',
          authorId: 'u11',
          text: 'Contacted customer, waiting for confirmation on timing',
          createdAt: '2025-01-16T10:30:00',
        },
        {
          id: 'n2',
          authorId: 'u1',
          text: 'Please prioritize this - client needs it by end of week',
          createdAt: '2025-01-16T14:15:00',
        },
      ],
    },
    {
      id: 't2',
      contentId: 'cb3',
      type: 'copywriting',
      assigneeId: 'u9',
      deadline: '2025-01-14',
      status: 'pending',
      description: 'Write captions',
      notes: [],
    },
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
    setNewNote('');
    setNoteAuthor('');
  };

  // 1. OVERDUE TASKS
  const allTasks = mockTasks.length > 0 ? mockTasks : fallbackTasks;
  const overdueTasks: ProblemTask[] = allTasks
    .filter((task) => {
      const deadline = new Date(task.deadline);
      return deadline < today && task.status !== 'done';
    })
    .map((task) => {
      const content = contentBank.find((c) => c.id === task.contentId);
      const client = clients.find((c) => c.id === content?.clientId);
      const assignee = mockTeam.find((m) => m.id === task.assigneeId);
      const daysOverdue = Math.ceil(
        (today.getTime() - new Date(task.deadline).getTime()) / (1000 * 60 * 60 * 24)
      );
      return { ...task, content, client, assignee, daysOverdue };
    });

  // 2. STALLED CONTENT
  const stalledContent: ProblemContent[] = contentBank
    .filter((content) => {
      if (content.stage === 'idea' || content.stage === 'posted' || content.stage === 'ready') return false;
      const createdDate = new Date(content.createdAt);
      const daysSinceCreated = Math.ceil((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceCreated > 4;
    })
    .map((content) => {
      const client = clients.find((c) => c.id === content.clientId);
      const daysSinceCreated = Math.ceil(
        (today.getTime() - new Date(content.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      return { ...content, client, daysStalled: daysSinceCreated };
    });

  // 3. URGENT ITEMS
  const urgentItems: ProblemContent[] = contentBank
    .filter((content) => content.priority === 'urgent' && content.stage !== 'posted')
    .map((content) => {
      const client = clients.find((c) => c.id === content.clientId);
      return { ...content, client };
    });

  // 4. MISSED POSTS
  const missedPosts: ProblemContent[] = contentBank
    .filter((content) => {
      if (!content.scheduledFor || content.stage === 'posted') return false;
      const scheduledDate = new Date(content.scheduledFor);
      return scheduledDate < today;
    })
    .map((content) => {
      const client = clients.find((c) => c.id === content.clientId);
      const daysMissed = Math.ceil(
        (today.getTime() - new Date(content.scheduledFor!).getTime()) / (1000 * 60 * 60 * 24)
      );
      return { ...content, client, daysMissed };
    });

  // 5. PENDING APPROVALS
  const pendingApprovals: ProblemContent[] = contentBank
    .filter((content) => content.stage === 'approval')
    .map((content) => {
      const client = clients.find((c) => c.id === content.clientId);
      const daysSinceCreated = Math.ceil(
        (today.getTime() - new Date(content.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      return { ...content, client, daysWaiting: daysSinceCreated };
    });

  // 6. WORKLOAD ISSUES
  const workloadIssues: ProblemMember[] = mockTeam
    .map((member) => {
      const activeTasks = allTasks.filter((t) => t.assigneeId === member.id && t.status !== 'done');
      const overdueTasks = activeTasks.filter((t) => new Date(t.deadline) < today);
      return { ...member, activeTasks: activeTasks.length, overdueTasks: overdueTasks.length };
    })
    .filter((member) => member.activeTasks >= 3 || member.overdueTasks > 0);

  // 7. STALLED BRIEFS
  const stalledBriefs: ProblemBrief[] = briefs
    .filter((brief) => brief.status === 'pending')
    .map((brief) => {
      const client = clients.find((c) => c.id === brief.clientId);
      const daysSinceCreated = brief.createdAt
        ? Math.ceil((today.getTime() - new Date(brief.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      return { ...brief, client, daysWaiting: daysSinceCreated };
    })
    .filter((brief) => brief.daysWaiting > 2);

  const totalProblems =
    overdueTasks.length +
    stalledContent.length +
    urgentItems.length +
    missedPosts.length +
    pendingApprovals.length +
    workloadIssues.length +
    stalledBriefs.length;

  const handleAddTaskNote = (taskId: string) => {
    if (!newNote.trim() || !noteAuthor) return;
    addTaskNote(taskId, { authorId: noteAuthor, text: newNote.trim() });
    setNewNote('');
    setNoteAuthor('');
  };

  const handleAddContentNote = (contentId: string) => {
    if (!newNote.trim() || !noteAuthor) return;
    // Note: Content note functionality would need to be implemented with ideaBank store
    setNewNote('');
    setNoteAuthor('');
  };

  const handleAddBriefNote = (briefId: string) => {
    if (!newNote.trim() || !noteAuthor) return;
    // TODO: Implement add note to brief
    setNewNote('');
    setNoteAuthor('');
  };

  const handleMarkTaskDone = (taskId: string) => {
    updateTaskStatus(taskId, 'done');
  };

  return (
    <div className="problems-view flex-1 flex flex-col overflow-hidden">
      <ProblemsHeader totalProblems={totalProblems} />

      <div className="problems-content flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
        {totalProblems === 0 ? (
          <NoProblemsView />
        ) : (
          <div className="problems-grid flex flex-col gap-4">
            {/* OVERDUE TASKS */}
            {overdueTasks.length > 0 && (
              <ProblemSection
                title="Overdue Tasks"
                count={overdueTasks.length}
                icon={<Clock size={16} />}
                variant="urgent"
              >
                <div className="problem-items p-2.5 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2.5">
                  {overdueTasks.map((task) => (
                    <TaskProblemItem
                      key={task.id}
                      task={task}
                      team={mockTeam}
                      isExpanded={expandedItem === `task-${task.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      onToggleExpand={() => toggleExpand(`task-${task.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddTaskNote(task.id)}
                      onMarkDone={() => handleMarkTaskDone(task.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* MISSED POSTS */}
            {missedPosts.length > 0 && (
              <ProblemSection
                title="Missed Post Dates"
                count={missedPosts.length}
                icon={<Calendar size={16} />}
                variant="urgent"
              >
                <div className="problem-items p-2.5 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2.5">
                  {missedPosts.map((content) => (
                    <ContentProblemItem
                      key={content.id}
                      content={content}
                      team={mockTeam}
                      isExpanded={expandedItem === `missed-${content.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      variant="missed"
                      onToggleExpand={() => toggleExpand(`missed-${content.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddContentNote(content.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* URGENT ITEMS */}
            {urgentItems.length > 0 && (
              <ProblemSection
                title="Urgent Priority Items"
                count={urgentItems.length}
                icon={<AlertTriangle size={16} />}
                variant="warning"
              >
                <div className="problem-items space-y-3">
                  {urgentItems.map((content) => (
                    <ContentProblemItem
                      key={content.id}
                      content={content}
                      team={mockTeam}
                      isExpanded={expandedItem === `urgent-${content.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      variant="urgent"
                      onToggleExpand={() => toggleExpand(`urgent-${content.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddContentNote(content.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* PENDING APPROVALS */}
            {pendingApprovals.length > 0 && (
              <ProblemSection
                title="Awaiting Approval"
                count={pendingApprovals.length}
                icon={<CheckSquare size={16} />}
                variant="info"
              >
                <div className="problem-items space-y-3">
                  {pendingApprovals.map((content) => (
                    <ContentProblemItem
                      key={content.id}
                      content={content}
                      team={mockTeam}
                      isExpanded={expandedItem === `approval-${content.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      variant="approval"
                      onToggleExpand={() => toggleExpand(`approval-${content.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddContentNote(content.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* STALLED CONTENT */}
            {stalledContent.length > 0 && (
              <ProblemSection
                title="Stalled Content"
                count={stalledContent.length}
                icon={<Layers size={16} />}
                variant="warning"
              >
                <div className="problem-items space-y-3">
                  {stalledContent.map((content) => (
                    <ContentProblemItem
                      key={content.id}
                      content={content}
                      team={mockTeam}
                      isExpanded={expandedItem === `stalled-${content.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      variant="stalled"
                      onToggleExpand={() => toggleExpand(`stalled-${content.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddContentNote(content.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* WORKLOAD ISSUES */}
            {workloadIssues.length > 0 && (
              <ProblemSection
                title="Workload Concerns"
                count={workloadIssues.length}
                icon={<Users size={16} />}
                variant="info"
              >
                <div className="problem-items space-y-3">
                  {workloadIssues.map((member) => (
                    <WorkloadProblemItem key={member.id} member={member} />
                  ))}
                </div>
              </ProblemSection>
            )}

            {/* STALLED BRIEFS */}
            {stalledBriefs.length > 0 && (
              <ProblemSection
                title="Briefs Needing Attention"
                count={stalledBriefs.length}
                icon={<FileText size={16} />}
                variant="info"
              >
                <div className="problem-items space-y-3">
                  {stalledBriefs.map((brief) => (
                    <BriefProblemItem
                      key={brief.id}
                      brief={brief}
                      team={mockTeam}
                      isExpanded={expandedItem === `brief-${brief.id}`}
                      noteAuthor={noteAuthor}
                      newNote={newNote}
                      onToggleExpand={() => toggleExpand(`brief-${brief.id}`)}
                      onNoteAuthorChange={setNoteAuthor}
                      onNewNoteChange={setNewNote}
                      onAddNote={() => handleAddBriefNote(brief.id)}
                    />
                  ))}
                </div>
              </ProblemSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
