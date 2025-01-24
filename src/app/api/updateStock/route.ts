import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    // Validate input
    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 }
      );
    }

    // Fetch the product from Sanity
    const product = await client.fetch(
      `*[_type == "product" && _id == $productId][0]`,
      { productId }
    );

    // If the product is not found, return a 404 error
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Calculate the new stock quantity
    const newStock = product.stock - quantity;

    // Check if stock is sufficient
    if (newStock < 0) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Determine if the product is still in stock after the update
    const inStock = newStock > 0;

    // Log the update
    console.log(`Updating stock for product ${productId}: ${product.stock} -> ${newStock}`);

    // Update the stock and inStock fields in Sanity
    await client
      .patch(productId)
      .set({ 
        stock: newStock,
        inStock: inStock
      })
      .commit();

    return NextResponse.json({ success: true, newStock, inStock });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}