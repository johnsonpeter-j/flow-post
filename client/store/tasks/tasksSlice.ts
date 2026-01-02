import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, Task } from './tasksTypes';

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: 't1',
    contentId: 'cb2',
    type: 'photoshoot',
    assigneeId: 'u11',
    deadline: '2025-01-15',
    status: 'in-progress',
    description: 'Schedule with customer',
    notes: [
      { id: 'n1', authorId: 'u11', text: 'Contacted customer, waiting for confirmation on timing', createdAt: '2025-01-16T10:30:00' },
      { id: 'n2', authorId: 'u1', text: 'Please prioritize this - client needs it by end of week', createdAt: '2025-01-16T14:15:00' },
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

// Load from localStorage or use mock data
const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return mockTasks;
  const saved = localStorage.getItem('flowpost_tasks');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return mockTasks;
    }
  }
  return mockTasks;
};

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_tasks', JSON.stringify(action.payload));
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_tasks', JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_tasks', JSON.stringify(state.tasks));
        }
      }
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_tasks', JSON.stringify(state.tasks));
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_tasks', JSON.stringify(state.tasks));
      }
    },
    addTaskNote: (state, action: PayloadAction<{ taskId: string; note: { id: string; authorId: string; text: string; createdAt: string } }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        if (!task.notes) task.notes = [];
        task.notes.push(action.payload.note);
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_tasks', JSON.stringify(state.tasks));
        }
      }
    },
  },
});

export const { setTasks, addTask, updateTask, updateTaskStatus, deleteTask, addTaskNote } = tasksSlice.actions;
export default tasksSlice.reducer;


