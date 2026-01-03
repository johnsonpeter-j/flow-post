import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdeaBankState, IdeaBank } from './ideaBankTypes';
import { getIdeaBankItems, getIdeaBankItem, createIdeaBankItem, updateIdeaBankItem, deleteIdeaBankItem } from './ideaBankThunk';

const initialState: IdeaBankState = {
  ideaBankItems: [],
  selectedIdeaBankItem: null,
  getIdeaBankItems: {
    isLoading: false,
    error: null,
  },
  getIdeaBankItem: {
    isLoading: false,
    error: null,
  },
  createIdeaBankItem: {
    isLoading: false,
    error: null,
  },
  updateIdeaBankItem: {
    isLoading: false,
    error: null,
  },
  deleteIdeaBankItem: {
    isLoading: false,
    error: null,
  },
};

const ideaBankSlice = createSlice({
  name: 'ideaBank',
  initialState,
  reducers: {
    clearSelectedIdeaBankItem: (state) => {
      state.selectedIdeaBankItem = null;
    },
    clearError: (state, action: PayloadAction<'getIdeaBankItems' | 'getIdeaBankItem' | 'createIdeaBankItem' | 'updateIdeaBankItem' | 'deleteIdeaBankItem'>) => {
      if (action.payload === 'getIdeaBankItems') {
        state.getIdeaBankItems.error = null;
      } else if (action.payload === 'getIdeaBankItem') {
        state.getIdeaBankItem.error = null;
      } else if (action.payload === 'createIdeaBankItem') {
        state.createIdeaBankItem.error = null;
      } else if (action.payload === 'updateIdeaBankItem') {
        state.updateIdeaBankItem.error = null;
      } else if (action.payload === 'deleteIdeaBankItem') {
        state.deleteIdeaBankItem.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.getIdeaBankItems.error = null;
      state.getIdeaBankItem.error = null;
      state.createIdeaBankItem.error = null;
      state.updateIdeaBankItem.error = null;
      state.deleteIdeaBankItem.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all idea bank items
    builder
      .addCase(getIdeaBankItems.pending, (state) => {
        state.getIdeaBankItems.isLoading = true;
        state.getIdeaBankItems.error = null;
      })
      .addCase(getIdeaBankItems.fulfilled, (state, action) => {
        state.getIdeaBankItems.isLoading = false;
        state.ideaBankItems = action.payload.data || [];
        state.getIdeaBankItems.error = null;
      })
      .addCase(getIdeaBankItems.rejected, (state, action) => {
        state.getIdeaBankItems.isLoading = false;
        state.getIdeaBankItems.error = action.payload as string;
      });

    // Get single idea bank item
    builder
      .addCase(getIdeaBankItem.pending, (state) => {
        state.getIdeaBankItem.isLoading = true;
        state.getIdeaBankItem.error = null;
      })
      .addCase(getIdeaBankItem.fulfilled, (state, action) => {
        state.getIdeaBankItem.isLoading = false;
        state.selectedIdeaBankItem = action.payload.data;
        state.getIdeaBankItem.error = null;
      })
      .addCase(getIdeaBankItem.rejected, (state, action) => {
        state.getIdeaBankItem.isLoading = false;
        state.getIdeaBankItem.error = action.payload as string;
        state.selectedIdeaBankItem = null;
      });

    // Create idea bank item
    builder
      .addCase(createIdeaBankItem.pending, (state) => {
        state.createIdeaBankItem.isLoading = true;
        state.createIdeaBankItem.error = null;
      })
      .addCase(createIdeaBankItem.fulfilled, (state, action) => {
        state.createIdeaBankItem.isLoading = false;
        state.ideaBankItems.unshift(action.payload.data);
        state.createIdeaBankItem.error = null;
      })
      .addCase(createIdeaBankItem.rejected, (state, action) => {
        state.createIdeaBankItem.isLoading = false;
        state.createIdeaBankItem.error = action.payload as string;
      });

    // Update idea bank item
    builder
      .addCase(updateIdeaBankItem.pending, (state) => {
        state.updateIdeaBankItem.isLoading = true;
        state.updateIdeaBankItem.error = null;
      })
      .addCase(updateIdeaBankItem.fulfilled, (state, action) => {
        state.updateIdeaBankItem.isLoading = false;
        const index = state.ideaBankItems.findIndex((item) => item._id === action.payload.data._id);
        if (index !== -1) {
          state.ideaBankItems[index] = action.payload.data;
        }
        if (state.selectedIdeaBankItem?._id === action.payload.data._id) {
          state.selectedIdeaBankItem = action.payload.data;
        }
        state.updateIdeaBankItem.error = null;
      })
      .addCase(updateIdeaBankItem.rejected, (state, action) => {
        state.updateIdeaBankItem.isLoading = false;
        state.updateIdeaBankItem.error = action.payload as string;
      });

    // Delete idea bank item
    builder
      .addCase(deleteIdeaBankItem.pending, (state) => {
        state.deleteIdeaBankItem.isLoading = true;
        state.deleteIdeaBankItem.error = null;
      })
      .addCase(deleteIdeaBankItem.fulfilled, (state, action) => {
        state.deleteIdeaBankItem.isLoading = false;
        state.ideaBankItems = state.ideaBankItems.filter((item) => item._id !== action.payload.ideaBankItemId);
        if (state.selectedIdeaBankItem?._id === action.payload.ideaBankItemId) {
          state.selectedIdeaBankItem = null;
        }
        state.deleteIdeaBankItem.error = null;
      })
      .addCase(deleteIdeaBankItem.rejected, (state, action) => {
        state.deleteIdeaBankItem.isLoading = false;
        state.deleteIdeaBankItem.error = action.payload as string;
      });
  },
});

export const { clearSelectedIdeaBankItem, clearError, clearAllErrors } = ideaBankSlice.actions;
export default ideaBankSlice.reducer;


