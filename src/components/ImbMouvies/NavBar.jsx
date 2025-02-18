import { useState, useEffect } from "react";

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !document.getElementById("sidebar")?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-24 lg:top-16 lg:left-18 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? "" : "☰ Menu"}
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-6 w-64 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="mt-20 pt-12 p-2 border-t bg-gray-900 border-gray-800">
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer hover:text-gray-400">
              <a
                href="#trendingSearches"
                onClick={toggleSidebar}
              >
                🔥 Trending Searches
              </a>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <a
                href="#moviesByPopularity"
                onClick={toggleSidebar}
              >
                🎬 Popular Movies
              </a>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <a
                href="#trendingThisWeek"
                onClick={toggleSidebar}
              >
                📅 Trending This Week
              </a>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <a
                href="#trendingToday"
                onClick={toggleSidebar}
              >
                ☀️ Trending Today
              </a>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <a
                href="#topRatedMovies"
                onClick={toggleSidebar}
              >
                ⭐ Top Rated
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SidebarNav;
