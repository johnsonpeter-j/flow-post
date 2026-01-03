import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User } from './userTypes';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './userThunk';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  getUsers: {
    isLoading: false,
    error: null,
  },
  getUser: {
    isLoading: false,
    error: null,
  },
  createUser: {
    isLoading: false,
    error: null,
  },
  updateUser: {
    isLoading: false,
    error: null,
  },
  deleteUser: {
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state, action: PayloadAction<'getUsers' | 'getUser' | 'createUser' | 'updateUser' | 'deleteUser'>) => {
      if (action.payload === 'getUsers') {
        state.getUsers.error = null;
      } else if (action.payload === 'getUser') {
        state.getUser.error = null;
      } else if (action.payload === 'createUser') {
        state.createUser.error = null;
      } else if (action.payload === 'updateUser') {
        state.updateUser.error = null;
      } else if (action.payload === 'deleteUser') {
        state.deleteUser.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.getUsers.error = null;
      state.getUser.error = null;
      state.createUser.error = null;
      state.updateUser.error = null;
      state.deleteUser.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all users
    builder
      .addCase(getUsers.pending, (state) => {
        state.getUsers.isLoading = true;
        state.getUsers.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getUsers.isLoading = false;
        state.users = action.payload.data || [];
        state.getUsers.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getUsers.isLoading = false;
        state.getUsers.error = action.payload as string;
      });

    // Get single user
    builder
      .addCase(getUser.pending, (state) => {
        state.getUser.isLoading = true;
        state.getUser.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUser.isLoading = false;
        state.selectedUser = action.payload.data;
        state.getUser.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.error = action.payload as string;
        state.selectedUser = null;
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.createUser.isLoading = true;
        state.createUser.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUser.isLoading = false;
        state.users.unshift(action.payload.data);
        state.createUser.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUser.isLoading = false;
        state.createUser.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUser.isLoading = true;
        state.updateUser.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUser.isLoading = false;
        const updatedUser = action.payload.data;
        const index = state.users.findIndex(user => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
        state.updateUser.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUser.isLoading = false;
        state.updateUser.error = action.payload as string;
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleteUser.isLoading = true;
        state.deleteUser.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUser.isLoading = false;
        state.users = state.users.filter(user => user._id !== action.payload.userId);
        if (state.selectedUser && state.selectedUser._id === action.payload.userId) {
          state.selectedUser = null;
        }
        state.deleteUser.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUser.isLoading = false;
        state.deleteUser.error = action.payload as string;
      });
  },
});

export const { clearSelectedUser, clearError, clearAllErrors } = userSlice.actions;
export default userSlice.reducer;


