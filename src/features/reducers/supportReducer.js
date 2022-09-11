import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTickets } from "../auth/supportApi";
const initialState = {
  user: null,
  status: "idle",
  supportData:null,
};

//get-listing-seach-adds
export const getTicketsListing = createAsyncThunk(
  "supportData",
  async (data) => {
    const response = await getTickets();
    return response.data;
  }
);

export const support = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.supportData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicketsListing.fulfilled, (state, action) => {
        state.status = "idle";
        state.supportData = action.payload;
      });
  },
});

export const supportData = (state) => state.support.supportData;

export default support.reducer;
