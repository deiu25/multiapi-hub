import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import axios from "axios";
import Spinner from "../components/Spinner";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PHOTOS_PER_PAGE = 10; 

const PicSearch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false); 
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStats, setImageStats] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRandomImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.unsplash.com/photos/random", {
        headers: { Authorization: `Client-ID ${API_KEY}` },
        params: { count: PHOTOS_PER_PAGE },
      });
      setImages(response.data);
      setIsSearch(false); 
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchImages = async () => {
    if (!query.trim()) return; 
    setLoading(true);
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        headers: { Authorization: `Client-ID ${API_KEY}` },
        params: { query, per_page: PHOTOS_PER_PAGE, page },
      });
      setImages(response.data.results);
      setIsSearch(true); // Mark that we are searching
    } catch (error) {
      console.error("Error fetching search images:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImageStats = async (imageId) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/${imageId}/statistics`, {
        headers: { Authorization: `Client-ID ${API_KEY}` },
      });
      setImageStats(response.data);
    } catch (error) {
      console.error("Error fetching image statistics:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    fetchImageStats(image.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setImageStats(null);
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      gsap.from(".image-item", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
      });
    }
  }, [images]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    if (isSearch) {
      fetchSearchImages();
    } else {
      fetchRandomImages();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-5">
      <motion.h1
        className="text-4xl font-bold mb-5 text-neon-cyan mt-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        PicSearch
      </motion.h1>

      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSearchImages();
        }}
        className="flex space-x-3 w-full max-w-lg mb-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search images..."
          className="p-2 flex-grow rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-lime transition-all"
        >
          Search
        </button>
      </motion.form>

      {loading && <Spinner />}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {images.length > 0 ? (
          images.map((img) => (
            <motion.div
              key={img.id}
              className="image-item overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleImageClick(img)}
            >
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No images found</p>
        )}
      </div>

      <div className="flex justify-center mt-8 space-x-5">
        <button
          onClick={handleNextPage}
          className="p-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-lime transition-all"
        >
          Load More
        </button>
      </div>

      {showModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar">
            <h2 className="text-xl font-bold mb-4">{selectedImage.description || "Image Details"}</h2>

            <div className="flex justify-center">
              <img src={selectedImage.urls.full} alt={selectedImage.alt_description} className="rounded-lg w-full" />
            </div>

            {imageStats ? (
              <div className="mt-4 text-gray-300">
                <p><strong>Downloads:</strong> {imageStats.downloads.total}</p>
                <p><strong>Views:</strong> {imageStats.views.total}</p>
                <p><strong>Likes:</strong> {imageStats.likes.total}</p>
              </div>
            ) : (
              <p className="mt-4 text-gray-400">Loading stats...</p>
            )}

            {selectedImage.exif && (
              <div className="mt-4 text-gray-300">
                <h3 className="text-lg font-semibold">Camera Info:</h3>
                <p><strong>Make:</strong> {selectedImage.exif.make || "N/A"}</p>
                <p><strong>Model:</strong> {selectedImage.exif.model || "N/A"}</p>
                <p><strong>Aperture:</strong> {selectedImage.exif.aperture || "N/A"}</p>
                <p><strong>Exposure Time:</strong> {selectedImage.exif.exposure_time || "N/A"}</p>
                <p><strong>Focal Length:</strong> {selectedImage.exif.focal_length || "N/A"} mm</p>
                <p><strong>ISO:</strong> {selectedImage.exif.iso || "N/A"}</p>
              </div>
            )}

            {selectedImage.location && (
              <div className="mt-4 text-gray-300">
                <h3 className="text-lg font-semibold">Location:</h3>
                <p><strong>City:</strong> {selectedImage.location.city || "Unknown"}</p>
                <p><strong>Country:</strong> {selectedImage.location.country || "Unknown"}</p>
                {selectedImage.location.position && (
                  <p><strong>Coordinates:</strong> {selectedImage.location.position.latitude}, {selectedImage.location.position.longitude}</p>
                )}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="p-2 bg-red-600 rounded-lg hover:bg-red-800 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PicSearch;
