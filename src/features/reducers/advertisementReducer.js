import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdvertisementListing,
  addAdvertisements,
  getAdvertisementStatus,
  updateAdvertisements
} from "../auth/advertisementsApi";
const initialState = {
  user: null,
  status: "idle",
};

//get-listing-seach-adds
export const getAdvertisementListAsync = createAsyncThunk(
  "advertisementData",
  async (data) => {
    const response = await getAdvertisementListing(
      data.postData,
      data.authToken
    );
    return response.data;
  }
);

//delete-advertisements

export const getAdvertisementStatusAsync = createAsyncThunk(
  "advertisementStatus",
  async (data) => {
    const response = await getAdvertisementStatus(
      data.postData,
      data.authToken
    );
    return response.data;
  }
);
//add-advertisements
export const addAdvertisementsAsync = createAsyncThunk(
  "auth/addAdvertisements",
  async (data) => {
    const response = await addAdvertisements(data.postData, data.authToken);
    if (response?.data?.success == "1") {
      data.history.push("/view-all-advertisment");
    }
    return response.data;
  }
);

//update-advertisements
export const updateAdvertisementsAsync = createAsyncThunk(
  "auth/updateAdvertisements",
  async (data) => {
    const response = await updateAdvertisements(data.postData, data.authToken);
    if (response?.data?.success == "1") {
      data.history.push("/view-all-advertisment");
    }
    return response.data;
  }
);


export const advertisement = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.advertisementData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertisementListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdvertisementListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.advertisementData = action.payload;
      })
      .addCase(addAdvertisementsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAdvertisementsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.advertisementData = action.payload;
      })
      .addCase(getAdvertisementStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdvertisementStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.advertisementData = action.payload;
      })
      .addCase(updateAdvertisementsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdvertisementsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.advertisementData = action.payload;
      })
      
      
      
      ;
  },
});

export const advertisementData = (state) =>
  state.advertisement.advertisementData;

export default advertisement.reducer;
