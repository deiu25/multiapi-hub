import { useEffect, useState } from 'react';
import TenderCard from '../components/Tenders/TenderCard';
import Spinner from '../components/Spinner';

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const API_BASE_URL = import.meta.env.PROD
    ? "https://worker-for-tenders-romania.d3iu25.workers.dev"
    : "/api/ro/tenders";

  const fetchTenders = (currentPage) => {
    setLoading(true);
    fetch(`${API_BASE_URL}?page=${currentPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Serviciul este momentan indiponibil: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedTenders = data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTenders(sortedTenders);
        setPageCount(data.page_count);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTenders(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < pageCount) setPage(page + 1);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="p-4 max-w-6xl mx-auto text-red-600">
        Eroare: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center mt-12">Tenders List</h1>
      <h3 className="text-xl font-bold text-center mb-10">The list displays tenders from an API that supplies data from 2021.</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tenders.map(tender => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Pagina {page} din {pageCount}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === pageCount}
          className={`px-4 py-2 rounded ${page === pageCount
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tenders;
