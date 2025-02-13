const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const formattedDateTime = new Date(data.dt * 1000).toLocaleString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const precipitation =
        data.rain?.["1h"] ||
        data.rain?.["3h"] ||
        data.snow?.["1h"] ||
        data.snow?.["3h"] ||
        0;

    const humidity = data.main.humidity;
    const windSpeedKmh = data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1) : "N/A";
    const sunriseTime = data.sys?.sunrise
        ? new Date(data.sys.sunrise * 1000).toLocaleTimeString("ro-RO", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : "N/A";
    const sunsetTime = data.sys?.sunset
        ? new Date(data.sys.sunset * 1000).toLocaleTimeString("ro-RO", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : "N/A";
    const pressure = data.main.pressure;
    const feels_like = data.main.feels_like;

    return (
        <div className="p-6 mt-6 bg-gray-900 shadow-lg rounded-xl text-center border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400">{data.city?.name}</h2>
            <p className="text-sm text-gray-500">{formattedDateTime}</p>
            <p className="text-lg text-gray-400">{data.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="mx-auto my-4"
            />
            <p className="text-4xl font-bold text-white">
                {Math.round(data.main.temp)}°C
            </p>
            <p className="text-lg text-gray-300">
                Min:{" "}
                <span className="text-cyan-400">{Math.round(data.minTemp)}°C</span> |
                Max: <span className="text-cyan-400">{Math.round(data.maxTemp)}°C</span>
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                    <strong>Precipitation:</strong> {precipitation} mm
                </div>
                <div>
                    <strong>Humidity:</strong> {humidity}%
                </div>
                <div>
                    <strong>Wind:</strong> {windSpeedKmh} km/h
                </div>
                <div>
                    <strong>Pressure:</strong> {pressure} hPa
                </div>
                <div>
                    <strong>Feels like:</strong> {feels_like}°C
                </div>
                <div>
                    <strong>Sunrise:</strong> {sunriseTime}
                </div>
                <div>
                    <strong>Sunset:</strong> {sunsetTime}
                </div>
            </div>

            {data.hourlyForecast && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-cyan-400 text-center mb-4">
                        Today Forecast
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {data.hourlyForecast.map((hour, index) => (
                            <div
                                key={index}
                                className="text-center bg-gray-900 p-2 rounded-lg border border-gray-700"
                            >
                                <p className="text-cyan-400">
                                    {new Date(hour.dt * 1000).toLocaleString("ro-RO", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}
                                </p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                    alt={hour.weather[0].description}
                                    className="mx-auto"
                                />
                                <p className="text-white font-bold">
                                    {Math.round(hour.main.temp)}°C
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;
