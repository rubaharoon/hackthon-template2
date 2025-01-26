import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { Review } from "../../../../type";

// Error handling helper function
const handleError = (error: unknown) => {
  console.error("Error submitting review:", error);
  return NextResponse.json(
    { message: "Failed to submit review." },
    { status: 500 }
  );
};

export async function POST(request: Request) {
  // Parse and validate request body
  const { productId, review } = (await request.json()) as {
    productId: string;
    review: Review;
  };

  console.log("Received Review Data:", { productId, review }); // Debugging

  if (
    !productId ||
    typeof productId !== "string" ||
    !review ||
    typeof review !== "object" ||
    !review.rating ||
    !review.comment
  ) {
    return NextResponse.json(
      { message: "Invalid productId or review data" },
      { status: 400 }
    );
  }

  try {
    // Validate Sanity client
    if (!client) {
      console.error("Sanity client is not configured.");
      return NextResponse.json(
        { message: "Internal Server Error: Sanity configuration issue" },
        { status: 500 }
      );
    }

    // Create a new review object with a timestamp
    const newReview = {
      ...review,
      date: new Date().toISOString(),
    };

    // Update the product document in Sanity with the new review
    await client
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .append("reviews", [newReview])
      .commit({ token: process.env.SANITY_WRITE_TOKEN });

    console.log("Review submitted successfully:", newReview); // Debugging

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Sanity API Error:", error.message);
      return NextResponse.json(
        { message: `Sanity API Error: ${error.message}` },
        { status: 500 }
      );
    }
    return handleError(error);
  }
}