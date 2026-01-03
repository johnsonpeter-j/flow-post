import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentBriefState, ContentBrief } from './contentBriefTypes';
import { getContentBriefs, getContentBrief, createContentBrief, updateContentBrief, deleteContentBrief } from './contentBriefThunk';

const initialState: ContentBriefState = {
  contentBriefs: [],
  selectedContentBrief: null,
  getContentBriefs: {
    isLoading: false,
    error: null,
  },
  getContentBrief: {
    isLoading: false,
    error: null,
  },
  createContentBrief: {
    isLoading: false,
    error: null,
  },
  updateContentBrief: {
    isLoading: false,
    error: null,
  },
  deleteContentBrief: {
    isLoading: false,
    error: null,
  },
};

const contentBriefSlice = createSlice({
  name: 'contentBrief',
  initialState,
  reducers: {
    clearSelectedContentBrief: (state) => {
      state.selectedContentBrief = null;
    },
    clearError: (state, action: PayloadAction<'getContentBriefs' | 'getContentBrief' | 'createContentBrief' | 'updateContentBrief' | 'deleteContentBrief'>) => {
      if (action.payload === 'getContentBriefs') {
        state.getContentBriefs.error = null;
      } else if (action.payload === 'getContentBrief') {
        state.getContentBrief.error = null;
      } else if (action.payload === 'createContentBrief') {
        state.createContentBrief.error = null;
      } else if (action.payload === 'updateContentBrief') {
        state.updateContentBrief.error = null;
      } else if (action.payload === 'deleteContentBrief') {
        state.deleteContentBrief.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.getContentBriefs.error = null;
      state.getContentBrief.error = null;
      state.createContentBrief.error = null;
      state.updateContentBrief.error = null;
      state.deleteContentBrief.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all content briefs
    builder
      .addCase(getContentBriefs.pending, (state) => {
        state.getContentBriefs.isLoading = true;
        state.getContentBriefs.error = null;
      })
      .addCase(getContentBriefs.fulfilled, (state, action) => {
        state.getContentBriefs.isLoading = false;
        state.contentBriefs = action.payload.data || [];
        state.getContentBriefs.error = null;
      })
      .addCase(getContentBriefs.rejected, (state, action) => {
        state.getContentBriefs.isLoading = false;
        state.getContentBriefs.error = action.payload as string;
      });

    // Get single content brief
    builder
      .addCase(getContentBrief.pending, (state) => {
        state.getContentBrief.isLoading = true;
        state.getContentBrief.error = null;
      })
      .addCase(getContentBrief.fulfilled, (state, action) => {
        state.getContentBrief.isLoading = false;
        state.selectedContentBrief = action.payload.data;
        state.getContentBrief.error = null;
      })
      .addCase(getContentBrief.rejected, (state, action) => {
        state.getContentBrief.isLoading = false;
        state.getContentBrief.error = action.payload as string;
        state.selectedContentBrief = null;
      });

    // Create content brief
    builder
      .addCase(createContentBrief.pending, (state) => {
        state.createContentBrief.isLoading = true;
        state.createContentBrief.error = null;
      })
      .addCase(createContentBrief.fulfilled, (state, action) => {
        state.createContentBrief.isLoading = false;
        state.contentBriefs.unshift(action.payload.data);
        state.createContentBrief.error = null;
      })
      .addCase(createContentBrief.rejected, (state, action) => {
        state.createContentBrief.isLoading = false;
        state.createContentBrief.error = action.payload as string;
      });

    // Update content brief
    builder
      .addCase(updateContentBrief.pending, (state) => {
        state.updateContentBrief.isLoading = true;
        state.updateContentBrief.error = null;
      })
      .addCase(updateContentBrief.fulfilled, (state, action) => {
        state.updateContentBrief.isLoading = false;
        const index = state.contentBriefs.findIndex((brief) => brief._id === action.payload.data._id);
        if (index !== -1) {
          state.contentBriefs[index] = action.payload.data;
        }
        if (state.selectedContentBrief?._id === action.payload.data._id) {
          state.selectedContentBrief = action.payload.data;
        }
        state.updateContentBrief.error = null;
      })
      .addCase(updateContentBrief.rejected, (state, action) => {
        state.updateContentBrief.isLoading = false;
        state.updateContentBrief.error = action.payload as string;
      });

    // Delete content brief
    builder
      .addCase(deleteContentBrief.pending, (state) => {
        state.deleteContentBrief.isLoading = true;
        state.deleteContentBrief.error = null;
      })
      .addCase(deleteContentBrief.fulfilled, (state, action) => {
        state.deleteContentBrief.isLoading = false;
        state.contentBriefs = state.contentBriefs.filter((brief) => brief._id !== action.payload.contentBriefId);
        if (state.selectedContentBrief?._id === action.payload.contentBriefId) {
          state.selectedContentBrief = null;
        }
        state.deleteContentBrief.error = null;
      })
      .addCase(deleteContentBrief.rejected, (state, action) => {
        state.deleteContentBrief.isLoading = false;
        state.deleteContentBrief.error = action.payload as string;
      });
  },
});

export const { clearSelectedContentBrief, clearError, clearAllErrors } = contentBriefSlice.actions;
export default contentBriefSlice.reducer;


