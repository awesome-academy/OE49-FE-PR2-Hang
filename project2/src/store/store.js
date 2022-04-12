import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice"
import userReducer from "./Slice/userSlice"

const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
  },
});

export default store;
