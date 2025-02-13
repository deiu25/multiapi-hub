import { useState, useEffect, useRef } from "react";

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const debounceTimeout = useRef(null);

  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
          term
        )}&sort=-population&limit=10`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      if (data.data) {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Eroare la obținerea datelor de la GeoDB:", err);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 800);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (selectedCity) => {
    if (selectedCity) {
      const lat = selectedCity.latitude;
      const lon = selectedCity.longitude;
      setSearchTerm("");
      setSuggestions([]);
      onSearchChange({ label: selectedCity.city, value: `${lat} ${lon}` });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 w-full">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 transition"
          placeholder="Enter city..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-b-lg max-h-60 overflow-auto">
            {suggestions.map((city) => (
              <li
                key={city.id}
                className="p-2 hover:bg-cyan-500 hover:text-white cursor-pointer"
                onClick={() => handleSelect(city)}
              >
                {city.city}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="mt-4 px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition shadow-md"
        onClick={() => {
          if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
