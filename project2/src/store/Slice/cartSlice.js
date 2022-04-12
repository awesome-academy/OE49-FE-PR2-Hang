import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  products: cart ? cart.products : [],
  total: cart ? cart.total : 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.total += 1;
      const { products } = state;
      const productIndex = products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        products[productIndex].quantity += 1;
      } else {
        products.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;
