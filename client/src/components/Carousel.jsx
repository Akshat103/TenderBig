import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function SimpleSlider() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const fetchImageUrls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/apiTender/images/allimages");
      setImageUrls(response.data);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <div  className=" mx-auto p-4 max-w-7xl ">
      <h2 className="ml-10 text-2xl font-bold mb-4 text-gray-700">
          Gallery
        </h2>
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img
              className="w-full h-80"
              src={imageUrl}
              alt={`Slider Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
