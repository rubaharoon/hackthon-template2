"use client";

import localFont from "next/font/local";
import "./globals.css"; // Ensure this includes all necessary global styles
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "../app/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Handle search functionality
const handleSearch = (query: string) => {
  console.log("Search query:", query);
  // Implement search logic here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Preloading critical resources */}
          <link
            rel="preload"
            href="/_next/static/css/app/layout.css?v=1737914317507"
            as="style"
          />
         
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            {/* Header with search functionality */}
            <Header onSearch={handleSearch} />

            {/* Main content */}
            {children}
            <script src="//code.tidio.co/4ptzadmzkpcuccs9qfkhuyqvupdauu1r.js" async></script>

            {/* Toast notifications */}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              aria-live="polite"
            />

            {/* Footer */}
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
