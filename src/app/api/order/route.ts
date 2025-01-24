import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Create a new order document in Sanity
    const result = await client.create(orderData);

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}