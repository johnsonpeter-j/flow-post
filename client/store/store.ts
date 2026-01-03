import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import clientReducer from './client/clientSlice';
import briefsReducer from './briefs/briefsSlice';
import tasksReducer from './tasks/tasksSlice';
import appReducer from './app/appSlice';
import departmentReducer from './department/departmentSlice';
import userReducer from './user/userSlice';
import contentBriefReducer from './contentBrief/contentBriefSlice';
import ideaBankReducer from './ideaBank/ideaBankSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    briefs: briefsReducer,
    tasks: tasksReducer,
    app: appReducer,
    department: departmentReducer,
    user: userReducer,
    contentBrief: contentBriefReducer,
    ideaBank: ideaBankReducer,
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

