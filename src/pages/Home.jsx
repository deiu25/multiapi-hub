import ApisCard from "../components/ApisCard";

const Home = () => {
  const apis = [
    {
      title: 'Imb',
      image: '/hero.png',
      description: 'All movies just a click away.',
      link: '/api/imb',
    },
    {
      title: 'API Meteo',
      description: 'Obtain weather information for any location.',
      link: '/api/weather',
    },
  ];

  return (
    <main className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">MultiAPI Hub</h1>
        <p className="text-center text-gray-600 mt-6">
           Welcome to MultiAPI Hub! This app gives you access to a variety of APIs, all in one convenient place.
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apis.map((api, index) => (
          <ApisCard
            key={index}
            title={api.title}
            image={api.image}
            description={api.description}
            link={api.link}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
