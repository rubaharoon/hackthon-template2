import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for a wishlist item
interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Define the initial state of the wishlist
interface WishlistState {
  items: ReadonlyArray<WishlistItem>;
}

const initialState: WishlistState = {
  items: [],
};

// Helper function to find an item by ID
const findItemById = (items: WishlistItem[], itemId: string) =>
  items.find((item) => item._id === itemId);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add an item to the wishlist if it doesn't already exist
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;
      const existingItem = findItemById(state.items, item._id);

      if (!existingItem) {
        state.items.push(item);
      } else {
        console.warn("Item already exists in the wishlist.");
      }
    },

    // Remove an item from the wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;