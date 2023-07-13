import React, { useState, useEffect } from "react";
import axios from "axios";
import {regionData, geopoliticalData} from "../constants/countriesData.js";
import { useNavigate } from "react-router-dom";

const TenderCard = ({ title, deadline, location, referenceNo, tenderId}) => {
  const navigate = useNavigate();

  const handleViewDetails = (tenderId) => {
    navigate(`/tender/${tenderId}`, {
      state: { tenderId },
    });
  };

  return (
    <div className="bg-white shadow-lg rounded p-6 mb-4 border-[2px] border-black/20">
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <span className="h-8 px-2 py-1 mb-2 ml-3 mr-2 font-bold text-white bg-green-500 rounded">
          Live
        </span>
      </div>
      <p className="mb-4 text-gray-600">Deadline: {deadline}</p>
      <p className="mb-4 text-gray-600">{location}</p>
      <p className="mb-4 text-gray-600">TOT Reference No.: {referenceNo}</p>

      <button
        className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black linear"
        onClick={() => handleViewDetails(tenderId)}
      >
        View Details
      </button>
    </div>
  );
};

const GemListing = () => {
  const [countries, setCountries] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedFundingAgency, setSelectedFundingAgency] = useState("");
  const [selectedGeoPolitical, setSelectedGeoPolitical] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [tenderData, setTenderData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleFundingAgencyChange = (e) => {
    setSelectedFundingAgency(e.target.value);
  };

  const handleGeoPoliticalChange = (e) => {
    setSelectedGeoPolitical(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const region = encodeURIComponent(selectedRegion);
        const country = encodeURIComponent(selectedCountry);
        const financier = encodeURIComponent(selectedFundingAgency);
        const geopolitical = encodeURIComponent(selectedGeoPolitical);
        const product = encodeURIComponent(selectedProduct);

        const baseUrl = "http://localhost:5000/apiTender/tenderdetails/search";

        const detailsArray = [
          "summary",
          "procurementSummary.deadline",
          "procurementSummary.country",
          "otherInformation.totNo",
          "tenderId"
        ];

        let searchUrl = `${baseUrl}?`;

        if (region) {
          searchUrl += `&region=${region}`;
        }
        if (country) {
          searchUrl += `&country=${country}`;
        }
        if (financier) {
          searchUrl += `&financier=${financier}`;
        }
        if (geopolitical) {
          searchUrl += `&geopolitical=${geopolitical}`;
        }
        if (product) {
          searchUrl += `&product=${product}`;
        }

        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          auth: token,
        };

        const response = await axios.post(searchUrl, { details: detailsArray }, { headers });
        console.log(response, 'gems')
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
    selectedFundingAgency,
    selectedGeoPolitical,
    selectedProduct,
    selectedRegion,
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
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="p-4 mx-auto max-w-7xl">
            <h1 className="my-4 text-2xl font-bold">
              Gem Tenders
            </h1>
        <div className="flex flex-col-reverse gap-4 md:grid sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-2 md:col-span-2">
            {currentItems.length > 0 ? (
              <div>
                {currentItems.map((tender, index) => (
                  <TenderCard
                    key={index}
                    title={tender.summary}
                    deadline={formatDate(tender.procurementSummary.deadline)}
                    location={tender.procurementSummary.country}
                    referenceNo={tender.otherInformation.totNo}
                    tenderId={tender.tenderId}
                  />
                ))}
                <div className="flex justify-between mt-10">
                  <button
                    className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous Page
                  </button>

                  <div>
                    {getPageNumbers().map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`${pageNumber === currentPage
                          ? "bg-red-700 text-white"
                          : "bg-gray-200 text-gray-700"
                          } font-bold py-2 px-4 rounded mr-2`}
                        onClick={() => goToPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentItems.length < itemsPerPage}
                  >
                    Next Page
                  </button>
                </div>
              </div>
            ) : (
              <p>No tenders found.</p>
            )}
          </div>

          <div className="">
            <div className="p-4 border border-gray-300 rounded border-[2px] border-black/20 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">Filter Tenders</h2>
              <div className="mb-4">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Regions</option>
                  {Object.keys(regionData).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fundingAgency"
                  className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                  Funding Agency
                </label>
                <select
                  id="fundingAgency"
                  name="fundingAgency"
                  value={selectedFundingAgency}
                  onChange={handleFundingAgencyChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Funding Agencies</option>
                  <option value="Abu Dhabi Fund for Development (ADFD)">
                    Abu Dhabi Fund for Development (ADFD) Tenders
                  </option>
                  <option value="Agence Francaise De Development (AFD)">
                    Agence Francaise De Development (AFD) Tenders
                  </option>
                  <option value="Asian Development Bank (ADB)">
                    Asian Development Bank (ADB) Tenders
                  </option>
                  <option value="Caribbean Development Bank (CDB)">
                    Caribbean Development Bank (CDB) Tenders
                  </option>
                  <option value="European Commission">
                    European Commission Tenders
                  </option>
                  <option value="Inter-American Development Bank">
                    Inter-American Development Bank Tenders
                  </option>
                  <option value="Islamic Development Bank (ISDB)">
                    Islamic Development Bank (ISDB) Tenders
                  </option>
                  <option value="World Bank (WB)">World Bank (WB) Tenders</option>
                  <option value="World Health Organization (WHO)">
                    {" "}
                    World Health Organization (WHO) Tenders
                  </option>

                  {/* Add more funding agencies */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                  Tenders By Geo-Political Region
                </label>
                <select
                  id="product"
                  name="product"
                  value={selectedGeoPolitical}
                  onChange={handleGeoPoliticalChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Geo-Political Region</option>
                  {Object.keys(geopoliticalData).map((key) => (
                    <option key={key} value={key}>
                      {key} Tenders
                    </option>
                  ))}
                </select>

              </div>
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                  Tenders By Sector
                </label>
                <select
                  id="product"
                  name="product"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Products</option>
                  <option value="Rehabilitation">Rehabilitation Tenders</option>
                  <option value="Medical Equipment">
                    Medical Equipment Tenders
                  </option>
                  <option value="Bank">Bank Tenders</option>
                  <option value="Cleaning">Cleaning Tenders</option>
                  <option value="Construction">Construction Tenders</option>
                  <option value="Defence">Defence Tenders</option>
                  <option value="Electrical">Electrical Tenders</option>
                  <option value="Security">Security Tenders</option>
                  <option value="Transport">Transport Tenders</option>
                  <option value="Airport">Airport Tenders</option>
                  <option value="CCTV">CCTV Tenders</option>
                  <option value="Education">Education Tenders</option>
                  <option value="Energy">Energy Tenders</option>
                  <option value="Healthcare">Healthcare Tenders</option>
                  <option value="HR">HR Tenders</option>
                  <option value="Insurance">Insurance Tenders</option>
                  <option value="IT">IT Tenders</option>
                  <option value="Medical">Medical Tenders</option>
                  <option value="Mining">Mining Tenders</option>
                  <option value="Oil And Gas">Oil And Gas Tenders</option>
                  <option value="Printing">Printing Tenders</option>
                  <option value="Solar">Solar Tenders</option>
                  <option value="Sports">Sports Tenders</option>
                  <option value="Telecom">Telecom Tenders</option>
                  <option value="Tourism">Tourism Tenders</option>
                  <option value="Training">Training Tenders</option>
                </select>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GemListing;
