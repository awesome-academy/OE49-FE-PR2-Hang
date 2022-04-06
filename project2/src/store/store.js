import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice"

const store = configureStore({
  reducer: {
    productReducer,
  },
});

export default store;
