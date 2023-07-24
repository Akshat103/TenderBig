// GemListing.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { regionData } from "../constants/countriesData.js";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import InputSlider from "react-input-slider";

const TenderCard = ({ title, deadline, location, referenceNo, tenderId }) => {
  const navigate = useNavigate();
  // const { referenceNo } = useParams();
  const handleViewDetails = (tenderId) => {
    navigate(`/user/${tenderId}`, {
      state: { tenderId },
    });
  };

  console.log(tenderId);


  return (
    <div className="bg-white shadow-lg rounded p-6 mb-4 border-[2px] border-black/20">
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <span className="h-8 px-2 py-1 mb-2 ml-3 mr-2 font-bold text-white bg-green-500 rounded">
          Live
        </span>
      </div>
      <p className="mb-4 text-gray-600">Deadline: {deadline}</p>
      <p className="mb-4 text-gray-600">location: {location}</p>
      <p className="mb-4 text-gray-600">Sector: {referenceNo}</p>
      <p className="mb-4 text-gray-600">tenderId: {tenderId}</p>

      <button
        className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black linear"
        onClick={() => handleViewDetails(tenderId)}
      >
        View Details
      </button>
    </div>
  );
};

const TenderResults = () => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [tenderData, setTenderData] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [minValue, setMinValue] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleMinValueChange = (slider) => {
    setMinValue(slider.x);
  };

  useEffect(() => {
    // Fetch all sectors
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=sectors`);
      console.log(response.data[0].sectors);
      setSectors(response.data[0].sectors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);

    // filter countries based on the selected region
    const filteredCountries = regionData[selectedRegion] || [];
    setCountries(filteredCountries);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tenderresults/search`
        );
        setTenderData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTenderData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const region = encodeURIComponent(selectedRegion);
        const country = encodeURIComponent(selectedCountry);
        const product = encodeURIComponent(selectedProduct);
        const value = encodeURIComponent(minValue);

        const baseUrl = `${BASE_URL}/tenderresults/search`;

        let searchUrl = `${baseUrl}?`;

        if (region) {
          searchUrl += `&region=${region}`;
        }
        if (country) {
          searchUrl += `&country=${country}`;
        }
        if (product) {
          searchUrl += `&sector=${product}`;
        }
        if (value) {
          searchUrl += `&value=${value}`;
        }

        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          auth: token,
        };


        const response = await axios.get(searchUrl, { }, { headers });

        if (response.status === 401) {
          // Unauthorized - display error message
          console.error("Unauthorized. Sign in first.");

          return;
        }

        setTenderData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Sign in first.");
        } else {
          console.error("Error fetching tender data:", error);
        }
      }
    };

    fetchData();
  }, [
    selectedCountry,
    selectedProduct,
    selectedRegion,
    minValue
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tenderData.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(tenderData.length / itemsPerPage);
    const maxPageNumbers = 5;

    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const middlePage = Math.floor(maxPageNumbers / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage <= 0) {
      startPage = 1;
      endPage = maxPageNumbers;
    } else if (endPage > totalPages) {
      startPage = totalPages - maxPageNumbers + 1;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="p-4 mx-auto max-w-7xl">
        <h1 className="my-4 text-3xl font-bold text-center">
          Tender Results
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <div className="">
              <h2 className="mb-2 text-lg font-bold">Filter Tenders</h2>
              <div className="mb-4 border-[2px] border-black/20 shadow-xl">
                <label
                  htmlFor="region"
                  className="block text-xl font-bold mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  size={5}
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Regions</option>
                  {Object.keys(regionData).map((region) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
                <label
                  htmlFor="country"
                  className="block text-xl font-bold mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  size={5}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Countries</option>
                  {countries.map((country) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
                <label
                  htmlFor="product"
                  className="block text-xl font-bold  mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Tenders By Sector
                </label>
                <select
                  id="product"
                  name="product"
                  size={5}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Products</option>
                  {sectors.map((tenderBySectorProductObj) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={tenderBySectorProductObj.name} value={tenderBySectorProductObj.value}>
                      {tenderBySectorProductObj}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
                <label
                  htmlFor="slider"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Minimum Tender Amount
                </label>

                <div className="p-4">
                  <InputSlider
                    axis="x"
                    x={minValue}
                    xmax={100000000}
                    onChange={handleMinValueChange}
                  />
                  <div className="flex justify-between">
                    <span>Min: ${minValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:col-span-2 md:col-span-2">
            {tenderData.length > 0 ? (
              tenderData.map((tender) => (
                <TenderCard
                  key={tender.tenderId}
                  title={tender.summary}
                  deadline={tender.deadline}
                  location={tender.country}
                  referenceNo={tender.state}
                  tenderId={tender.tenderId}
                  o
                />
              ))
            ) : (
              <p className="text-lg text-center">No tenders found.</p>
            )}
            {tenderData.length > itemsPerPage && (
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-300"
                >
                  Previous
                </button>
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-4 py-2 rounded hover:bg-black hover:text-white hover:border hover:border-black transition-colors duration-300 ${pageNumber === currentPage
                        ? "text-white bg-black"
                        : "text-black bg-white"
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === Math.ceil(tenderData.length / itemsPerPage)}
                  className="px-4 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderResults;
