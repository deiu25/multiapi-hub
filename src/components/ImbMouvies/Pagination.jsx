const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 hover:bg-blue-600"
        >
          Previous
        </button>
  
        <span className="text-white text-lg font-semibold">
          Page{" "}
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const page = Math.min(Math.max(Number(e.target.value), 1), totalPages);
              onPageChange(page);
            }}
            className="w-16 text-center bg-gray-800 text-white rounded-lg border border-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />{" "}
          of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  