import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-400 wrapper">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Payment Successful!
        </h1>
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
        </div>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Thank you for your purchase. Your payment has been processed
          successfully. An email confirmation has been sent to your registered
          email address.
        </p>
        <div className="text-center">
          <Link
            href="/generate-tracking"
            className="inline-block bg-[#2A254B] hover:bg-[#1A152B] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
          >
            Generate Tracking Number
          </Link>
        </div>
      </div>
    </div>
  );
}