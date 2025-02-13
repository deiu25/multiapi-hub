const SidebarNav = () => {

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-full bg-gray-900 text-white p-6 w-64 shadow-lg transition-transform duration-300 translate-x-0" >
        <nav className="mt-16">
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingSearches")}>
              🔥 Trending Searches
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("moviesByPopularity")}>
              🎬 Popular Movies
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingThisWeek")}>
              📅 Trending This Week
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingToday")}>
              ☀️ Trending Today
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("topRatedMovies")}>
              ⭐ Top Rated
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SidebarNav;
