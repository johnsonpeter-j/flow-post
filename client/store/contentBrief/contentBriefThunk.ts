import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';
import { CreateContentBriefData, UpdateContentBriefData } from './contentBriefTypes';

// Get all content briefs async thunk
export const getContentBriefs = createAsyncThunk(
  'contentBrief/getContentBriefs',
  async (clientId: string | undefined, { rejectWithValue }) => {
    try {
      const url = clientId ? `/content-briefs?clientId=${clientId}` : '/content-briefs';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch content briefs'
      );
    }
  }
);

// Get single content brief async thunk
export const getContentBrief = createAsyncThunk(
  'contentBrief/getContentBrief',
  async (contentBriefId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content-briefs/${contentBriefId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch content brief'
      );
    }
  }
);

// Create content brief async thunk
export const createContentBrief = createAsyncThunk(
  'contentBrief/createContentBrief',
  async (contentBriefData: CreateContentBriefData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/content-briefs', contentBriefData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to create content brief'
      );
    }
  }
);

// Update content brief async thunk
export const updateContentBrief = createAsyncThunk(
  'contentBrief/updateContentBrief',
  async ({ contentBriefId, contentBriefData }: { contentBriefId: string; contentBriefData: UpdateContentBriefData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/content-briefs/${contentBriefId}`, contentBriefData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to update content brief'
      );
    }
  }
);

// Delete content brief async thunk
export const deleteContentBrief = createAsyncThunk(
  'contentBrief/deleteContentBrief',
  async (contentBriefId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/content-briefs/${contentBriefId}`);
      return { contentBriefId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete content brief'
      );
    }
  }
);

