import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for dimensions
interface Dimensions {
  height?: string;
  width?: string;
  depth?: string;
}

// Define an interface for a cart item
interface CartItem {
  _id: string;
  dimensions: Dimensions;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  price_id: string;
}

// Define the initial state of the cart
interface CartState {
  items: ReadonlyArray<CartItem>;
}

const initialState: CartState = {
  items: [],
};

// Helper function to find an item by ID
const findItemById = (items: CartItem[], itemId: string) =>
  items.find((item) => item._id === itemId);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart or update its quantity if it already exists
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { quantity } = action.payload;
      const existingItem = findItemById(state.items, action.payload._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // Increase the quantity of an item in the cart
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = findItemById(state.items, itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    // Decrease the quantity of an item in the cart or remove it if the quantity is 1
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = findItemById(state.items, itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity <= 1) {
        state.items = state.items.filter((item) => item._id !== itemId);
      }
    },

    // Remove an item from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions and reducer
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;