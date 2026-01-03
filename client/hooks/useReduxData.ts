'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { store } from '@/store/store';
import {
  setBriefs,
  addBrief,
  addBriefs,
  updateBrief,
  deleteBrief,
  setSelectedBrief,
  addBriefNote,
} from '@/store/briefs/briefsSlice';
import {
  setTasks,
  addTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  addTaskNote,
} from '@/store/tasks/tasksSlice';
import { setClients, addClient, updateClient, deleteClient, setSelectedClientId } from '@/store/app/appSlice';
import type { Brief } from '@/components/clientsItem/types';
import type { Task } from '@/store/tasks/tasksTypes';
import type { Client } from '@/components/clients/types';

// Hook to access all data and actions
export function useReduxData() {
  const dispatch = useAppDispatch();
  const { clients, departments, team, selectedClientId } = useAppSelector((state) => state.app);
  const { briefs, selectedBrief } = useAppSelector((state) => state.briefs);
  const { tasks } = useAppSelector((state) => state.tasks);

  return {
    // Data
    clients,
    departments,
    team,
    selectedClientId,
    briefs,
    selectedBrief,
    tasks,

    // Briefs actions
    setBriefs: (briefs: Brief[] | ((prev: Brief[]) => Brief[])) => {
      const state = store.getState();
      if (typeof briefs === 'function') {
        dispatch(setBriefs(briefs(state.briefs.briefs)));
      } else {
        dispatch(setBriefs(briefs));
      }
    },
    addBrief: (brief: Brief) => dispatch(addBrief(brief)),
    addBriefs: (newBriefs: Brief[]) => dispatch(addBriefs(newBriefs)),
    updateBrief: (brief: Brief) => dispatch(updateBrief(brief)),
    deleteBrief: (id: string) => dispatch(deleteBrief(id)),
    setSelectedBrief: (brief: Brief | null) => dispatch(setSelectedBrief(brief)),
    addBriefNote: (briefId: string, note: { authorId: string; text: string }) => {
      const newNote = {
        id: `bn${Date.now()}`,
        authorId: note.authorId,
        text: note.text,
        createdAt: new Date().toISOString(),
      };
      dispatch(addBriefNote({ briefId, note: newNote }));
    },

    // Tasks actions
    setTasks: (tasks: Task[]) => dispatch(setTasks(tasks)),
    addTask: (task: Task) => dispatch(addTask(task)),
    updateTask: (task: Task) => dispatch(updateTask(task)),
    updateTaskStatus: (id: string, status: Task['status']) => dispatch(updateTaskStatus({ id, status })),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
    addTaskNote: (taskId: string, note: { authorId: string; text: string }) => {
      const newNote = {
        id: `n${Date.now()}`,
        authorId: note.authorId,
        text: note.text,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTaskNote({ taskId, note: newNote }));
    },

    // App actions
    setClients: (clients: Client[]) => dispatch(setClients(clients)),
    addClient: (client: Client) => dispatch(addClient(client)),
    updateClient: (client: Client) => dispatch(updateClient(client)),
    deleteClient: (id: string) => dispatch(deleteClient(id)),
    setSelectedClientId: (id: string | null) => dispatch(setSelectedClientId(id)),
  };
}

