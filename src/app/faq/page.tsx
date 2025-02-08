"use client";
import React, { useState } from "react";

const faqData = [
  {
    question: "What types of furniture do you offer?",
    answer:
      "We offer an extensive range of furniture including living room sets, bedroom collections, dining room pieces, and outdoor furniture. Every piece is selected for its design, durability, and style.",
  },
  {
    question: "Do you provide custom furniture solutions?",
    answer:
      "Absolutely. Our design team specializes in creating custom furniture solutions tailored to your space and style preferences. Contact us to discuss your requirements.",
  },
  {
    question: "What materials are used in your furniture?",
    answer:
      "Our furniture is crafted using high-quality materials such as solid wood, premium metals, tempered glass, and luxurious upholstery. This ensures both longevity and elegance.",
  },
  {
    question: "How should I care for my furniture?",
    answer:
      "To maintain your furniture's appearance and durability, we recommend regular dusting, using appropriate cleaning products, and avoiding prolonged exposure to direct sunlight.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on most items. Please review our detailed return policy on our website for conditions and procedures.",
  },
  {
    question: "Do you offer delivery and installation services?",
    answer:
      "Yes, we provide professional delivery and installation services to ensure your furniture is set up perfectly in your home.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <button
        className="w-full flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-800">{question}</h2>
        <span className="text-2xl text-gray-600">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function Faq() {
  return (
    <div className="px-4 md:px-8 mx-auto max-w-screen-xl py-12">
      <h1 className="text-center font-bold text-4xl mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-center mb-12 text-gray-500 text-lg">
        Got questions about our furniture collections? We’ve got the answers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
