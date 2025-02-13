import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const JokeAPIDescription = () => {
    return <APIDescriptionCard {...apiDescriptions.jokeBot} />;
  };

export default JokeAPIDescription
