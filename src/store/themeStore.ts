import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

export const themeStore = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type ThemeRootState = ReturnType<typeof themeStore.getState>;
export type ThemeAppDispatch = typeof themeStore.dispatch; 