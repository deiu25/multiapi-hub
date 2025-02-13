import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const WeatherAPIDescription = () => {
  return <APIDescriptionCard {...apiDescriptions.weather} />;
};

export default WeatherAPIDescription;
