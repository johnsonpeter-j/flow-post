import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BriefsState } from './briefsTypes';
import type { Brief } from '@/components/clientsItem/types';
import { mockBriefs } from '@/data/mockData';

// Load from localStorage or use mock data
const loadBriefs = (): Brief[] => {
  if (typeof window === 'undefined') return mockBriefs;
  const saved = localStorage.getItem('flowpost_briefs');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return mockBriefs;
    }
  }
  return mockBriefs;
};

const initialState: BriefsState = {
  briefs: loadBriefs(),
  selectedBrief: null,
};

const briefsSlice = createSlice({
  name: 'briefs',
  initialState,
  reducers: {
    setBriefs: (state, action: PayloadAction<Brief[]>) => {
      state.briefs = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_briefs', JSON.stringify(action.payload));
      }
    },
    addBrief: (state, action: PayloadAction<Brief>) => {
      state.briefs.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_briefs', JSON.stringify(state.briefs));
      }
    },
    addBriefs: (state, action: PayloadAction<Brief[]>) => {
      state.briefs.push(...action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_briefs', JSON.stringify(state.briefs));
      }
    },
    updateBrief: (state, action: PayloadAction<Brief>) => {
      const index = state.briefs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.briefs[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_briefs', JSON.stringify(state.briefs));
        }
      }
    },
    deleteBrief: (state, action: PayloadAction<string>) => {
      state.briefs = state.briefs.filter((b) => b.id !== action.payload);
      if (state.selectedBrief?.id === action.payload) {
        state.selectedBrief = null;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('flowpost_briefs', JSON.stringify(state.briefs));
      }
    },
    setSelectedBrief: (state, action: PayloadAction<Brief | null>) => {
      state.selectedBrief = action.payload;
    },
    addBriefNote: (state, action: PayloadAction<{ briefId: string; note: { id: string; authorId: string; text: string; createdAt: string } }>) => {
      const brief = state.briefs.find((b) => b.id === action.payload.briefId);
      if (brief) {
        if (!brief.notes) brief.notes = [];
        brief.notes.push(action.payload.note);
        if (state.selectedBrief?.id === action.payload.briefId) {
          state.selectedBrief.notes = brief.notes;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('flowpost_briefs', JSON.stringify(state.briefs));
        }
      }
    },
  },
});

export const { setBriefs, addBrief, addBriefs, updateBrief, deleteBrief, setSelectedBrief, addBriefNote } = briefsSlice.actions;
export default briefsSlice.reducer;





