"use client";
import React from "react";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import store from "./cart/store"; // Ensure lowercase consistency for file naming

// Define the props interface
interface ProvidersProps {
  children: React.ReactNode;
}

// Error fallback component with retry option
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="p-4 bg-red-100 border border-red-400 rounded-md text-red-700">
    <h2 className="text-lg font-semibold">Something went wrong:</h2>
    <p>{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Try again
    </button>
  </div>
);

function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Custom logic (if needed) to reset error state
          console.log("Resetting error boundary...");
        }}
      >
        {children}
      </ErrorBoundary>
    </Provider>
  );
}

export default Providers;
