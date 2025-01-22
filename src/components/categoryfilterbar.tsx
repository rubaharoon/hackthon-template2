import { ChevronDown, ChevronUp } from "@carbon/icons-react";
import { useState } from "react";

interface CategoryFilterBarProps {
  categories: { _id: string; name: string }[];
  selectedCategories: string[];
  handleCategoryChange: (categoryId: string) => void;
}

const CategoryFilterBar = ({ categories, selectedCategories, handleCategoryChange }: CategoryFilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 space-x-1 cursor-pointer px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-300"
      >
        <span>Category</span>
        {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border z-10 w-48">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryChange(category._id)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedCategories.includes(category._id) ? "bg-gray-200" : ""
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterBar;