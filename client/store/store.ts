import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import clientReducer from './client/clientSlice';
import briefsReducer from './briefs/briefsSlice';
import contentReducer from './content/contentSlice';
import tasksReducer from './tasks/tasksSlice';
import appReducer from './app/appSlice';
import departmentReducer from './department/departmentSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    briefs: briefsReducer,
    content: contentReducer,
    tasks: tasksReducer,
    app: appReducer,
    department: departmentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

