import { Routes, Route, useLocation } from "react-router-dom";
import ApiNavigation from "./components/ApiNavigation";
import Home from "./pages/Home";
import Imb from "./pages/Imb";
import Joke from "./pages/Joke";
import Tenders from "./pages/Tenders";
import Weather from "./pages/Weather";
import WeatherAPIDescription from "./components/appDescription/WeatherAPIDescription";
import IMBMoviesDescription from "./components/appDescription/IMBMoviesDescription";
import JokeAPIDescription from "./components/appDescription/JokeAPIDescription";
import TendersAPIDescription from "./components/appDescription/TendersAPIDescription";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">

      <ApiNavigation />

      <main className="flex-grow mt-10">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/api/imb" element={<Imb />} />
          <Route path="/api/joke" element={<Joke />} />
          <Route path="/api/tenders" element={<Tenders />} />
          <Route path="/api/weather" element={<Weather />} />

          <Route path="/api/about/weather" element={<WeatherAPIDescription />} />
          <Route path="/api/about/imb" element={<IMBMoviesDescription />} />
          <Route path="/api/about/joke" element={<JokeAPIDescription />} />
          <Route path="/api/about/tenders" element={<TendersAPIDescription />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
