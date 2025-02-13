export const apiDescriptions = {
    weather: {
        title: "Weather API",
        description: "An advanced weather forecasting application built using the latest web technologies.",
        features: [
            "📍 Automatic user location detection via Geolocation API",
            "🔍 Smart city search with autocomplete based on population",
            "🌡️ Detailed display of current weather (temp, min/max, humidity, wind)",
            "📆 5-day weather forecast displayed as cards",
            "📌 Finding the nearest city using GPS coordinates and the Haversine Formula"
        ],
        technologies: [
            "🚀 Frontend: React + Vite + Tailwind CSS + React Router",
            "📡 APIs: OpenWeather API, GeoDB API",
            "🗺️ Geolocation: navigator.geolocation + Haversine distance calculation"
        ],
        envVars: [
            "VITE_WEATHER_API_KEY=\"your_openweather_api_key\"",
            "VITE_RAPIDAPI_KEY=\"your_geodb_api_key\""
        ],
        exploreLink: "/api/weather",
    },

    imbMovies: {
        title: "IMB Movies",
        description: "Discover popular movies, quick searches, and current trends with IMB Movies.",
        features: [
            "🔎 Movie search with debounce and saving of the most searched titles",
            "📚 Display of popular movies with pagination for quick exploration",
            "🔥 Trending Movies based on the number of searches saved in Appwrite",
            "🎭 Specialized sections: Trending Today, Trending This Week, Top Rated Movies",
            "🧭 Fast navigation with a fixed Sidebar",
            "🔗 Direct link to IMDb for additional details"
        ],
        technologies: [
            "🚀 Frontend: React + Tailwind CSS + React Router",
            "⚡ State Management: React Hooks (useState, useEffect, useDebounce)",
            "📡 APIs: TMDB API, Appwrite",
            "🗄️ Backend & Database: Appwrite for storing popular movies"
        ],
        envVars: [
            "VITE_TMDB_API_KEY=\"your_tmdb_api_key\"",
            "VITE_APPWRITE_IMB_ID=\"your_appwrite_project_id\"",
            "VITE_APPWRITE_IMB_DB_ID=\"your_appwrite_database_id\"",
            "VITE_APPWRITE_IMB_COLLECTION_ID=\"your_appwrite_collection_id\""
        ],
        exploreLink: "/api/imb",
    },
    jokeBot: {
        title: "Joke Bot API",
        description: "An interactive bot that tells jokes using JokeAPI and VoiceRSS for voice synthesis.",
        features: [
            "🤣 Generate random jokes using **JokeAPI**",
            "🎙️ Play jokes as audio using **VoiceRSS API**",
            "🔎 Search and filter jokes by **category** (Programming, Dark, Pun, etc.)",
            "🛑 Option to exclude NSFW jokes or other sensitive categories",
            "🌍 Support for **multiple languages** (EN, FR, ES, etc.)",
            "🔄 Optimized **debounce** for quick updates",
            "📦 Futuristic design, animations, and **responsive** UI"
        ],
        technologies: [
            "🚀 **Frontend:** React + Tailwind CSS + React Router",
            "⚡ **Animations:** Framer Motion for smooth effects",
            "📡 **APIs:** JokeAPI for jokes and VoiceRSS for text-to-speech",
            "🎛️ **State Management:** React Hooks (useState, useEffect, useOptimistic)",
            "🖼️ **Assets & UI:** Animated GIFs and joke category selection"
        ],
        envVars: [
            "VITE_VOICE_RSS_API_KEY=\"your_voice_rss_api_key\""
        ],
        exploreLink: "/api/joke",
    },

    tenders: {
    title: "Tenders API",
    description: "Un sistem avansat care permite utilizatorilor să exploreze licitațiile publice din România, filtrate și sortate după diverse criterii.",
    features: [
      "📄 Listare licitații publice cu **detalii complete** (titlu, categorie, furnizor, achizitor, valoare)",
      "🔍 **Paginare automată** pentru a naviga prin toate ofertele disponibile",
      "📆 Sortare automată după **data publicării** pentru a vedea cele mai recente licitații",
      "🛒 Detalii despre **furnizori** și **achizitori**, inclusiv ID-uri și nume",
      "🏆 Informații despre **câștigătorii licitațiilor** (furnizori și valoare atribuită)",
      "📡 **Actualizare automată a datelor** la schimbarea paginii",
      "🔄 Interfață **rapidă și responsivă**, construită cu **React și Tailwind CSS**"
    ],
    technologies: [
      "🚀 **Frontend:** React + Tailwind CSS + React Router",
      "⚡ **State Management:** React Hooks (useState, useEffect)",
      "📡 **API Backend:** API-ul de Licitații Publice din România (date din 2021)",
      "📊 **Paginare & Sorting:** Logica de sortare în front-end pe baza datei licitației",
      "🎛️ **Componente personalizate:** `TenderCard` pentru afișarea fiecărei licitații"
    ],
    envVars: [],
    exploreLink: "/api/tenders",
  },
};
