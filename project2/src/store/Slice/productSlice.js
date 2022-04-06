import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_API_URL } from "../../constants";

const initialState = {
  isLoading: false,
  products: [],
  totalCount: 0,
  filter: {
    _page: 1,
    _limit: 12,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filter) => {
    const response = await axios(PRODUCT_API_URL, { params: filter });
    const data = response.data;
    const totalCount = response.headers["x-total-count"];
    return { data, totalCount };
  }
);

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.filter._page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, totalCount } = action.payload;
        state.isLoading = false;
        state.products = data;
        state.totalCount = totalCount;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPagination } = productReducer.actions;
export default productReducer.reducer;
