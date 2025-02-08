"use client";
import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Return Policy
          </h1>
          <p className="text-center text-gray-600 mb-10">
            We are committed to your satisfaction. Please review our return policy below.
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* 1. Eligibility for Returns */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Eligibility for Returns
              </h2>
              <p className="mt-2">
                We accept returns on most products within 30 days of delivery. To be eligible for a
                return, your item must be unused, in the same condition as received, and in its
                original packaging.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Return requests must be made within 30 days of delivery.</li>
                <li>The item must be unused and in original condition.</li>
                <li>All original packaging, tags, and documentation must be included.</li>
              </ul>
            </div>

            {/* 2. Non-Returnable Items */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                2. Non-Returnable Items
              </h2>
              <p className="mt-2">
                Certain items are not eligible for return, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Custom or personalized orders.</li>
                <li>Clearance or final sale items.</li>
                <li>Items showing signs of wear or damage caused by the customer.</li>
              </ul>
            </div>

            {/* 3. How to Initiate a Return */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                3. How to Initiate a Return
              </h2>
              <p className="mt-2">
                To begin your return, please follow these steps:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>
                  Contact our Customer Support team at{" "}
                  <a
                    href="mailto:rubaharoon80@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    rubaharoon80@gmail.com
                  </a>{" "}
                  or call <strong>(123) 456-7890</strong> to request a Return Merchandise
                  Authorization (RMA) number.
                </li>
                <li>
                  Once approved, you will receive detailed instructions on how to return your item.
                </li>
                <li>
                  Package the item securely, including all original packaging and documentation, and
                  clearly mark the RMA number on the package.
                </li>
                <li>
                  Ship the package using a trackable shipping service to ensure safe return.
                </li>
              </ol>
            </div>

            {/* 4. Refunds and Exchanges */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Refunds and Exchanges
              </h2>
              <p className="mt-2">
                After your return is received and inspected, we will notify you regarding the
                approval of your refund:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  If approved, a refund will be processed and credited to your original payment
                  method within 7-10 business days.
                </li>
                <li>
                  For exchanges, please return the original item and place a new order for the
                  desired item.
                </li>
              </ul>
            </div>

            {/* 5. Shipping Costs */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                5. Shipping Costs
              </h2>
              <p className="mt-2">
                Please note that shipping costs are non-refundable. If a refund is issued, the cost
                of return shipping will be deducted from your refund amount.
              </p>
            </div>

            {/* 6. Further Questions */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                6. Further Questions
              </h2>
              <p className="mt-2">
                If you have any questions or need further assistance, please feel free to contact
                our support team at{" "}
                <a
                  href="mailto:rubaharoon80@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  rubaharoon80@gmail.com
                </a>{" "}
                or call <strong>(123) 456-7890</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
