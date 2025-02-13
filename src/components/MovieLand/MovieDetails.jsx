import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";

const API_KEY = import.meta.env.VITE_OMDAPI_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API_URL}&i=${id}&plot=full&tomatoes=true`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white flex justify-center min-h-screen"><Spinner /></div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f] p-6 text-white">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl p-6 w-full max-w-3xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#1a1a2e] via-transparent to-transparent animate-pulse"></div>

        <div className="flex justify-center">
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            className="w-full max-w-sm md:max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-4xl font-extrabold text-neon-cyan tracking-wide">{movie.Title}</h2>
          <p className="text-gray-300 mt-2 italic">{movie.Genre} | {movie.Year}</p>
          
          <p className="text-lg mt-4">{movie.Plot}</p>

          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>⭐ <span className="text-yellow-400">{movie.imdbRating}</span> / 10</p>
            {movie.tomatoMeter && (
              <p>🍅 <span className="text-red-400">{movie.tomatoMeter}%</span> Rotten Tomatoes</p>
            )}
            <p>🎬 Director: {movie.Director}</p>
            <p>🎭 Actors: {movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
