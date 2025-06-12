import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  indexOfFirstUrl,
  indexOfLastUrl,
  filteredUrls,
  paginate,
  setCurrentPage,
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 mb-10 flex items-center justify-between">
      {/* mobile view */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      {/* desktop view */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstUrl + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastUrl, filteredUrls.length)}</span> of{" "}
            <span className="font-medium">{filteredUrls.length}</span> results
          </p>
        </div>
        <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (value, i) => (value = i + 1)).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === number
                  ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
