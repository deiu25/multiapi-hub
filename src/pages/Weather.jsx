import { useState, useEffect } from "react";
import Search from "../components/weather/Search";
import CurrentWeather from "../components/weather/CurrentWeather";
import Spinner from "../components/Spinner";
import DailyForecast from "../components/weather/DailyForecast";
import { fetchUserLocation } from "../utils/weather/fetchUserLocation";
import { findClosestCity } from "../utils/weather/findClosestCity";


const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWeather = async (lat, lon, cityName) => {
        setLoading(true);
        setError("");

        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`).then(res => res.json()),
                fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`).then(res => res.json()),
            ]);

            if (weatherResponse.cod !== 200 || forecastResponse.cod !== "200") {
                throw new Error(weatherResponse.message || forecastResponse.message);
            }

            // Filtrăm prognoza doar pentru ziua curentă
            const today = new Date().toISOString().split("T")[0];
            const filteredHourlyForecast = forecastResponse.list.filter(item =>
                item.dt_txt.startsWith(today)
            );

            // Calculăm temperatura minimă și maximă
            const minTemp = Math.min(...filteredHourlyForecast.map(item => item.main.temp));
            const maxTemp = Math.max(...filteredHourlyForecast.map(item => item.main.temp));

            setCurrentWeather({
                city: { name: cityName },
                ...weatherResponse,
                minTemp,
                maxTemp,
                hourlyForecast: filteredHourlyForecast
            });

            setForecast({ city: { name: cityName }, list: forecastResponse.list });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeWeather = async () => {
            try {
                const { lat, lon } = await fetchUserLocation();
                const closestCity = findClosestCity(lat, lon);
                if (closestCity) {
                    fetchWeather(closestCity.lat, closestCity.lng, closestCity.name);
                } else {
                    throw new Error("Nu s-a găsit un oraș apropiat.");
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        initializeWeather();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-10">
            <div className="max-w-4xl w-full p-6 bg-gray-800 bg-opacity-60 shadow-lg rounded-lg backdrop-blur-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-cyan-400 tracking-widest">Weather App</h1>
                <Search onSearchChange={({ label, value }) => {
                    const [lat, lon] = value.split(" ");
                    fetchWeather(lat, lon, label);
                }} />

                {loading && <Spinner />}
                {error && <p className="text-center text-red-500 mt-4">{error}</p>}

                <div className="mt-6">
                    {currentWeather && <CurrentWeather data={currentWeather} />}
                    {forecast && <DailyForecast data={forecast} />}
                </div>
            </div>
        </div>
    );
}

export default Weather;
