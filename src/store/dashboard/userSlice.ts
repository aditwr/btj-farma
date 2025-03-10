import { APIRequestResponse } from '@/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = {
    [key: string]: any;
}

export interface UserState {
    loading: boolean;
    user: User | null;
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User}>) => {
            state.user = action.payload.user;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<APIRequestResponse>) => {
              state.loading = false;
              if (action.payload.success) {
                state.user = action.payload.data || null;
                sessionStorage.setItem(
                  "user",
                  JSON.stringify(action.payload.data)
                );
                state.error = null;
              } else {
                state.user = null;
                state.error = action.payload.message || "Failed to fetch user";
              }
            }
          )
          .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || "Something went wrong";
          });
    },
});

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<APIRequestResponse>('/api/app/user');
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    })

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;