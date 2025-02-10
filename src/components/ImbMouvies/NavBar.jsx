const NavBar = () => {
    const handleScroll = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  
    return (
      <nav className="fixed top-0 left-0 w-full bg-dark-900 bg-opacity-90 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <img src="/logo.png" alt="YourNextMovie Logo" className="w-10 h-10" />
  
          {/* Navigation Links */}
          <ul className="flex gap-6 text-white font-medium">
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingSearches")}>
              Trending Searches
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("moviesByPopularity")}>
              Popular Movies
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingThisWeek")}>
              Trending This Week
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("trendingToday")}>
              Trending Today
            </li>
            <li className="cursor-pointer hover:text-gray-400" onClick={() => handleScroll("topRatedMovies")}>
              Top Rated
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  