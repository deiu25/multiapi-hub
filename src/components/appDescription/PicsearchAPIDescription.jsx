import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const PicsearchAPIDescription = () => {
    return <APIDescriptionCard {...apiDescriptions.picSearch} />;
  };

export default PicsearchAPIDescription
