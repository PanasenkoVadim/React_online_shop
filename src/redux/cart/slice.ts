import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageCart } from "../../utils/getLocalStorageCart";
import { CartItemType, CartSliceState } from "./types";

const initialState: CartSliceState = {
  cartItems: getLocalStorageCart().cartItems || [],
  totalPrice: getLocalStorageCart().totalPrice || 0,
  totalQuantity: getLocalStorageCart().totalQuantity || 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItemType>) => {
      const alreadyInCart = state.cartItems.find((item) => {
        return (
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
        );
      });
      if (alreadyInCart) {
        alreadyInCart.quantity += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
        state.cartItems = state.cartItems.sort(
          (a, b) => Number(a.id) - Number(b.id)
        );
        state.totalPrice += action.payload.price * action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
      }
    },
    deleteCartItem: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.id !== action.payload.id ||
          Number(item.selectedSize) !== Number(action.payload.selectedSize)
      );
      state.totalQuantity -= action.payload.quantity;
      state.totalPrice -= action.payload.quantity * action.payload.price;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    changeQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        selectedSize: number;
        method: "dicrement" | "increment";
      }>
    ) => {
      const item = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (!item) return;

      switch (action.payload.method) {
        case "dicrement":
          if (item.quantity === 0) return;
          item.quantity--;
          state.totalQuantity--;
          state.totalPrice -= item.price;
          break;
        case "increment":
          item.quantity++;
          state.totalQuantity++;
          state.totalPrice += item.price;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartItem, deleteCartItem, clearCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
