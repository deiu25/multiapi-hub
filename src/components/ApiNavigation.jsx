import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apis } from "../../constants";

const ApiNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [{ title: "Home", link: "/" }, ...apis];

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="flex justify-between items-center px-4 lg:hidden">
        <p className="text-lg font-bold">MultiAPI Hub</p>
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      <ul className="hidden lg:flex justify-center gap-6">
        {navigationLinks.map(({ title, link }) => (
          <li key={link}>
            <Link
              to={link}
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === link ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden bg-gray-900 py-2 px-4 space-y-2 absolute left-0 top-16 w-full shadow-lg`}
      >
        {navigationLinks.map(({ title, link }) => (
          <li key={link}>
            <Link
              to={link}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === link ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ApiNavigation;
