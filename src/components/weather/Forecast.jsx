const Forecast = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="mt-6 p-4 bg-gray-900 shadow-lg rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-cyan-400 text-center">Weather Forecast for {data.city?.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {data.list.slice(0, 8).map((item, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded-lg text-center border border-gray-700 hover:border-cyan-400 transition">
              <p className="text-cyan-400 font-medium">{new Date(item.dt * 1000).toLocaleTimeString()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />
              <p className="text-lg font-bold text-white">{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Forecast;
  