import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Profile {
  name: string;
  avatar: string;
  id: string;
}

interface ProfileState {
  profile: Profile[];
  isLoading: boolean;
}

const initialState: ProfileState = {
  profile: [],
  isLoading: false,
};

export const __getProfile = createAsyncThunk("profile/get", async () => {
  const data = await axios.get(
    "https://62a09c0fa9866630f8134879.mockapi.io/profile"
  );
  return data.data;
});

export const __postProfile = createAsyncThunk(
  "profile/post",
  async (data: Profile) => {
    const res = await axios.post(
      "https://62a09c0fa9866630f8134879.mockapi.io/profile",
      data
    );
    return res.data;
  }
);

export const __delProfile = createAsyncThunk(
  "profile/delete",
  async (id: string) => {
    await axios.delete(
      `https://62a09c0fa9866630f8134879.mockapi.io/profile/${id}`
    );
    return id;
  }
);

const profileSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__getProfile.fulfilled, (state, action) => {
      if (state.isLoading) {
        state.profile = action.payload;
      }
    });
    builder.addCase(__postProfile.fulfilled, (state, action) => {
      state.profile.push(action.payload);
    });
    builder.addCase(__delProfile.fulfilled, (state, action) => {
      const newList = state.profile.filter((x) => x.id !== action.payload);
      state.profile = newList;
    });
  },
});

export default profileSlice.reducer;
