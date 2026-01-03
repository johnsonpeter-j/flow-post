import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';
import { CreateIdeaBankData, UpdateIdeaBankData } from './ideaBankTypes';

// Get all idea bank items async thunk
export const getIdeaBankItems = createAsyncThunk(
  'ideaBank/getIdeaBankItems',
  async (clientId: string | undefined, { rejectWithValue }) => {
    try {
      const url = clientId ? `/idea-bank?clientId=${clientId}` : '/idea-bank';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch idea bank items'
      );
    }
  }
);

// Get single idea bank item async thunk
export const getIdeaBankItem = createAsyncThunk(
  'ideaBank/getIdeaBankItem',
  async (ideaBankItemId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/idea-bank/${ideaBankItemId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch idea bank item'
      );
    }
  }
);

// Create idea bank item async thunk
export const createIdeaBankItem = createAsyncThunk(
  'ideaBank/createIdeaBankItem',
  async (ideaBankData: CreateIdeaBankData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/idea-bank', ideaBankData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to create idea bank item'
      );
    }
  }
);

// Update idea bank item async thunk
export const updateIdeaBankItem = createAsyncThunk(
  'ideaBank/updateIdeaBankItem',
  async ({ ideaBankItemId, ideaBankData }: { ideaBankItemId: string; ideaBankData: UpdateIdeaBankData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/idea-bank/${ideaBankItemId}`, ideaBankData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to update idea bank item'
      );
    }
  }
);

// Delete idea bank item async thunk
export const deleteIdeaBankItem = createAsyncThunk(
  'ideaBank/deleteIdeaBankItem',
  async (ideaBankItemId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/idea-bank/${ideaBankItemId}`);
      return { ideaBankItemId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete idea bank item'
      );
    }
  }
);

