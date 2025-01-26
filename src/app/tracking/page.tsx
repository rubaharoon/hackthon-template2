"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { TrackingData } from "@../../../type";

const TrackingDetails = ({ trackingData }: { trackingData: TrackingData }) => (
  <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-[#2A254B]">
    <h2 className="text-2xl font-bold mb-4">Tracking Details</h2>
    <div className="space-y-4">
      <p>
        <span className="font-semibold">Tracking Number:</span>{" "}
        {trackingData.trackingNumber}
      </p>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        {trackingData.statusDescription}
      </p>
      <p>
        <span className="font-semibold">Carrier Status:</span>{" "}
        {trackingData.carrierStatusDescription || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Estimated Delivery:</span>{" "}
        {trackingData.estimatedDeliveryDate || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Actual Delivery:</span>{" "}
        {trackingData.actualDeliveryDate || "N/A"}
      </p>
    </div>
  </div>
);

function TrackShipment() {
  const [labelId, setLabelId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || "";

  const handleSubmit = useCallback(
    async (labelId: string) => {
      if (!labelId) {
        setError("Label ID is required.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        router.replace(`/tracking?labelId=${labelId}`);
        const response = await axios.get(`/api/tracking/${labelId}`);
        setTrackingData(response.data);
      } catch (err) {
        console.error("Error tracking shipment:", err);
        setError(
          "Failed to track shipment. Please check the label ID and try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      handleSubmit(queryLabelId);
    }
  }, [queryLabelId, handleSubmit]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-[#252B42] wrapper">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Track Your Shipment
        </h1>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(labelId);
          }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col space-y-4">
            <label htmlFor="labelId" className="text-lg font-medium">
              Enter Label ID or Tracking Number:
            </label>
            <input
              type="text"
              id="labelId"
              value={labelId}
              onChange={(e) => setLabelId(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B] focus:border-transparent"
              placeholder="Enter label ID"
              required
              aria-label="Enter label ID or tracking number"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#23A6F0] text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors disabled:bg-green-300"
            >
              {loading ? "Tracking..." : "Track Shipment"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
            <button
              onClick={() => handleSubmit(labelId)}
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Tracking Details */}
        {trackingData && <TrackingDetails trackingData={trackingData} />}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackShipment />
    </Suspense>
  );
}