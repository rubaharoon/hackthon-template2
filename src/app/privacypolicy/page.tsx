"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Your privacy is important to us. Please review the details of our policy below.
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* 1. Introduction */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Introduction
              </h2>
              <p className="mt-2">
                This Privacy Policy outlines how we collect, use, and protect your personal
                information when you visit our website or make a purchase from us. By using our
                services, you agree to the terms of this policy.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                2. Information We Collect
              </h2>
              <p className="mt-2">
                We may collect personal information such as your name, email address, shipping
                address, billing information, and other details you provide. We also gather data
                about your device, IP address, and browsing behavior to improve our services.
              </p>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To process orders and manage your account.</li>
                <li>To communicate with you about updates, promotions, and offers.</li>
                <li>To analyze website usage and enhance user experience.</li>
                <li>To comply with legal obligations and protect against fraud.</li>
              </ul>
            </div>

            {/* 4. Cookies and Tracking Technologies */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="mt-2">
                We use cookies, web beacons, and similar technologies to enhance your browsing
                experience and collect information about how you use our site. You can control
                cookies through your browser settings, but disabling them may limit certain features.
              </p>
            </div>

            {/* 5. Data Retention */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                5. Data Retention
              </h2>
              <p className="mt-2">
                We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this policy, unless a longer retention period is required or
                permitted by law.
              </p>
            </div>

            {/* 6. Data Security */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                6. Data Security
              </h2>
              <p className="mt-2">
                We take reasonable measures to protect your personal information from unauthorized
                access, disclosure, alteration, or destruction. However, no online transmission is
                ever completely secure.
              </p>
            </div>

            {/* 7. Third-Party Services */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                7. Third-Party Services
              </h2>
              <p className="mt-2">
                We may employ third-party companies to facilitate our services, perform
                service-related tasks, or assist in analyzing how our services are used. These
                third-party services have access to your personal information only to perform tasks
                on our behalf.
              </p>
            </div>

            {/* 8. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                8. Children&apos;s Privacy
              </h2>
              <p className="mt-2">
                Our website is not intended for individuals under the age of 13. We do not knowingly
                collect personal information from children. If you believe a child has provided us
                with personal information, please contact us immediately.
              </p>
            </div>

            {/* 9. Changes to This Policy */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                9. Changes to This Policy
              </h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. Any changes will be effective
                immediately upon posting the revised policy. We encourage you to review this page
                periodically.
              </p>
            </div>

            {/* 10. Contact Us */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                10. Contact Us
              </h2>
              <p className="mt-2">
                If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
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
