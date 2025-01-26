import React from "react";
import {
  Delivery,
  CheckmarkOutline,
  Purchase,
  Sprout,
} from "@carbon/icons-react";

const features = [
  {
    icon: <Delivery />,
    title: "Next day as standard",
    description:
      "Order before 3pm and get your order the next day as standard.",
  },
  {
    icon: <CheckmarkOutline />,
    title: "Made by true artisans",
    description:
      "Handmade crafted goods made with real passion and craftsmanship.",
  },
  {
    icon: <Purchase />,
    title: "Unbeatable prices",
    description:
      "For our materials and quality, you won’t find better prices anywhere.",
  },
  {
    icon: <Sprout />,
    title: "Recycled packaging",
    description:
      "We use 100% recycled packaging to ensure our footprint is manageable.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8 text-[#2A254B]">
          What makes our brand different
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-gray-800">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#2A254B]">
                {feature.title}
              </h3>
              <p className="text-sm text-[#2A254B]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;