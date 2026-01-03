import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepartmentState, Department } from './departmentTypes';
import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } from './departmentThunk';

const initialState: DepartmentState = {
  departments: [],
  selectedDepartment: null,
  getDepartments: {
    isLoading: false,
    error: null,
  },
  getDepartment: {
    isLoading: false,
    error: null,
  },
  createDepartment: {
    isLoading: false,
    error: null,
  },
  updateDepartment: {
    isLoading: false,
    error: null,
  },
  deleteDepartment: {
    isLoading: false,
    error: null,
  },
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearSelectedDepartment: (state) => {
      state.selectedDepartment = null;
    },
    clearError: (state, action: PayloadAction<'getDepartments' | 'getDepartment' | 'createDepartment' | 'updateDepartment' | 'deleteDepartment'>) => {
      if (action.payload === 'getDepartments') {
        state.getDepartments.error = null;
      } else if (action.payload === 'getDepartment') {
        state.getDepartment.error = null;
      } else if (action.payload === 'createDepartment') {
        state.createDepartment.error = null;
      } else if (action.payload === 'updateDepartment') {
        state.updateDepartment.error = null;
      } else if (action.payload === 'deleteDepartment') {
        state.deleteDepartment.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.getDepartments.error = null;
      state.getDepartment.error = null;
      state.createDepartment.error = null;
      state.updateDepartment.error = null;
      state.deleteDepartment.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all departments
    builder
      .addCase(getDepartments.pending, (state) => {
        state.getDepartments.isLoading = true;
        state.getDepartments.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.getDepartments.isLoading = false;
        state.departments = action.payload.data || [];
        state.getDepartments.error = null;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.getDepartments.isLoading = false;
        state.getDepartments.error = action.payload as string;
      });

    // Get single department
    builder
      .addCase(getDepartment.pending, (state) => {
        state.getDepartment.isLoading = true;
        state.getDepartment.error = null;
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.getDepartment.isLoading = false;
        state.selectedDepartment = action.payload.data;
        state.getDepartment.error = null;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.getDepartment.isLoading = false;
        state.getDepartment.error = action.payload as string;
        state.selectedDepartment = null;
      });

    // Create department
    builder
      .addCase(createDepartment.pending, (state) => {
        state.createDepartment.isLoading = true;
        state.createDepartment.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.createDepartment.isLoading = false;
        state.departments.unshift(action.payload.data);
        state.createDepartment.error = null;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.createDepartment.isLoading = false;
        state.createDepartment.error = action.payload as string;
      });

    // Update department
    builder
      .addCase(updateDepartment.pending, (state) => {
        state.updateDepartment.isLoading = true;
        state.updateDepartment.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.updateDepartment.isLoading = false;
        const updatedDepartment = action.payload.data;
        const index = state.departments.findIndex(dept => dept._id === updatedDepartment._id);
        if (index !== -1) {
          state.departments[index] = updatedDepartment;
        }
        if (state.selectedDepartment && state.selectedDepartment._id === updatedDepartment._id) {
          state.selectedDepartment = updatedDepartment;
        }
        state.updateDepartment.error = null;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.updateDepartment.isLoading = false;
        state.updateDepartment.error = action.payload as string;
      });

    // Delete department
    builder
      .addCase(deleteDepartment.pending, (state) => {
        state.deleteDepartment.isLoading = true;
        state.deleteDepartment.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.deleteDepartment.isLoading = false;
        state.departments = state.departments.filter(dept => dept._id !== action.payload.departmentId);
        if (state.selectedDepartment && state.selectedDepartment._id === action.payload.departmentId) {
          state.selectedDepartment = null;
        }
        state.deleteDepartment.error = null;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.deleteDepartment.isLoading = false;
        state.deleteDepartment.error = action.payload as string;
      });
  },
});

export const { clearSelectedDepartment, clearError, clearAllErrors } = departmentSlice.actions;
export default departmentSlice.reducer;

