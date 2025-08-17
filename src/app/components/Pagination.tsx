"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationPropsInterface {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationPropsInterface> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-end  mt-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage == 1}
              className="p-2 rounded-md text-green-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md text-green-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Pagination;
