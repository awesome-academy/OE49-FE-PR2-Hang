import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_URL } from "../../constants";

const initialState = {
  isLoading: false,
  users: []
};

export const signup = createAsyncThunk("user/signup", async (user) => {
  try {
    const response = await axios.post(USER_API_URL, user);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getAllUsers = createAsyncThunk("user/get", async () => {
  try {
    const res = await axios.get(USER_API_URL);
    return res.data;
  } catch (error) {
    return error;
  }
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userReducer.reducer;
