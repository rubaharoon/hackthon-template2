import { NextResponse } from "next/server";
import Stripe from "stripe";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  price_id: string;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe secret key is missing.");
    return NextResponse.json(
      { error: "Internal Server Error: Missing Stripe API key" },
      { status: 500 }
    );
  }

  try {
    const { cartItems }: { cartItems: CartItem[] } = await request.json();

    if (
      !cartItems ||
      !Array.isArray(cartItems) ||
      cartItems.some(
        (item) =>
          !item.price_id ||
          typeof item.quantity !== "number" ||
          item.quantity <= 0
      )
    ) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 }
      );
    }

    const successUrl =
      process.env.STRIPE_SUCCESS_URL || "https://hackthon-template2-six.vercel.app/success";
    const cancelUrl =
      process.env.STRIPE_CANCEL_URL || "https://hackthon-template2-six.vercel.app/cancel";

    if (!isValidUrl(successUrl) || !isValidUrl(cancelUrl)) {
      return NextResponse.json(
        { error: "Invalid success or cancel URL" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price: item.price_id,
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const message =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
