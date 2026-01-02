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
  setContentBank,
  addContent,
  addMultipleContent,
  updateContent,
  deleteContent,
  updateContentStage,
  scheduleContent,
  markContentAsPosted,
  addContentNote,
} from '@/store/content/contentSlice';
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
import type { ContentItem } from '@/store/content/contentTypes';
import type { Task } from '@/store/tasks/tasksTypes';
import type { Client } from '@/components/clients/types';

// Hook to access all data and actions
export function useReduxData() {
  const dispatch = useAppDispatch();
  const { clients, departments, team, selectedClientId } = useAppSelector((state) => state.app);
  const { briefs, selectedBrief } = useAppSelector((state) => state.briefs);
  const { contentBank } = useAppSelector((state) => state.content);
  const { tasks } = useAppSelector((state) => state.tasks);

  return {
    // Data
    clients,
    departments,
    team,
    selectedClientId,
    briefs,
    selectedBrief,
    contentBank,
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

    // Content actions
    setContentBank: (content: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => {
      const state = store.getState();
      if (typeof content === 'function') {
        dispatch(setContentBank(content(state.content.contentBank)));
      } else {
        dispatch(setContentBank(content));
      }
    },
    addContent: (content: ContentItem) => dispatch(addContent(content)),
    addMultipleContent: (content: ContentItem[]) => dispatch(addMultipleContent(content)),
    updateContent: (content: ContentItem) => dispatch(updateContent(content)),
    deleteContent: (id: string) => dispatch(deleteContent(id)),
    updateContentStage: (id: string, stage: string) => dispatch(updateContentStage({ id, stage })),
    scheduleContent: (id: string, scheduledFor: string) => dispatch(scheduleContent({ id, scheduledFor })),
    markContentAsPosted: (id: string, postedAt: string) => dispatch(markContentAsPosted({ id, postedAt })),
    addContentNote: (contentId: string, note: { authorId: string; text: string }) => {
      const newNote = {
        id: `cn${Date.now()}`,
        authorId: note.authorId,
        text: note.text,
        createdAt: new Date().toISOString(),
      };
      dispatch(addContentNote({ contentId, note: newNote }));
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

