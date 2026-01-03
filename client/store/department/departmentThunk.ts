import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/lib/axios';
import { CreateDepartmentData, UpdateDepartmentData } from './departmentTypes';

// Get all departments async thunk
export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/departments');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch departments'
      );
    }
  }
);

// Get single department async thunk
export const getDepartment = createAsyncThunk(
  'department/getDepartment',
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/departments/${departmentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch department'
      );
    }
  }
);

// Create department async thunk
export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (departmentData: CreateDepartmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/departments', departmentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to create department'
      );
    }
  }
);

// Update department async thunk
export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async ({ departmentId, departmentData }: { departmentId: string; departmentData: UpdateDepartmentData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/departments/${departmentId}`, departmentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to update department'
      );
    }
  }
);

// Delete department async thunk
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/departments/${departmentId}`);
      return { departmentId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete department'
      );
    }
  }
);

