import { apiDescriptions } from "../../../constants/apiDescriptions";
import APIDescriptionCard from "../APIDescriptionCard";

const AdviceAPIDescription = () => {
  return <APIDescriptionCard {...apiDescriptions.advices} />;
};

export default AdviceAPIDescription;
