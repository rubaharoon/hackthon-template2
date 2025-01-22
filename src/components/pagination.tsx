import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@carbon/icons-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

const Pagination = ({ currentPage, totalPages, paginate, goToPreviousPage, goToNextPage }: PaginationProps) => (
  <div className="flex justify-center items-center mt-8 space-x-2">
    <motion.button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center ${
        currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
      whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
    >
      <ChevronLeft size={16} className="mr-2" />
      Previous
    </motion.button>

    {Array.from({ length: totalPages }).map((_, index) => (
      <motion.button
        key={index}
        onClick={() => paginate(index + 1)}
        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
          currentPage === index + 1 ? "bg-[#2A254B] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {index + 1}
      </motion.button>
    ))}

    <motion.button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center ${
        currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
      whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
    >
      Next
      <ChevronRight size={16} className="ml-2" />
    </motion.button>
  </div>
);

export default Pagination;