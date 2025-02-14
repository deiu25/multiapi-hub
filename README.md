MultiAPI Hub 🌐🚀
MultiAPI Hub is a modern web application built with Vite, React, and Tailwind CSS v4, designed to provide a seamless experience for accessing multiple APIs in one place. The project showcases the integration of various APIs, enabling users to explore different functionalities such as weather forecasts, movie searches, interactive joke generation, and public tenders from Romania.

🔥 Features
✅ Weather API – Get real-time weather updates and a 5-day forecast using OpenWeather and GeoDB APIs.
✅ MovieLand API – Discover popular movies, search for films, and save favorites using OMDb API.
✅ Joke Bot API – Generate random jokes with text-to-speech functionality powered by JokeAPI and VoiceRSS.
✅ IMB Movies API – Explore trending and top-rated movies with dynamic search and filtering.
✅ Tenders Romania API – Browse public tenders in Romania with filtering and sorting options.
✅ Tenders API (Romania) - An advanced system that allows users to explore public tenders in Romania, filtered and sorted based on multiple criteria.

🚀 Features
📄 Public tender listings with complete details (title, category, supplier, buyer, value)
🔍 Automatic pagination to browse through all available offers
📆 Sorting by publication date to display the most recent tenders
🛒 Supplier & Buyer details, including IDs and names
🏆 Winner information, displaying the selected suppliers and awarded value
📡 Real-time data updates when navigating between pages
🔄 Fast and responsive interface, built with React and Tailwind CSS

💻 Technologies Used
🚀 Frontend: React + Tailwind CSS + React Router
⚡ State Management: React Hooks (useState, useEffect)
📡 API Backend: Public Tenders API (Romanian data from 2021)
📊 Pagination & Sorting: Frontend-based sorting by tender date
🎛️ Custom Components: TenderCard for displaying tenders

🛠️ Tech Stack
Frontend: Vite + React + Tailwind CSS v4
State Management: React Hooks (useState, useEffect)
APIs Used: OpenWeather, GeoDB, OMDb, JokeAPI, TMDB, VoiceRSS, Romanian Public Tenders API
Optimized Performance: Fast loading with efficient API calls and debounce mechanisms
🔗 Live Demo: [MultiAPI Hub](https://multiapi-hub.andrei-design.ro/)
🔗 Netlify: [MultiAPI Hub](https://multi-api-hub.netlify.app/)

🤝 How to Contribute
If you’d like to contribute to this project, follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork and create a new branch:

```
git https://github.com/deiu25/multiapi-hub.git
git checkout -b feature-new-api
```

3. Make your changes, then commit and push:

```
git commit -m "Added new API integration"
git push origin feature-new-api
```

4. Submit a Pull Request to the main repository.

Note: Before running the project locally, set up your API keys in a .env.local file:

```
VITE_APPWRITE_IMB_ID="your_api_key"
VITE_APPWRITE_IMB_DB_ID="your_api_key"
VITE_APPWRITE_IMB_COLLECTION_ID="your_api_key"

VITE_WEATHER_API_KEY="your_api_key"
VITE_VOICE_RSS_API_KEY="your_api_key"
VITE_WEATHER_API_KEY="your_api_key"
VITE_RAPIDAPI_KEY="your_api_key"
VITE_OMDAPI_KEY="your_api_key"
```

All contributions are welcome! 🚀