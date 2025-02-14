import { useState } from "react";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import { fetchUserLocation } from "../utils/weather/fetchUserLocation";
import { countryToLanguage, supportedLanguages } from "../../constants/advicesLanguages";

const translateText = async (text, targetLang) => {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return "Translation failed";
    }
};

const Advices = () => {
    const [advice, setAdvice] = useState({
        id: "ADVICE",
        text: "Click the button to get a tip.",
    });
    const [loading, setLoading] = useState(false);
    const [translatedText, setTranslatedText] = useState("");

    const getAdvice = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            const data = await response.json();
            setAdvice({ id: `ADVICE ${data.slip.id}`, text: `"${data.slip.advice}"` });
            setTranslatedText("");
        } catch (error) {
            console.error("Advice error:", error);
            setAdvice({
                id: "Error",
                text: "Couldn't get a tip. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const autoTranslateAdvice = async () => {
        setLoading(true);
        try {
            const location = await fetchUserLocation();

            const countryResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.lat}&longitude=${location.lon}&localityLanguage=en`
            );

            const countryData = await countryResponse.json();

            if (!countryData || !countryData.countryName) {
                throw new Error("Country not found");
            }

            const userCountry = countryData.countryName;

            const targetLang = countryToLanguage[userCountry];

            if (!targetLang || !supportedLanguages.includes(targetLang)) {
                console.warn("No supported language found for country:", userCountry);
                return;
            }

            const translation = await translateText(advice.text, targetLang);
            setTranslatedText(translation);
        } catch (error) {
            console.error("Translation error:", error);
            setTranslatedText("Translation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-[720px] max-h-[800px] bg-white/10 backdrop-blur-xl rounded-2xl flex flex-col items-center p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
                <p className="text-[#53ffab] text-sm tracking-[0.14em] uppercase mb-6">
                    {advice.id}
                </p>
                <p className="text-[#d9d9d9] text-2xl sm:text-3xl leading-tight text-center px-9 font-semibold">
                    {loading ? <Spinner /> : translatedText || advice.text}
                </p>

                <div className="flex gap-9 mt-6">
                    <motion.button
                        onClick={getAdvice}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-full bg-[#53ffab] flex items-center justify-center shadow-md transition-transform duration-300"
                    >
                        🔄
                    </motion.button>

                    <motion.button
                        onClick={autoTranslateAdvice}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-green-500 rounded-lg text-white shadow-md"
                    >
                        🌍 Translate
                    </motion.button>
                </div>
            </motion.div>

            <div className="absolute bottom-4 text-xs text-[#d9d9d9]">
                <p className="text-center">
                    APIs used in this project: Advice Slip API, MyMemory Translation API, GeoDB Cities API
                </p>
            </div>

        </div>
    );
};

export default Advices;
