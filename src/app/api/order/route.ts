import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Error handling helper function
const handleError = (error: unknown) => {
  console.error("Error saving order:", error);
  return NextResponse.json(
    { success: false, error: "Failed to save order" },
    { status: 500 }
  );
};

export async function POST(request: Request) {
  try {
    // Validate Sanity client
    if (!client) {
      console.error("Sanity client is not configured.");
      return NextResponse.json(
        { success: false, error: "Internal Server Error: Sanity configuration issue" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const orderData = await request.json();

    if (
      !orderData ||
      typeof orderData !== "object" ||
      !orderData.items ||
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    // Create a new order document in Sanity
    const result = await client.create(orderData);

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Sanity API Error:", error.message);
      return NextResponse.json(
        { success: false, error: `Sanity API Error: ${error.message}` },
        { status: 500 }
      );
    }
    return handleError(error);
  }
}