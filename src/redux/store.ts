import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/slice";
import goodsReducer from "./goods/slice";
import cartReducer from "./cart/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    goods: goodsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
