'use client';

import { useState } from 'react';
import { useReduxData } from '@/hooks/useReduxData';
import {
  TeamHeader,
  AddDepartmentModal,
  AddUserModal,
  DepartmentSection,
  MemberDetailView,
  NoSelectionView,
} from '@/components/team';
import type { TeamMemberWithStats, TaskFilterStatus } from '@/components/team';
import type { TeamMember } from '@/data/mockData';
import type { Task } from '@/store/tasks/tasksTypes';

export default function TeamPage() {
  const { team, departments, tasks, contentBank, clients, updateTaskStatus, addTaskNote } =
    useReduxData();
  const [selectedMember, setSelectedMember] = useState<TeamMemberWithStats | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskFilterStatus>('all');
  const [expandedDepts, setExpandedDepts] = useState<string[]>(departments.map((d) => d.id));
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const today = new Date('2025-01-17');

  const getTasksForMember = (memberId: string) => tasks.filter((t) => t.assigneeId === memberId);

  const getTaskStats = (memberId: string) => {
    const memberTasks = getTasksForMember(memberId);
    return {
      total: memberTasks.length,
      pending: memberTasks.filter((t) => t.status === 'pending').length,
      inProgress: memberTasks.filter((t) => t.status === 'in-progress').length,
      done: memberTasks.filter((t) => t.status === 'done').length,
    };
  };

  const getDeptStats = (deptId: string) => {
    const deptMembers = team.filter((m) => m.departmentId === deptId);
    let total = 0;
    let done = 0;
    deptMembers.forEach((m) => {
      const stats = getTaskStats(m.id);
      total += stats.total;
      done += stats.done;
    });
    return { total, done, members: deptMembers.length };
  };

  const isOverdue = (deadline: string) => new Date(deadline) < today;

  const toggleDept = (deptId: string) => {
    setExpandedDepts((prev) =>
      prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId]
    );
  };

  const filteredTasks = selectedMember
    ? getTasksForMember(selectedMember.id).filter(
        (t) => filterStatus === 'all' || t.status === filterStatus
      )
    : [];

  const handleUpdateTaskStatus = (taskId: string, currentStatus: Task['status']) => {
    let newStatus: Task['status'];
    if (currentStatus === 'pending') {
      newStatus = 'in-progress';
    } else if (currentStatus === 'in-progress') {
      newStatus = 'done';
    } else {
      newStatus = 'pending';
    }
    updateTaskStatus(taskId, newStatus);
  };

  const toggleTaskExpand = (taskId: string) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
      setNewNote('');
      setNoteAuthor('');
    } else {
      setExpandedTask(taskId);
      setNewNote('');
      setNoteAuthor(selectedMember?.id || '');
    }
  };

  const addNote = (taskId: string) => {
    if (!newNote.trim() || !noteAuthor) return;
    addTaskNote(taskId, { authorId: noteAuthor, text: newNote.trim() });
    setNewNote('');
  };

  const hasOverdue = (memberId: string) => {
    return getTasksForMember(memberId).some((t) => t.status !== 'done' && isOverdue(t.deadline));
  };

  const handleMemberSelect = (member: TeamMember) => {
    const isSelected = selectedMember?.id === member.id;
    if (isSelected) {
      setSelectedMember(null);
    } else {
      setSelectedMember({
        ...member,
        stats: getTaskStats(member.id),
      });
    }
  };

  const handleAddDepartment = (name: string, description: string) => {
    // TODO: Call API to add department
    console.log('Adding department:', { name, description });
    // For now, just close the modal
    setIsDepartmentModalOpen(false);
  };

  const handleAddUser = (fullName: string, email: string, departmentId: string) => {
    // TODO: Call API to add user
    console.log('Adding user:', { fullName, email, departmentId });
    // For now, just close the modal
    setIsUserModalOpen(false);
  };

  return (
    <div className="team-view flex-1 flex flex-col overflow-hidden">
      <TeamHeader
        teamCount={team.length}
        onAddDepartment={() => setIsDepartmentModalOpen(true)}
        onAddUser={() => setIsUserModalOpen(true)}
      />

      <AddDepartmentModal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        onAdd={handleAddDepartment}
      />

      <AddUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onAdd={handleAddUser}
        departments={departments}
      />

      <div className="team-layout flex-1 flex overflow-hidden">
        <div className="team-list w-80 bg-white border-r border-[#E5E7EB] overflow-y-auto scrollbar-thin scrollbar-thumb-[#E5E7EB] scrollbar-track-transparent">
          {departments.map((dept) => {
            const members = team.filter((m) => m.departmentId === dept.id);
            const deptStats = getDeptStats(dept.id);
            return (
              <DepartmentSection
                key={dept.id}
                department={dept}
                members={members}
                deptStats={deptStats}
                isExpanded={expandedDepts.includes(dept.id)}
                selectedMemberId={selectedMember?.id || null}
                getTaskStats={getTaskStats}
                hasOverdue={hasOverdue}
                onToggle={() => toggleDept(dept.id)}
                onMemberSelect={handleMemberSelect}
              />
            );
          })}
        </div>

        <div className="team-detail flex-1 py-6 px-6 overflow-y-auto bg-[#FAFAFA]">
          {selectedMember ? (
            <MemberDetailView
              member={selectedMember}
              tasks={filteredTasks}
              contentBank={contentBank}
              clients={clients}
              team={team}
              filterStatus={filterStatus}
              expandedTask={expandedTask}
              noteAuthor={noteAuthor}
              newNote={newNote}
              isOverdue={isOverdue}
              onFilterChange={setFilterStatus}
              onTaskStatusToggle={handleUpdateTaskStatus}
              onTaskToggleExpand={toggleTaskExpand}
              onNoteAuthorChange={setNoteAuthor}
              onNewNoteChange={setNewNote}
              onAddNote={addNote}
            />
          ) : (
            <NoSelectionView />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
