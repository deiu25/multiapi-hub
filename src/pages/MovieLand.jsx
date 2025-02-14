import { useEffect, useState } from "react";
import MovieCard from "../components/MovieLand/MovieCard";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import { randomMovies } from "../../constants/movies";
import Spinner from "../components/Spinner";

const API_KEY = import.meta.env.VITE_OMDAPI_KEY;
const API_URL = "https://www.omdbapi.com/?apikey=" + API_KEY;

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState(getFavorites());
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    
    const randomTitle = randomMovies[Math.floor(Math.random() * randomMovies.length)];

    const fetchMovies = async (title, pageNum = 1) => {
        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}&page=${pageNum}`);
        const data = await response.json();
        
        setMovies(pageNum === 1 ? data.Search || [] : [...movies, ...data.Search]);
        setLoading(false);
        setInitialLoading(false);
    };

    useEffect(() => {
        fetchMovies(randomTitle);
    }, []);

    useEffect(() => {
        if (searchTerm) fetchMovies(searchTerm, page);
    }, [searchTerm, page]);

    const toggleFavorite = (movie) => {
        let updatedFavorites = getFavorites();
        const index = updatedFavorites.findIndex((fav) => fav.imdbID === movie.imdbID);
        
        if (index >= 0) {
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(movie);
        }

        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
    };

    return (
      <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f] text-white">

        <h1 className="text-5xl font-extrabold text-neon-cyan tracking-wide">
          MovieLand
        </h1>
  
        <div className="flex w-full max-w-3xl mt-6 p-3 bg-[#1a1a2e] rounded-full shadow-lg border border-neon-cyan focus-within:border-neon-lime transition-all">
          <input
            className="flex-1 p-2 text-lg text-white bg-transparent outline-none placeholder-gray-400"
            placeholder="🔍 Search for movies..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); 
            }}
          />
        </div>

        {initialLoading && (
          <div className="flex justify-center items-center mt-6">
            <Spinner />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-6xl">
          {!loading && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
              />
            ))
          ) : !loading && !initialLoading ? (
            <p className="text-lg text-yellow-400 text-center col-span-full">No movies found.</p>
          ) : null}
        </div>
  
        {/* Load More Button */}
        {movies.length > 0 && !loading && (
          <button
            className="mt-6 px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-lime rounded-md shadow-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </button>
        )}
      </div>
    );
};

export default Movie;
