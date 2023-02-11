import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        data
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message ?? "");
      return rejectWithValue(
        error?.response?.data?.message ?? error.message ?? ""
      ); // rejectedWithValue is used to return a rejected response with a payload
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.patch(
        `/user/${state?.auth?.id}`,
        data
      );
      toast.success("Profile updated successfully");
      return response?.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong, please try again later"
      );
      return rejectWithValue(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong, please try again later"
      );
    }
  }
);

export const updateProfilePassword = createAsyncThunk(
  "auth/updateProfilePassword",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.patch(
        `/user/${state?.auth?.id}`,
        data
      );
      toast.success("Password has been successfully changed");
      return response?.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong, please try again later"
      );
      return rejectWithValue(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong, please try again later"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    token: "",
    faceId: "",
    userId: "",
    name: "",
    email: "",
    university: "",
    userRole: "",
    isVerified: false,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Actions
    resetState: (state) => {
      state.id = "";
      state.token = "";
      state.faceId = "";
      state.userId = "";
      state.name = "";
      state.email = "";
      state.university = "";
      state.userRole = "";
      state.isVerified = false;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    userLogin: (state, action) => {
      state.id = action?.payload?.id;
      state.token = action?.payload?.token;
      state.userId = action?.payload?.userId;
      state.name = action?.payload?.name;
      state.email = action?.payload?.email;
      state.university = action?.payload?.university;
      state.userRole = action?.payload?.userRole;
      state.isVerified = action?.payload?.isVerified;
      state.isLoggedIn = true;
      state.error = null;
      toast.success("You have been successfully logged in");
      localStorage?.setItem("id", action?.payload?.id);
      localStorage.setItem("token", action?.payload?.token);
      localStorage.setItem("userRole", action?.payload?.userRole);
      localStorage.setItem("isVerified", action?.payload?.isVerified);
    },
    userSignup: (state, action) => {
      state.id = action?.payload?.id;
      state.token = action?.payload?.token;
      state.userId = action?.payload?.userId;
      state.name = action?.payload?.name;
      state.email = action?.payload?.email;
      state.university = action?.payload?.university;
      state.userRole = action?.payload?.userRole;
      state.isVerified = false;
      state.isLoggedIn = true;
      state.error = null;
      toast.success("You have been successfully registered");
      localStorage?.setItem("id", action?.payload?.id);
      localStorage.setItem("token", action?.payload?.token);
      localStorage.setItem("userRole", action?.payload?.userRole);
      localStorage.setItem("isVerified", action?.payload?.isVerified);
    },
    userEmailVerification: (state, action) => {
      state.isVerified = action.payload.isVerified;
    },
    logout: (state) => {
      state.id = "";
      state.token = "";
      state.userId = "";
      state.name = "";
      state.email = "";
      state.university = "";
      state.userRole = "";
      state.isVerified = false;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      toast.success("You have been logged out");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    //.addCase(Function_Name.PromiseState, (state, action))=> { state logic here })
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.id = action?.payload?.id;
        state.token = action?.payload?.token;
        state.userId = action?.payload?.userId;
        state.name = action?.payload?.name;
        state.email = action?.payload?.email;
        state.university = action?.payload?.university;
        state.userRole = action?.payload?.userRole;
        state.isVerified = action?.payload?.isVerified;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action?.payload?.id;
        state.token = action?.payload?.token;
        state.userId = action?.payload?.userId;
        state.name = action?.payload?.name;
        state.email = action?.payload?.email;
        state.university = action?.payload?.university;
        state.userRole = action?.payload?.userRole;
        state.isVerified = action?.payload?.isVerified;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfilePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators generated for each case reducer function
export const {
  resetState,
  logout,
  userLogin,
  userSignup,
  userEmailVerification,
} = authSlice.actions;

// Exporting default reducer
export default authSlice.reducer;
