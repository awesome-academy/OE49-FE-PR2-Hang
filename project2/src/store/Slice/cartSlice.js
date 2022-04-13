import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage } from "../../utils";

const cart = getDataFromLocalStorage("cart");

const initialState = {
  products: cart ? cart.products : [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { products } = state;
      const productIndex = products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        products[productIndex].quantity += 1;
      } else {
        products.push({ ...action.payload, quantity: 1 });
      }
    },

    updateQuantity: (state, action) => {
      const { products } = state;
      const { id, quantity } = action.payload;
      const productIndex = products.findIndex((item) => item.id === id);

      products[productIndex].quantity = quantity;
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },

    deleteAllProduct: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, updateQuantity, deleteProduct, deleteAllProduct } =
  cartReducer.actions;
  
export default cartReducer.reducer;
