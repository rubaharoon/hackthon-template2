"use client"; // Add this directive for client-side interactivity

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

// Define the validation schema using Zod
const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormData = z.infer<typeof schema>;

const NewsletterSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    // Log the submitted email (optional)
    console.log("Email submitted:", data.email);

    // Show a success toast
    toast.success("Thank you for signing up! When we have offers, we'll send you an email.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-lg mt-6 sm:flex-row"
      >
        <div className="w-full md:w-[354px] relative">
          <input
            type="email"
            placeholder="your@email.com"
            className={`p-4 bg-[#F9F9F9] w-full h-[56px] outline-none mb-4 md:mb-0 ${
              errors.email ? "border border-red-500" : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-0 text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="p-2 bg-[#2A254B] text-white w-full md:w-[118px] h-[56px] hover:bg-[#3a345b] transition-colors duration-200"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;