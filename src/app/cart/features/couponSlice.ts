import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/sanity/lib/client"; // Import your Sanity client

// Define the CouponState interface
interface Coupon {
  code: string;
  discountType: string;
  discountValue: number;
  expirationDate: string;
  minimumPurchase: number;
  applicableProducts: string[];
}

interface CouponState {
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  discountAmount: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CouponState = {
  coupons: [],
  appliedCoupon: null,
  discountAmount: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching coupons
export const fetchCoupons = createAsyncThunk("coupon/fetchCoupons", async () => {
  const coupons = await client.fetch(`*[_type == "coupon"]{
    code,
    discountType,
    discountValue,
    expirationDate,
    minimumPurchase,
    "applicableProducts": applicableProducts[]->_id
  }`);
  return coupons;
});

// Create slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const coupon = state.coupons.find(c => c.code === action.payload);

      if (coupon) {
        state.appliedCoupon = coupon;
        state.discountAmount = coupon.discountValue;
        state.error = null; // Reset error if coupon is valid
      } else {
        state.appliedCoupon = null;
        state.discountAmount = 0;
        state.error = "You are not eligible for this coupon."; // ✅ Set error message
      }
    },
  },
  extraReducers: (builder) => {  // ✅ Correct usage of extraReducers
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coupons";
      });
  },
});

// Export actions and reducer
export const { applyCoupon } = couponSlice.actions;
export default couponSlice.reducer;

