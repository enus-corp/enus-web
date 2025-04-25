import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';       
import themeReducer from './slices/themeSlice';

export const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootAppState = ReturnType<typeof appStore.getState>;
export type RootAppDispatch = typeof appStore.dispatch; 