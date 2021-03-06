import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
import cartReducer from "./Slice/cartSlice";
import userReducer from "./Slice/userSlice";

const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cartReducer));
});

export default store;
