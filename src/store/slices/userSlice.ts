import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '@/types/user';

interface UserState {
  user: UserDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer; 