import { useState, useOptimistic, useEffect } from "react";
import { motion } from "framer-motion";

const CATEGORIES = ["Any", "Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];
const FLAGS = ["nsfw", "religious", "political", "racist", "sexist", "explicit"];
const LANGUAGES = ["cs", "de", "en", "es", "fr", "pt"];

const languageMapping = {
  cs: { hl: "cs-cz", v: "Zuzana" },
  de: { hl: "de-de", v: "Hedda" },
  en: { hl: "en-us", v: "Linda" },
  es: { hl: "es-es", v: "Monica" },
  fr: { hl: "fr-fr", v: "Alice" },
  pt: { hl: "pt-pt", v: "Catarina" },
};

const buildSpeechUrl = ({ key, src, hl, v }) =>
  `https://api.voicerss.org/?${new URLSearchParams({ key, src, hl, v, r: 0, c: "mp3", f: "44khz_16bit_stereo" })}`;

const AnimatedText = ({ text }) => (
  <motion.div className="inline-block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {text.split("").map((letter, index) => (
      <motion.span key={index} className="inline-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.div>
);

const Joke = () => {
  const [joke, setJoke] = useState("Hello! I am your joke-telling AI.");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [optimisticJoke, setOptimisticJoke] = useOptimistic(joke);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    return () => {
      if (audio) audio.pause();
    };
  }, [audio]);

  const getJoke = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    try {
      const params = new URLSearchParams({ lang: selectedLanguage });
      if (selectedFlags.length) params.append("blacklistFlags", selectedFlags.join(","));
      const url = `https://v2.jokeapi.dev/joke/${selectedCategory}?${params.toString()}`;
      
      const response = await fetch(url);
      const data = await response.json();

      const newJoke = data.error
        ? "No joke available."
        : data.setup
        ? `${data.setup} ... ${data.delivery}`
        : data.joke;

      setOptimisticJoke(newJoke);
      setJoke(newJoke);

      const { hl, v } = languageMapping[selectedLanguage] || { hl: "en-us", v: "Linda" };
      const speechUrl = buildSpeechUrl({
        key: import.meta.env.VITE_VOICE_RSS_API_KEY,
        src: newJoke,
        hl,
        v,
      });

      const newAudio = new Audio(speechUrl);
      setAudio(newAudio);
      newAudio.play();
      newAudio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Oops! Something went wrong.");
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 mt-10">Joke Bot 🤖</h1>
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <motion.div className="relative w-32 h-32 flex justify-center items-center bg-neon-cyan rounded-full"
          animate={{ scale: [1, 1.1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <img src="/robot.gif" alt="Robot" className="w-28 h-28 rounded-full" />
        </motion.div>

        <div className="relative bg-gray-700 p-4 rounded-xl text-center text-white mt-4 max-w-sm w-full border border-blue-400">
          <AnimatedText text={optimisticJoke} />
          <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-gray-700 border-x-8 border-x-transparent"></div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button onClick={getJoke} disabled={isSpeaking} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            {isSpeaking ? "Speaking..." : "Tell me a joke"}
          </button>

          <select className="bg-gray-800 text-white p-2 rounded-lg" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg" value={selectedFlags} onChange={(e) => setSelectedFlags([...e.target.selectedOptions].map((o) => o.value))}>
            {FLAGS.map((flag) => (
              <option key={flag} value={flag}>{flag}</option>
            ))}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-4">Note: Some jokes may be inappropriate or offensive. Use at your own discretion.</p>
        <p className="text-xs text-gray-400 mt-4">Powered by <a href="https://jokeapi.dev/" target="_blank" rel="noreferrer" className="underline">JokeAPI</a> and <a href="https://voicerss.org/" target="_blank" rel="noreferrer" className="underline">VoiceRSS</a>.</p>
      </div>
    </div>
  );
};

export default Joke;
