import { Link, useLocation } from "react-router-dom";
import { apis } from "../../constants";

const ApiNavigation = () => {
  const location = useLocation();

  const navigationLinks = [{ title: "Home", link: "/" }, ...apis]; 

  return (
    <nav className="bg-gray-800 text-white py-4">
      <ul className="flex justify-center gap-6">
        {navigationLinks.map(({ title, link }) => (
          <li key={link}>
            <Link
              to={link}
              className={`px-4 py-2 rounded-lg ${
                location.pathname === link ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
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
