import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/ImbMouvies/Search";
import Spinner from "../components/Spinner";
import NavBar from "../components/ImbMouvies/NavBar";
import MoviesSection from "../components/ImbMouvies/MovieSection ";
import { getTrendingMovies, updateSearchCount } from "../appwrite/imbMovie";
import useFetchMovies from "../hooks/ImbMovies/useFetchMovies";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};

const Imb = () => {
  // Movies by Popularity (search / popularity)
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Trending Movies (based on site searches)
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState("");

  // Statuses for paging to the other sections:
  const [trendingWeekPage, setTrendingWeekPage] = useState(1);
  const [trendingDayPage, setTrendingDayPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch for Movies by Popularity
  const fetchMovies = async (query = "", page = 1) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popular.desc&page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      setTotalPages(data.total_pages);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load trending movies (based on site searches)
  const loadTrendingMoviesBySearchHere = async () => {
    setIsTrendingLoading(true);
    setTrendingError("");
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
      setTrendingError("Failed to load trending movies. Please try again later.");
    } finally {
      setIsTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    loadTrendingMoviesBySearchHere();
  }, []);

  // Custom hook for paginated sections
  const {
    data: trendingWeekMovies,
    loading: isTrendingWeekLoading,
    error: trendingWeekError,
    totalPages: trendingWeekTotalPages,
  } = useFetchMovies(`${API_BASE_URL}/trending/movie/week?page=${trendingWeekPage}`);

  const {
    data: trendingDayMovies,
    loading: isTrendingDayLoading,
    error: trendingDayError,
    totalPages: trendingDayTotalPages,
  } = useFetchMovies(`${API_BASE_URL}/trending/movie/day?page=${trendingDayPage}`);

  const {
    data: topRatedMovies,
    loading: isTopRatedLoading,
    error: topRatedError,
    totalPages: topRatedTotalPages,
  } = useFetchMovies(`${API_BASE_URL}/movie/top_rated?page=${topRatedPage}`);

  return (
    <main>

      <div className="pattern" />
      <div className="wrapper">

        <header className="mb-6 text-center">
          <img src="/hero.png" alt="Hero Banner" className="mx-auto max-sm:mt-10" />
          <h1 className="text-4xl font-bold mt-4">
            🎥 Discover <span className="text-gradient">Awesome Movies</span> Instantly!
          </h1>
        </header>
        <div className="flex-grow p-6">
          <NavBar />
          {/* Trending Based on Searches */}
          <section id="trendingSearches" className="trending">
            <h2 className="text-2xl font-semibold mb-4">🔥 Trending Searches</h2>
            {isTrendingLoading ? (
              <Spinner />
            ) : trendingError ? (
              <p className="text-red-500">{trendingError}</p>
            ) : trendingMovies.length > 0 ? (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No trending movies available.</p>
            )}
          </section>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Movies by Popularity */}
          <MoviesSection
            id="moviesByPopularity"
            title="Movies by Popularity"
            movies={movieList}
            isLoading={isLoading}
            error={errorMessage}
            sectionClassName="all-movies mt-16"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Trending This Week */}
          <MoviesSection
            id="trendingThisWeek"
            title="Trending This Week"
            movies={trendingWeekMovies}
            isLoading={isTrendingWeekLoading}
            error={trendingWeekError}
            sectionClassName="all-movies mt-20"
            currentPage={trendingWeekPage}
            totalPages={trendingWeekTotalPages}
            onPageChange={setTrendingWeekPage}
          />

          {/* Trending Today */}
          <MoviesSection
            id="trendingToday"
            title="Trending Today"
            movies={trendingDayMovies}
            isLoading={isTrendingDayLoading}
            error={trendingDayError}
            sectionClassName="all-movies mt-20"
            currentPage={trendingDayPage}
            totalPages={trendingDayTotalPages}
            onPageChange={setTrendingDayPage}
          />

          {/* Top Rated Movies */}
          <MoviesSection
            id="topRatedMovies"
            title="Top Rated Movies"
            movies={topRatedMovies}
            isLoading={isTopRatedLoading}
            error={topRatedError}
            sectionClassName="all-movies mt-20"
            currentPage={topRatedPage}
            totalPages={topRatedTotalPages}
            onPageChange={setTopRatedPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Imb;
