import React from "react";

const NewsletterSignup = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-[#2A254B] sm:text-3xl">
          Join the club and get the benefits
        </h2>
        <p className="mt-2 text-sm text-[#2A254B] sm:text-base">
          Sign up for our newsletter and receive exclusive offers on new <br />{" "}
          ranges, sales, pop-up stores, and more.
        </p>
      </div>

      <form className="flex flex-col items-center w-full max-w-lg mt-6 sm:flex-row">
        <input
          type="email"
          placeholder="your@email.com"
          className="p-4 bg-[#F9F9F9] w-full md:w-[354px] h-[56px] outline-none mb-4 md:mb-0"
        />
        <button
          type="submit"
          className="p-2 bg-[#2A254B] text-white w-full md:w-[118px] h-[56px]"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
