import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientState, Client } from './clientTypes';
import { getClients, getClient, createClient, updateClient, deleteClient } from './clientThunk';

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  getClients: {
    isLoading: false,
    error: null,
  },
  getClient: {
    isLoading: false,
    error: null,
  },
  createClient: {
    isLoading: false,
    error: null,
  },
  updateClient: {
    isLoading: false,
    error: null,
  },
  deleteClient: {
    isLoading: false,
    error: null,
  },
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
    clearError: (state, action: PayloadAction<'getClients' | 'getClient' | 'createClient' | 'updateClient' | 'deleteClient'>) => {
      if (action.payload === 'getClients') {
        state.getClients.error = null;
      } else if (action.payload === 'getClient') {
        state.getClient.error = null;
      } else if (action.payload === 'createClient') {
        state.createClient.error = null;
      } else if (action.payload === 'updateClient') {
        state.updateClient.error = null;
      } else if (action.payload === 'deleteClient') {
        state.deleteClient.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.getClients.error = null;
      state.getClient.error = null;
      state.createClient.error = null;
      state.updateClient.error = null;
      state.deleteClient.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all clients
    builder
      .addCase(getClients.pending, (state) => {
        state.getClients.isLoading = true;
        state.getClients.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.getClients.isLoading = false;
        state.clients = action.payload.data || [];
        state.getClients.error = null;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.getClients.isLoading = false;
        state.getClients.error = action.payload as string;
      });

    // Get single client
    builder
      .addCase(getClient.pending, (state) => {
        state.getClient.isLoading = true;
        state.getClient.error = null;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.getClient.isLoading = false;
        state.selectedClient = action.payload.data;
        state.getClient.error = null;
      })
      .addCase(getClient.rejected, (state, action) => {
        state.getClient.isLoading = false;
        state.getClient.error = action.payload as string;
        state.selectedClient = null;
      });

    // Create client
    builder
      .addCase(createClient.pending, (state) => {
        state.createClient.isLoading = true;
        state.createClient.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.createClient.isLoading = false;
        state.clients.unshift(action.payload.data);
        state.createClient.error = null;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.createClient.isLoading = false;
        state.createClient.error = action.payload as string;
      });

    // Update client
    builder
      .addCase(updateClient.pending, (state) => {
        state.updateClient.isLoading = true;
        state.updateClient.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.updateClient.isLoading = false;
        const updatedClient = action.payload.data;
        const index = state.clients.findIndex(client => client._id === updatedClient._id);
        if (index !== -1) {
          state.clients[index] = updatedClient;
        }
        if (state.selectedClient && state.selectedClient._id === updatedClient._id) {
          state.selectedClient = updatedClient;
        }
        state.updateClient.error = null;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.updateClient.isLoading = false;
        state.updateClient.error = action.payload as string;
      });

    // Delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.deleteClient.isLoading = true;
        state.deleteClient.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.deleteClient.isLoading = false;
        state.clients = state.clients.filter(client => client._id !== action.payload.clientId);
        if (state.selectedClient && state.selectedClient._id === action.payload.clientId) {
          state.selectedClient = null;
        }
        state.deleteClient.error = null;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleteClient.isLoading = false;
        state.deleteClient.error = action.payload as string;
      });
  },
});

export const { clearSelectedClient, clearError, clearAllErrors } = clientSlice.actions;
export default clientSlice.reducer;


