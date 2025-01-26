import { shipengine } from "@/lib/shipengine";
import { NextRequest, NextResponse } from "next/server";

// Error handling helper function
const handleError = (error: unknown) => {
  console.error("Error creating label:", error);
  return NextResponse.json(
    { error: "An error occurred while creating the label" },
    { status: 500 }
  );
};

// Validate rateId function
const isValidRateId = (rateId: string) => /^[a-zA-Z0-9-_]+$/.test(rateId);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Validate ShipEngine instance
    if (!shipengine) {
      console.error("ShipEngine instance is not configured.");
      return NextResponse.json(
        { error: "Internal Server Error: ShipEngine configuration issue" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const { rateId } = await req.json();

    if (!rateId || !isValidRateId(rateId)) {
      return NextResponse.json(
        { error: "Invalid or missing rateId" },
        { status: 400 }
      );
    }

    // Create label using ShipEngine
    const label = await shipengine.createLabelFromRate({
      rateId,
    });

    // Validate the response
    if (!label || !label.trackingNumber) {
      return NextResponse.json(
        { error: "Label creation failed: Missing tracking number" },
        { status: 500 }
      );
    }

    console.log("Label created successfully:", label);

    return NextResponse.json(label, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("ShipEngine API Error:", error.message);
      return NextResponse.json(
        { error: `ShipEngine API Error: ${error.message}` },
        { status: 500 }
      );
    }
    return handleError(error);
  }
}
