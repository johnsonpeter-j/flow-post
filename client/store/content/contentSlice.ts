import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentState, ContentItem } from './contentTypes';
import { mockContentBank } from '@/data/mockData';

// Load from localStorage or use mock data
const loadContent = (): ContentItem[] => {
  if (typeof window === 'undefined') return mockContentBank;
  const saved = localStorage.getItem('flowpost_content');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return mockContentBank;
    }
  }
  return mockContentBank;
};

const initialState: ContentState = {
  contentBank: loadContent(),
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContentBank: (state, action: PayloadAction<ContentItem[]>) => {
      state.contentBank = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_content', JSON.stringify(action.payload));
      }
    },
    addContent: (state, action: PayloadAction<ContentItem>) => {
      state.contentBank.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
      }
    },
    addMultipleContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.contentBank.push(...action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
      }
    },
    updateContent: (state, action: PayloadAction<ContentItem>) => {
      const index = state.contentBank.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contentBank[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
        }
      }
    },
    deleteContent: (state, action: PayloadAction<string>) => {
      state.contentBank = state.contentBank.filter((c) => c.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
      }
    },
    updateContentStage: (state, action: PayloadAction<{ id: string; stage: string }>) => {
      const content = state.contentBank.find((c) => c.id === action.payload.id);
      if (content) {
        content.stage = action.payload.stage;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
        }
      }
    },
    scheduleContent: (state, action: PayloadAction<{ id: string; scheduledFor: string }>) => {
      const content = state.contentBank.find((c) => c.id === action.payload.id);
      if (content) {
        content.scheduledFor = action.payload.scheduledFor;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
        }
      }
    },
    markContentAsPosted: (state, action: PayloadAction<{ id: string; postedAt: string }>) => {
      const content = state.contentBank.find((c) => c.id === action.payload.id);
      if (content) {
        content.stage = 'posted';
        content.postedAt = action.payload.postedAt;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
        }
      }
    },
    addContentNote: (state, action: PayloadAction<{ contentId: string; note: { id: string; authorId: string; text: string; createdAt: string } }>) => {
      const content = state.contentBank.find((c) => c.id === action.payload.contentId);
      if (content) {
        if (!content.notes) content.notes = [];
        content.notes.push(action.payload.note);
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_content', JSON.stringify(state.contentBank));
        }
      }
    },
  },
});

export const {
  setContentBank,
  addContent,
  addMultipleContent,
  updateContent,
  deleteContent,
  updateContentStage,
  scheduleContent,
  markContentAsPosted,
  addContentNote,
} = contentSlice.actions;
export default contentSlice.reducer;


