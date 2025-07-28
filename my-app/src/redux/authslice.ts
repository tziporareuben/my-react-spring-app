
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  name: string;
  phone:string;
  role: number; // 1 = admin, 2 = רגיל
  password:string
}

interface AuthState {
  token: string | null;
  user: User | null;
  selectedUser: User | null; // ✅ חדש
}


const initialState: AuthState = {
  token: null,
  user: null,
  selectedUser: null, // ✅ חדש
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
setSelectedUser: (state, action: PayloadAction<User>) => {
  state.selectedUser = action.payload;
}



  },
});


export const { setToken, setUser, logout, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
