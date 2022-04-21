import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER_API_URL } from "../../constants";

const initialState = {
  isLoading: false,
  orders: [],
};

export const getAllOrders = createAsyncThunk("user/getOrders", async () => {
  try {
    const res = await axios.get(ORDER_API_URL);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const updateStatusOrder = createAsyncThunk(
  "admin/updateStatus",
  async (order) => {
    try {
      const { id, status } = order;
      const res = await axios.patch(`${ORDER_API_URL}/${id}`, {
        status: status,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStatusOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(updateStatusOrder.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminReducer.reducer;
