import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    loading: true,
  },
  reducers: {
    Showloading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { Showloading, HideLoading } = alertSlice.actions;
export default alertSlice.reducer;
