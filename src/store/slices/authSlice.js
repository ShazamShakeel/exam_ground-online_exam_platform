import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        data
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        data
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.patch(
        `/users/${state?.auth?.id}/me`,
        data
      );
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateProfileImg = createAsyncThunk(
  "auth/updateProfileImg",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axiosInstance.post(
        `/users/${state?.auth?.id}/me/updateProfileImage`,
        data
      );
      toast.success("Profile image updated successfully");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { getState, rejectWithValue }) => {
    try {
      const userId = getState()?.auth?.id;
      const response = await axiosInstance.patch(`/auth/change-password`, {
        userId,
        password: data.password,
      });
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/verify-email`, data);
      toast.success("Email has been successfully verified");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong, please try again later";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const setAuthState = (state, action) => {
  state.token = action?.payload?.tokens?.access?.token;
  state.id = action?.payload?.user?.id;
  state.universityId = action?.payload?.user?.universityId;
  state.name = action?.payload?.user?.name;
  state.email = action?.payload?.user?.email;
  state.university = action?.payload?.user?.university;
  state.userRole = action?.payload?.user?.role;
  state.isVerified = action?.payload?.user?.isEmailVerified;
  state.profileImg = action?.payload?.user?.profileImg;
  state.facialId = action?.payload?.user?.facialId ?? "";
  state.isLoggedIn = true;
  state.loading = false;
  state.error = "";
  localStorage?.setItem("id", action?.payload?.user?.id);
  localStorage.setItem("token", action?.payload?.tokens?.access?.token);
  localStorage.setItem("userRole", action?.payload?.user?.role);
  localStorage.setItem("isVerified", action?.payload?.user?.isEmailVerified);
};

const initialState = {
  id: "",
  token: "",
  facialId: "",
  universityId: "",
  name: "",
  email: "",
  university: "",
  userRole: "",
  isVerified: false,
  profileImg: "",
  isLoggedIn: false,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
    userEmailVerification: (state, action) => {
      toast.success("Email has been successfully verified");
      localStorage.setItem("isVerified", action.payload.isVerified);
      state.isVerified = action.payload.isVerified;
    },
    logout: () => {
      localStorage.clear();
      toast.success("You have been logged out");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        setAuthState(state, action);
        toast.success("You have been successfully registered");
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        setAuthState(state, action);
        toast.success("You have been successfully logged in");
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
        state.name = action?.payload?.name;
        state.facialId = action?.payload?.facialId ?? "";
        state.loading = false;
        state.error = "";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileImg.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfileImg.fulfilled, (state, action) => {
        state.profileImg = action?.payload?.profileImg;
        state.loading = false;
        state.error = "";
      })
      .addCase(updateProfileImg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.isVerified = true;
        localStorage.setItem("isVerified", true);
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators generated for each case reducer function
export const { resetState, logout, userLogin, userEmailVerification } =
  authSlice.actions;

// Exporting default reducer
export default authSlice.reducer;
