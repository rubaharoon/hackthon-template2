import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;