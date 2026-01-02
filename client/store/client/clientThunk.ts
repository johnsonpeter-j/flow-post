import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';
import { CreateClientData, UpdateClientData } from './clientTypes';

// Get all clients async thunk
export const getClients = createAsyncThunk(
  'client/getClients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/clients');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch clients'
      );
    }
  }
);

// Get single client async thunk
export const getClient = createAsyncThunk(
  'client/getClient',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/clients/${clientId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch client'
      );
    }
  }
);

// Create client async thunk
export const createClient = createAsyncThunk(
  'client/createClient',
  async (clientData: CreateClientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/clients', clientData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to create client'
      );
    }
  }
);

// Update client async thunk
export const updateClient = createAsyncThunk(
  'client/updateClient',
  async ({ clientId, clientData }: { clientId: string; clientData: UpdateClientData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/clients/${clientId}`, clientData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to update client'
      );
    }
  }
);

// Delete client async thunk
export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/clients/${clientId}`);
      return { clientId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete client'
      );
    }
  }
);

