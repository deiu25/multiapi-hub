import { useEffect, useState } from "react";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};

const useFetchMovies = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    fetch(url, API_OPTIONS)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setData(data.results || []);
          if (data.total_pages) setTotalPages(data.total_pages);
        }
      })
      .catch((err) => {
        console.error(`Error fetching from ${url}:`, err);
        if (isMounted) setError("Failed to load data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error, totalPages };
};

export default useFetchMovies;
