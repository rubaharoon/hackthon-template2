import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Ensure this is correct
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Ensure this is correct
  apiVersion: "2025-01-20", // Use the latest API version
  useCdn: false, // Disable CDN for writes
  token: process.env.SANITY_API_TOKEN, // Ensure this token has write permissions
});