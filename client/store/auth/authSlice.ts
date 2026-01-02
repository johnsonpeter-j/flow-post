import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './authTypes';
import { forgotPassword, resetPassword, signin, signup, verifyToken } from './authThunk';

const initialState: AuthState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  signin: {
    isLoading: false,
    error: null,
  },
  signup: {
    isLoading: false,
    error: null,
  },
  forgotPassword: {
    isLoading: false,
    error: null,
  },
  resetPassword: {
    isLoading: false,
    error: null,
  },
  verifyToken: {
    isLoading: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.signin.error = null;
      state.signup.error = null;
      state.forgotPassword.error = null;
      state.resetPassword.error = null;
      state.verifyToken.error = null;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    clearError: (state, action: PayloadAction<'signin' | 'signup' | 'forgotPassword' | 'resetPassword' | 'verifyToken'>) => {
      if (action.payload === 'signin') {
        state.signin.error = null;
      } else if (action.payload === 'signup') {
        state.signup.error = null;
      } else if (action.payload === 'forgotPassword') {
        state.forgotPassword.error = null;
      } else if (action.payload === 'resetPassword') {
        state.resetPassword.error = null;
      } else if (action.payload === 'verifyToken') {
        state.verifyToken.error = null;
      }
    },
    clearAllErrors: (state) => {
      state.signin.error = null;
      state.signup.error = null;
      state.forgotPassword.error = null;
      state.resetPassword.error = null;
      state.verifyToken.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.signup.isLoading = true;
        state.signup.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.signup.error = null;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload.data.token);
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup.isLoading = false;
        state.signup.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Signin
    builder
      .addCase(signin.pending, (state) => {
        state.signin.isLoading = true;
        state.signin.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.signin.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.signin.error = null;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload.data.token);
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.signin.isLoading = false;
        state.signin.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.isLoading = true;
        state.forgotPassword.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPassword.isLoading = false;
        state.forgotPassword.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.isLoading = false;
        state.forgotPassword.error = action.payload as string;
      });

    // Reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.isLoading = true;
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.error = action.payload as string;
      });

    // Verify token
    builder
      .addCase(verifyToken.pending, (state) => {
        state.verifyToken.isLoading = true;
        state.verifyToken.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.verifyToken.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        state.verifyToken.error = null;
        
        // Update user in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.verifyToken.isLoading = false;
        state.verifyToken.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        
        // Clear localStorage on token verification failure
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      });
  },
});

export const { logout, clearError, clearAllErrors, setCredentials } = authSlice.actions;
export default authSlice.reducer;

