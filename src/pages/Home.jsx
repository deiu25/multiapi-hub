import { useState, useEffect } from "react";
import { apis } from "../../constants";
import ApisCard from "../components/ApisCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    setApiData(apis);
    setLoading(false);
  }, []);

  return (
    <main className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-md md:text-6xl font-bold text-center mt-12">MultiAPI Hub</h1>
        <p className="text-center text-lg md:text-2xl mt-4">
          Welcome to MultiAPI Hub! This app gives you access to a variety of APIs, all in one convenient place.
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiData.map((api, index) => (
            <ApisCard
              key={index}
              title={api.title}
              image={api.image}
              description={api.description}
              link={api.link}
              aboutLink={api.aboutLink}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;
