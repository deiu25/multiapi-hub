import { Link } from "react-router-dom";
import { BackgroundGradient } from "./ui/background-gradient";

const APIDescriptionCard = ({ title, description, features, technologies, envVars, exploreLink }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-purple-900 text-white p-4 sm:p-8 mt-10">
      <BackgroundGradient className="rounded-[22px] max-w-3xl h-full p-3 sm:p-12 bg-black/80 shadow-lg backdrop-blur-lg border border-purple-600">
        <h1 className="text-4xl font-extrabold text-center text-purple-400">{title}</h1>
        <p className="text-base sm:text-lg text-gray-300 text-center mt-3">{description}</p>

        <div className="mt-6 space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl font-semibold text-purple-300">🚀 Features</h2>
            <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-2">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-semibold text-green-300">💻 Technologies Used</h2>
            <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-2">
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h2 className="text-2xl font-semibold text-yellow-300">⚙️ API Keys Configuration</h2>
            <div className="bg-gray-800 p-3 rounded-md text-green-400 text-sm mt-2 overflow-x-auto max-w-full space-y-2">
              {envVars.map((env, index) => (
                <p key={index} className="break-words break-all whitespace-normal">{env}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link to={exploreLink} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full transition duration-300">
            Explore API
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default APIDescriptionCard;
