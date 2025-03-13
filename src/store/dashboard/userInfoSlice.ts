import { APIRequestResponse } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  [key: string]: any;
};

export interface UserState {
  loading: boolean;
  auth_user: User | null;
  user: User | null;
  user_role: string | null;
  user_permissions: string[] | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  auth_user: null,
  user: null,
  user_role: null,
  user_permissions: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.auth_user = action.payload?.auth_user;
      state.user = action.payload?.user;
      state.user_role = action.payload?.user_role;
      state.user_permissions = action.payload?.user_permissions;
    });
  },
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<APIRequestResponse>("/api/app/user");
      const auth_user = res?.data?.data?.authUser;
      const user = res?.data?.data?.user;
      const user_role = user?.roles?.role;
      const user_permissions = user?.roles?.role_permissions?.map(
        (role: any) => role?.permissions?.permission
      );

      return {
        auth_user,
        user,
        user_role,
        user_permissions,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
