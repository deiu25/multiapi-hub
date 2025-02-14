import { Link } from "react-router-dom";
import { BackgroundGradient } from "./ui/background-gradient";

const ApisCard = ({ title, image, description, link, aboutLink }) => {
  return (
    <div className="flex justify-center">
      <BackgroundGradient className="rounded-[22px] max-w-sm h-full p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
          src={image}
          alt={title}
          height="auto"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="border-t border-neutral-200 dark:border-neutral-700 my-4 flex flex-col md:flex-row justify-center">
        <button className="rounded-full p-1 text-white bg-black mt-4 text-sm font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[1rem] flex items-center space-x-1 text-white">
            <Link
              to={link}
              className=" text-white font-bold px-4 rounded-full"
            >
              Explore API
            </Link>
          </span>
        </button>
        <button className="rounded-full p-1 text-white bg-black mt-4 text-sm font-bold dark:bg-zinc-800">
          <span className="bg-zinc-700 rounded-full text-[1rem] flex items-center space-x-1 text-white">
            <Link
              to={aboutLink}
              className=" text-white font-bold px-4 rounded-full"
            >
              API Documentation
            </Link>
          </span>
        </button>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default ApisCard;
