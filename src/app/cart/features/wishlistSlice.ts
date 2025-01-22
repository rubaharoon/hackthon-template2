// features/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (!existingItem) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;