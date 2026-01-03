'use client';

import { useState, useEffect, useMemo } from 'react';
import { useReduxData } from '@/hooks/useReduxData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDepartments, createDepartment } from '@/store/department/departmentThunk';
import { getUsers, createUser } from '@/store/user/userThunk';
import { clearError as clearDepartmentError } from '@/store/department/departmentSlice';
import { clearError as clearUserError } from '@/store/user/userSlice';
import type { Department as ApiDepartment } from '@/store/department/departmentTypes';
import type { User as ApiUser } from '@/store/user/userTypes';
import {
  TeamHeader,
  AddDepartmentModal,
  AddUserModal,
  DepartmentSection,
  MemberDetailView,
  NoSelectionView,
} from '@/components/team';
import type { TeamMemberWithStats, TaskFilterStatus } from '@/components/team';
import type { TeamMember, Department } from '@/data/mockData';
import type { Task } from '@/store/tasks/tasksTypes';
import { mockContentBank } from '@/data/mockData';

export default function TeamPage() {
  const dispatch = useAppDispatch();
  const { tasks, clients, updateTaskStatus, addTaskNote } = useReduxData();
  const contentBank = mockContentBank;
  
  // Get departments and users from Redux store
  const { departments: apiDepartments, createDepartment: createDeptState } = useAppSelector(
    (state) => state.department
  );
  const { users: apiUsers, createUser: createUserState } = useAppSelector((state) => state.user);
  
  // Map API departments to component Department format
  const departments: Department[] = useMemo(() => {
    return apiDepartments.map((dept: ApiDepartment) => ({
      id: dept._id,
      name: dept.name,
      icon: 'folder', // Default icon, can be enhanced later
      color: '#6366F1', // Default color, can be enhanced later
    }));
  }, [apiDepartments]);
  
  // Map API users to component TeamMember format
  const team: TeamMember[] = useMemo(() => {
    return apiUsers.map((user: ApiUser) => {
      const nameParts = user.name.split(' ');
      const avatar = nameParts
        .map((part) => part[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
      
      return {
        id: user._id,
        name: user.name,
        role: '', // Role not in API, can be added later
        departmentId: user.departmentId?._id || '',
        avatar,
        color: '#6366F1', // Default color, can be enhanced later
      };
    });
  }, [apiUsers]);
  
  const [selectedMember, setSelectedMember] = useState<TeamMemberWithStats | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskFilterStatus>('all');
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // Update expanded departments when departments change
  useEffect(() => {
    if (departments.length > 0 && expandedDepts.length === 0) {
      setExpandedDepts(departments.map((d) => d.id));
    }
  }, [departments, expandedDepts.length]);
  
  // Fetch departments and users on mount
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getUsers());
  }, [dispatch]);

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

  const handleAddDepartment = async (name: string, description: string) => {
    try {
      await dispatch(
        createDepartment({
          name,
          description: description || undefined,
        })
      ).unwrap();
      
      // Close modal on success
      setIsDepartmentModalOpen(false);
    } catch (error) {
      // Error is handled in Redux state and will be shown in modal
      console.error('Failed to create department:', error);
    }
  };

  const handleAddUser = async (fullName: string, email: string, departmentId: string) => {
    try {
      await dispatch(
        createUser({
          name: fullName,
          email,
          departmentId: departmentId || undefined,
        })
      ).unwrap();
      
      // Close modal on success
      setIsUserModalOpen(false);
    } catch (error) {
      // Error is handled in Redux state and will be shown in modal
      console.error('Failed to create user:', error);
    }
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
        onClose={() => {
          setIsDepartmentModalOpen(false);
          dispatch(clearDepartmentError('createDepartment'));
        }}
        onAdd={handleAddDepartment}
        isLoading={createDeptState.isLoading}
        apiError={createDeptState.error}
      />

      <AddUserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          dispatch(clearUserError('createUser'));
        }}
        onAdd={handleAddUser}
        departments={departments}
        isLoading={createUserState.isLoading}
        apiError={createUserState.error}
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
