import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const IMBMoviesDescription = () => {
  return <APIDescriptionCard {...apiDescriptions.imbMovies} />;
};

export default IMBMoviesDescription;
