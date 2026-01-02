import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';

// Signup async thunk
export const signup = createAsyncThunk(
    'auth/signup',
    async (credentials: { name: string; email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/signup', credentials);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || error.message || 'Signup failed'
        );
      }
    }
  );
  
  // Signin async thunk
  export const signin = createAsyncThunk(
    'auth/signin',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/signin', credentials);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || error.message || 'Signin failed'
        );
      }
    }
  );
  
  // Forgot password async thunk
  export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/forgot-password', { email });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || error.message || 'Failed to send reset email'
        );
      }
    }
  );
  
  // Reset password async thunk
  export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (
      { password, confirmPassword, token }: { password: string; confirmPassword: string; token: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.post(
          '/auth/reset-password',
          { password, confirmPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || error.message || 'Failed to reset password'
        );
      }
    }
  );

  // Verify token async thunk
  export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/auth/verify');
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || error.message || 'Token verification failed'
        );
      }
    }
  );