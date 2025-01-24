import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Use the correct Stripe API version
});

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  price_id: string; // Ensure this matches the Stripe Price ID
}

export async function POST(request: Request) {
  try {
    const { cartItems }: { cartItems: CartItem[]; customerEmail: string } = await request.json();

    // Validate input
    if (!cartItems || !Array.isArray(cartItems)) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 }
      );
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price: item.price_id, // Use the Stripe Price ID directly
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/shoppingcart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}