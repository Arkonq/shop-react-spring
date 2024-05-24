import { createSlice } from "@reduxjs/toolkit";

interface AppState {}

const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
