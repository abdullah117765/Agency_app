// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={handlePrev}
        className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-lg transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-lg transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
