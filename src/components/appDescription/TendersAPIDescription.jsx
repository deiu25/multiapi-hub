import APIDescriptionCard from '../APIDescriptionCard';
import { apiDescriptions } from '../../../constants/apiDescriptions';

const TendersAPIDescription = () => {
    return <APIDescriptionCard {...apiDescriptions.tenders} />;
};

export default TendersAPIDescription