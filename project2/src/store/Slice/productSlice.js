import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_API_URL } from "../../constants";

const initialState = {
  isLoading: false,
  products: [],
  categories: [],
  brands: [],
  totalCount: 0,
  filter: {
    _page: 1,
    _limit: 12,
    _sort: "",
    _order: "",
    title_like: "",
    category_like: "",
    brand_like: [],
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

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios(PRODUCT_API_URL);
    const categories = [
      ...new Set(response.data.map((product) => product.category)),
    ];
    return { categories };
  }
);

export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await axios(PRODUCT_API_URL);
    const brands = [...new Set(response.data.map((product) => product.brand))];
    return { brands };
  }
);

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.filter._page = action.payload;
    },

    setCategory: (state, action) => {
      state.filter.category_like = action.payload;
    },

    setBrand: (state, action) => {
      state.filter.brand_like.push(action.payload);
    },

    unsetBrand: (state, action) => {
      state.filter.brand_like = state.filter.brand_like.filter(
        (item) => item !== action.payload
      );
    },

    setPrice: (state, action) => {
      const { inputMin, inputMax } = action.payload;
      state.filter.price_gte = inputMin || 0;
      state.filter.price_lte = inputMax || Infinity;
    },

    setRating: (state, action) => {
      state.filter.rating_gte = action.payload;
    },

    searchProducts: (state, action) => {
      state.filter.title_like = action.payload;
    },

    sortProducts: (state, action) => {
      const {sort, order} = action.payload;
      state.filter._sort = sort;
      state.filter._order = order;
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
      })

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const { categories } = action.payload;
        state.isLoading = false;
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        const { brands } = action.payload;
        state.isLoading = false;
        state.brands = brands;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setPagination,
  setCategory,
  setBrand,
  unsetBrand,
  setPrice,
  setRating,
  searchProducts,
  sortProducts,
} = productReducer.actions;
export default productReducer.reducer;
