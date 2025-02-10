import { useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieCard = ({ movie: { id, title, vote_average, poster_path, release_date, original_language, media_type } }) => {
  const [loading, setLoading] = useState(false);

  const handlePosterClick = async () => {
    setLoading(true);
    try {
      const type = media_type === "tv" ? "tv" : "movie";
      
      const response = await fetch(`${API_BASE_URL}/${type}/${id}/external_ids`, API_OPTIONS);
      const data = await response.json();

      let url = null;

      if (data.imdb_id) {
        url = `https://www.imdb.com/title/${data.imdb_id}`;
      } else if (data.wikidata_id) {
        url = `https://www.wikidata.org/wiki/${data.wikidata_id}`;
      } else if (data.tvdb_id && type === "tv") {
        url = `https://thetvdb.com/dereferrer/${data.tvdb_id}`;
      }

      if (url) {
        window.open(url, "_blank");
      } else {
        alert("No valid external link available for this title.");
      }
    } catch (error) {
      console.error("Error fetching external ID:", error);
      alert("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-card">
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/no-movie.webp"} 
        alt={title} 
        onClick={handlePosterClick} 
        style={{ cursor: "pointer" }}
      />

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Rating" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>&middot;</span>
          <p className="lang">{original_language}</p>
          <span>&middot;</span>
          <p className="year">
            {release_date ? new Date(release_date).getFullYear() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
