import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const MovieLandDescription = () => {
    return <APIDescriptionCard {...apiDescriptions.movieLand} />;
  };

export default MovieLandDescription
