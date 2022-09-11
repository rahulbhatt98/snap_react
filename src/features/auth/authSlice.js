import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
  registerApi,
  otpVerify,
  otpResend,
  forgetPassApi,
  changePassApi,
  getUserList,
  getLatestUsers,
} from "./authApi";
import {
  addUsers,
  updateUsers,
  searchUsers,
  getUserStatus,
  getNotifications,
  updateNotifications,
  getLoginUserStatus,
} from "./userAuthApi";
import {
  addRetailer,
  getRetailersList,
  searchRetailers,
  updateRetailers,
} from "./retailerAuthApi";
const initialState = {
  user: null,
  status: "idle",
  // isLoading: false,
  otp: null,
  userList: null,
  latestUsersList: null,
  retailersList: null,
  notificationsList: null,
  loginStatus: null,
};

//user-login
export const loginAsync = createAsyncThunk("auth/login", async (data) => {
  const response = await loginApi(data.postData);
  if (response?.data?.success == "1") {
    data.history.push("/dashboard");
  }

  return response.data;
});

//user-register
export const registerAsync = createAsyncThunk("auth/register", async (data) => {
  const response = await registerApi(data.postData);
  if (response?.data?.success == "1") {
    data.history.push("/otp/1");
  }
  return response.data;
});

//get-otp-verified
export const otpVerified = createAsyncThunk("auth/otpverify", async (data) => {
  const response = await otpVerify(data.postData);
  if (response?.data?.success == "1" && data.otpId == 1) {
    data.history.push("/login");
  }
  if (response?.data?.success == "1" && data.otpId == 2) {
    data.history.push("/lock-screen");
  }
  return response.data;
});

//resend-otp
export const otpResending = createAsyncThunk("auth/otpresend", async (data) => {
  const response = await otpResend(data.postData);
  return response.data;
});

//forget-password
export const ForgetPassAsync = createAsyncThunk("auth/forget", async (data) => {
  const response = await forgetPassApi(data.postData);
  if (response?.data?.success == "1") {
    data.history.push("/otp/2");
  }
  return response.data;
});

//change-password
export const changePassAsync = createAsyncThunk("", async (data) => {
  const response = await changePassApi(data.postData);
  if (response?.data?.success == "1") {
    data.history.push("/login");
  }
  return response.data;
});

//get-latest-users-dashboard

export const getLatestUsersAsync = createAsyncThunk(
  "latestUsersList",
  async (data) => {
    const response = await getLatestUsers(data);
    return response.data;
  }
);

//get-user-list
export const getUserListAsync = createAsyncThunk("userList", async (data) => {
  const response = await getUserList(data);
  return response.data;
});

//get-user-status
export const getUserStatusAsync = createAsyncThunk(
  "userStatusList",
  async (data) => {
    const response = await getUserStatus(data.postData, data.authToken);
    return response.data;
  }
);

//get-login-user-sttaus

export const getLoginUserStatusAsync = createAsyncThunk(
  "loginStatus",
  async (data) => {
    const response = await getLoginUserStatus(data.postData, data.authToken);
    if (
      response?.data?.user_data?.active == 0 ||
      response?.data?.user_data?.active == 2
    ) {
      data.history.push("/login");
    }
    return response.data;
  }
);

//add-retailers
export const addRetailerAsync = createAsyncThunk(
  "auth/addretailer",
  async (data) => {
    const response = await addRetailer(data.postData, data.authToken);
    if (response?.data?.success == "1") {
      data.history.push("/view-all-retailers");
    }
    return response.data;
  }
);

//get-retailers-listing
export const getRetailersListAsync = createAsyncThunk(
  "retailersList",
  async (data) => {
    const response = await getRetailersList(data);
    return response.data;
  }
);

//add-users
export const addUsersAsync = createAsyncThunk("auth/addUsers", async (data) => {
  const response = await addUsers(data.postData, data.authToken);
  if (response?.data?.success == "1") {
    data.history.push("/view-all-users");
  }
  return response.data;
});

//update-users

export const updateUsersAsync = createAsyncThunk(
  "auth/updateUsers",
  async (data) => {
    const response = await updateUsers(data.postData, data.authToken);
    if (response?.data?.success == "1") {
      data.history.push("/view-all-users");
    }
    return response.data;
  }
);

//update-retailers
export const updateRetailersAsync = createAsyncThunk(
  "auth/updateRetailers",
  async (data) => {
    const response = await updateRetailers(data.postData, data.authToken);
    return response.data;
  }
);
//search-retaiers
export const searchRetailersAsync = createAsyncThunk(
  "auth/searchretailers",
  async (data) => {
    const response = await searchRetailers(data.postData, data.authToken);
    return response.data;
  }
);

//search-users

export const searchUsersAsync = createAsyncThunk(
  "auth/searchusers",
  async (data) => {
    const response = await searchUsers(data.postData, data.authToken);
    return response.data;
  }
);

//get-notifications-async
export const getNotificationsAsync = createAsyncThunk(
  "notificationsList",
  async (data) => {
    const response = await getNotifications(data);
    return response.data;
  }
);

//update-notifications-status

export const updateNotificationsAsync = createAsyncThunk(
  "auth/notifications",
  async (data) => {
    const response = await updateNotifications(data.postData, data.authToken);
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = null;
      state.status = "idle";
      state.userList = null;
      state.latestUsersList = null;
      state.retailersList = null;
      state.notificationsList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(otpVerified.pending, (state) => {
        state.status = "loading";
      })
      .addCase(otpVerified.fulfilled, (state, action) => {
        state.status = "idle";
        state.otp = action.payload;
      })
      .addCase(otpResending.pending, (state) => {
        state.status = "loading";
      })
      .addCase(otpResending.fulfilled, (state, action) => {
        state.status = "idle";
        state.otp = action.payload;
      })
      .addCase(ForgetPassAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ForgetPassAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })

      .addCase(changePassAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })

      .addCase(getLatestUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLatestUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.latestUsersList = action.payload;
      })
      .addCase(getUserListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userList = action.payload;
      })
      .addCase(getUserStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserStatusAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.userList = action.payload;
      })

      .addCase(addRetailerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRetailerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.retailersList = action.payload;
      })

      .addCase(addUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userList = action.payload;
      })
      .addCase(updateUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userList = action.payload;
      })

      .addCase(updateRetailersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRetailersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.retailersList = action.payload;
      })

      .addCase(searchRetailersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchRetailersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.retailersList = action.payload;
      })
      .addCase(searchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userList = action.payload;
      })

      .addCase(getRetailersListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRetailersListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.retailersList = action.payload;
      })
      .addCase(getNotificationsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotificationsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.notificationsList = action.payload;
      })
      .addCase(updateNotificationsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNotificationsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.notificationsList = action.payload;
      })
      .addCase(getLoginUserStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoginUserStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loginStatus = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;

export const selectAuth = (state) => state.auth.user;
// export const status = (state) => state.auth.status;
export const userList = (state) => state.auth.userList;
export const retailersList = (state) => state.auth.retailersList;
export const latestUsersList = (state) => state.auth.latestUsersList;
export const notificationsList = (state) => state.auth.notificationsList;
export const loginStatus = (state) => state.auth.loginStatus;

export default authSlice.reducer;
