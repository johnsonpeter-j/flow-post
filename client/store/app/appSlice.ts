import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './appTypes';
import type { Client } from '@/components/clients/types';

const initialState: AppState = {
  clients: [],
  departments: [],
  team: [],
  selectedClientId: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.clients.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((c) => c.id !== action.payload);
      if (state.selectedClientId === action.payload) {
        state.selectedClientId = null;
      }
    },
    setSelectedClientId: (state, action: PayloadAction<string | null>) => {
      state.selectedClientId = action.payload;
    },
  },
});

export const { setClients, addClient, updateClient, deleteClient, setSelectedClientId } = appSlice.actions;
export default appSlice.reducer;

