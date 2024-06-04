import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "BUYER" | "SELLER" | "ADMIN";

interface AuthState {
  userId: number | null;
  role: UserRole | null;
  token: string | null;
}

const initialState: AuthState = {
  userId: null,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ userId: number; role: UserRole; token: string }>,
    ) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectRole = (state: { auth: AuthState }) => state.auth.role;

export default authSlice.reducer;
