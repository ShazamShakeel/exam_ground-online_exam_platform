import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        data
      );
      toast.success("You have been successfully logged in");
      localStorage.setItem("token", response?.data?.tokens?.access?.token);
      localStorage?.setItem("id", response?.data?.user?.id);
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
  "updateProfile",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.patch(
        `/users/${state?.auth?.id}`,
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
  "updateProfilePassword",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.put(
        `/users/${state?.auth?.id}`,
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    token: "",
    fullName: "",
    userRole: "",
    isLoggedIn: false,
    data: {
      user: {},
      tokens: {
        access: {},
        refresh: {},
      },
    },
    error: "",
  },
  reducers: {
    // Actions
    resetState: (state) => {
      state.id = "";
      state.token = "";
      state.fullName = "";
      state.userRole = "";
      state.isLoggedIn = false;
      state.data = {
        user: {},
        tokens: {
          access: {},
          refresh: {},
        },
      };
      state.error = "";
    },
    logout: (state) => {
      state.id = "";
      state.token = "";
      state.fullName = "";
      state.userRole = "";
      state.isLoggedIn = false;
      state.data = {
        user: {},
        tokens: {
          access: {},
          refresh: {},
        },
      };
      state.error = "";
      toast.success("You have been logged out");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    //.addCase(Function_Name.PromiseState, (state, action))=> { state logic here })
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.id = action?.payload?.user?.id;
        state.token = action?.payload?.tokens?.access.token;
        state.fullName = action?.payload?.user?.fullname;
        state.userRole = action?.payload?.user?.role;
        state.data = action?.payload;
        state.error = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.fullName = action?.payload?.fullname;
        state.data.user = action?.payload;
        state.error = "";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfilePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updateProfilePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators generated for each case reducer function
export const { resetState, logout } = userSlice.actions;

// Exporting default reducer
export default userSlice.reducer;
