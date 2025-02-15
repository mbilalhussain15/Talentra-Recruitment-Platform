import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full  hover:bg-[#E7F0FA] ${
          currentPage === 1 ? "text-[#99C2FF]" : "text-[#0A65CC]"
        }`}
      >
        <IoIosArrowBack size={20} />
      </button>

      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => setCurrentPage(idx + 1)}
          className={`w-10 h-10 flex items-center text-sm justify-center rounded-full  font-medium ${
            currentPage === idx + 1
              ? "bg-[#0A65CC] text-white"
              : " text-[#5E6670] hover:bg-[#F1F2F4]"
          }`}
        >
          {`0${idx + 1}`}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#E7F0FA] ${
          currentPage === totalPages ? "text-[#99C2FF]" : "text-[#0A65CC]"
        }`}
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default Pagination;
