import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/apiTender/images/allimages"
      );
      setImageUrls(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageDelete = async (filename) => {
    try {
      await axios.delete(
        `http://localhost:5000/apiTender/images/delete/${encodeURIComponent(
          filename
        )}`
      );
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-20">
      <h2 className="text-xl font-bold mb-4">Image Gallery</h2>
      <div className="grid grid-cols-4 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative">
            <img
              className="w-full h-80 object-cover rounded-lg"
              src={imageUrl}
              alt={`Image ${index + 1}`}
            />
            <button
              onClick={() =>
                handleImageDelete(
                  imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
                )
              }
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              <AiFillDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
