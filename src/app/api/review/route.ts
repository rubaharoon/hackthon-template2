import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Import a UUID generator
import { Review } from "../../../../type";

export async function POST(request: Request) {
  const { productId, review } = (await request.json()) as {
    productId: string;
    review: Review;
  };

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
    if (!client) {
      return NextResponse.json(
        { message: "Internal Server Error: Sanity configuration issue" },
        { status: 500 }
      );
    }

    const newReview = {
      ...review,
      _key: uuidv4(), // Add a unique key
      date: new Date().toISOString(),
    };

    await client
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .append("reviews", [newReview])
      .commit({ token: process.env.SANITY_WRITE_TOKEN });

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Sanity API Error: ${error instanceof Error ? error.message : error}` },
      { status: 500 }
    );
  }
}
