'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isResetting, setIsResetting] = useState(false);
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    console.error(error);
    // Generate a unique error ID (e.g., UUID or timestamp)
    setErrorId(Date.now().toString());
  }, [error]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await reset();
    } catch (err) {
      console.error('Failed to reset:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-700 mb-6">
          We apologize for the inconvenience. Please try again or contact support if the issue
          persists.
        </p>

        {/* Error details for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-left bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="text-sm text-gray-600">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Error ID for support */}
        {errorId && (
          <p className="text-sm text-gray-600 mb-6">
            <strong>Error ID:</strong> {errorId}
          </p>
        )}

        {/* Try again button */}
        <button
          onClick={handleReset}
          disabled={isResetting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isResetting ? 'Resetting...' : 'Try again'}
        </button>

        {/* Go home button */}
        <Link
          href="/"
          className="w-full block text-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 mb-4"
        >
          Go Home
        </Link>

        {/* Contact support button */}
        <a
          href="mailto:support@example.com"
          className="w-full block text-center bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}