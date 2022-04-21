import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER_API_URL, USER_API_URL } from "../../constants";

const initialState = {
  isLoading: false,
  users: [],
  user: {},
  orders: [],
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

export const getOrders = createAsyncThunk("user/getOrders", async (userId) => {
  try {
    const res = await axios.get(ORDER_API_URL, { params: { userId } });
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  try {
    const res = await axios.get(`${USER_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const updateUser = createAsyncThunk("user/update", async (newUser) => {
  try {
    const res = await axios.patch(`${USER_API_URL}/${newUser.id}`, newUser);
    return res.data;
  } catch (error) {
    return error;
  }
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
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
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;
