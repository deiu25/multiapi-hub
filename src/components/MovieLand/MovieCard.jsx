import { Link } from "react-router-dom";

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  return (
    <div className="w-[310px] h-[460px] m-6 relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-gray-800">
      <button
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite ? "bg-yellow-500" : "bg-gray-600"
        }`}
        onClick={() => toggleFavorite(movie)}
      >
        ⭐
      </button>
      <div className="w-full h-full">
        <img
          loading="lazy"
          className="w-full h-full object-cover"
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#343739] transition-colors duration-300 hover:bg-transparent">
        <span className="block text-sm font-semibold uppercase tracking-widest text-gray-300">
          {movie.Type}
        </span>
        <Link to={`/movie/${movie.imdbID}`} className="mt-2 text-lg font-semibold text-[#f9d3b4] hover:underline">
          {movie.Title}
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
