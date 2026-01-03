import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';
import { CreateUserData, UpdateUserData } from './userTypes';

// Get all users async thunk
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch users'
      );
    }
  }
);

// Get single user async thunk
export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch user'
      );
    }
  }
);

// Create user async thunk
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: CreateUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to create user'
      );
    }
  }
);

// Update user async thunk
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }: { userId: string; userData: UpdateUserData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to update user'
      );
    }
  }
);

// Delete user async thunk
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      return { userId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete user'
      );
    }
  }
);

