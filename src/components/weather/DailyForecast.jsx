const DailyForecast = ({ data }) => {
    if (!data || !data.list) return null;

    const dailyData = data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toISOString().split("T")[0];
        if (!acc[date]) {
            acc[date] = { temps: [], weather: item.weather[0] };
        }
        acc[date].temps.push(item.main.temp);
        return acc;
    }, {});

    const processedData = Object.keys(dailyData).map((date) => {
        const temps = dailyData[date].temps;
        return {
            date,
            minTemp: Math.min(...temps),
            maxTemp: Math.max(...temps),
            weather: dailyData[date].weather,
        };
    });

    return (
        <div className="mt-6 p-4 bg-gray-900 shadow-lg rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-cyan-400 text-center">
                5-Day Forecast for {data.city?.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {processedData.map((day, index) => (
                    <div key={index} className="p-3 bg-gray-800 rounded-lg text-center border border-gray-700 hover:border-cyan-400 transition">
                        <p className="text-cyan-400 font-medium">{new Date(day.date).toLocaleDateString()}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                            alt={day.weather.description}
                            className="mx-auto"
                        />
                        <p className="text-lg font-bold text-white">{Math.round(day.maxTemp)}°C / {Math.round(day.minTemp)}°C</p>
                        <p className="text-gray-300">{day.weather.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
