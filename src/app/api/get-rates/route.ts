import { shipengine } from "@/lib/shipengine";
import { Address, Package } from "../../../../type";
import { NextRequest } from "next/server";

// Validate address helper function
const isValidAddress = (address: Address) => {
  return (
    address &&
    address.addressLine1 &&
    address.cityLocality &&
    address.stateProvince &&
    address.postalCode &&
    address.countryCode
  );
};

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const {
      shipeToAddress,
      packages,
    }: { shipeToAddress: Address; packages: Package[] } = await req.json();

    if (
      !isValidAddress(shipeToAddress) ||
      !packages ||
      !Array.isArray(packages) ||
      packages.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing required fields" }),
        { status: 400 }
      );
    }

    // Validate carrier IDs
    const carrierIds = [
      process.env.SHIPENGINE_FIRST_COURIER,
      process.env.SHIPENGINE_SECOND_COURIER,
      process.env.SHIPENGINE_THIRD_COURIER,
      process.env.SHIPENGINE_FOURTH_COURIER,
    ].filter((id): id is string => Boolean(id));

    if (carrierIds.length === 0) {
      console.error("No carrier IDs found in environment variables.");
      return new Response(
        JSON.stringify({ error: "Internal Server Error: Missing carrier IDs" }),
        { status: 500 }
      );
    }

    // Define ship-from address using environment variables
    const shipFromAddress: Address = {
      name: process.env.SHIP_FROM_NAME || "Ruba Haroon",
      phone: process.env.SHIP_FROM_PHONE || "+92 3323577700",
      addressLine1: process.env.SHIP_FROM_ADDRESS_LINE1 || "456 Oak Avenue",
      addressLine2: process.env.SHIP_FROM_ADDRESS_LINE2 || "Suite 200",
      cityLocality: process.env.SHIP_FROM_CITY || "Los Angeles",
      stateProvince: process.env.SHIP_FROM_STATE || "CA",
      postalCode: process.env.SHIP_FROM_POSTAL_CODE || "90001",
      countryCode: process.env.SHIP_FROM_COUNTRY_CODE || "US",
      addressResidentialIndicator: "no",
    };

    // Fetch shipping rates from ShipEngine
    const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: shipFromAddress,
        packages: packages,
      },
      rateOptions: {
        carrierIds: carrierIds,
      },
    });

    console.log("Ship To Address:", shipeToAddress);
    console.log("Packages:", packages);
    console.log("Shipment Details:", shipmentDetails);

    return new Response(
      JSON.stringify({ shipeToAddress, packages, shipmentDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching shipping rates:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}