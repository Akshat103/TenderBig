import React, { useState, useEffect } from "react";
import axios from "axios";
import {regionData, geopoliticalData} from "../constants/countriesData.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TenderImg from '../Admin/images/tender-hero.jpg'

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
        className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black linear "
        onClick={() => handleViewDetails(tenderId)}
      >
        View Details
      </button>
    </div>
  );
};

export const tenderBysectorProducts = [
  // {value: "", name: 'All Products'},
  {value: "Rehabilitation", name: 'Rehabilitation Tenders'},
  {value: "Medical Equipment", name: 'Medical Equipment Tenders'},
  {value: "Bank", name: 'Bank Tenders'},
  {value: "Cleaning", name: 'Cleaning Tenders'},
  {value: "Construction", name: 'Construction Tenders'},
  {value: "Defence", name: 'Defence Tenders'},
  {value: "Electrical", name: 'Electrical Tenders'},
  {value: "Security", name: 'Security Tenders'},
  {value: "Transport", name: 'Transport Tenders'},
  {value: "Airport", name: 'Airport Tenders'},
  {value: "CCTV", name: 'CCTV Tenders'},
  {value: "Education", name: 'Education Tenders'},
  {value: "Energy", name: 'Energy Tenders'},
  {value: "Healthcare", name: 'Healthcare Tenders'},
  {value: "HR", name: 'HR Tenders'},
  {value: "Insurance", name: 'Insurance Tenders'},
  {value: "IT", name: 'IT Tenders'},
  {value: "Medical", name: 'Medical Tenders'},
  {value: "Mining", name: 'Mining Tenders'},
  {value: "Oil And Gas", name: 'Oil And Gas Tender'},
  {value: "Printing", name: 'Printing Tenders'},
  {value: "Solar", name: 'Solar Tenders'},
  {value: "Sports", name: 'Sports Tenders'},
  {value: "Telecom", name: 'Telecom Tenders'},
  {value: "Tourism", name: 'Tourism Tenders'},
  {value: "Training", name: 'Training Tenders'}]

  export const fundingAgencies = [
    // {value:"", name:'All Funding Agencies'},
    {value:"Abu Dhabi Fund for Development (ADFD)"
      ,name:"Abu Dhabi Fund for Development (ADFD) "},
    {value:"Agence Francaise De Development (AFD)",
      name:"Agence Francaise De Development (AFD) "
  },
    {value:"Asian Development Bank (ADB)",
      name:"Asian Development Bank (ADB) "},
    {value:"Caribbean Development Bank (CDB)",
     name:" Caribbean Development Bank (CDB) "},
    {value:"European Commission",
     name: "European Commission "},
    {value:"Inter-American Development Bank",
      name:"Inter-American Development Bank "},
    {value:"Islamic Development Bank (ISDB)",
     name:" Islamic Development Bank (ISDB) "},
    {value:"World Bank (WB)",name:"World Bank (WB) "},
    {value:"World Health Organization (WHO)",
      name: "World Health Organization (WHO) "
    }
  ]

const TenderListingPage = () => {
  const [countries, setCountries] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedFundingAgency, setSelectedFundingAgency] = useState("");
  const [selectedGeoPolitical, setSelectedGeoPolitical] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedUserCategory, setUserCategory] = useState("");
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

  const handleUserCategoryChange = (e) => {
    setUserCategory(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const region = encodeURIComponent(selectedRegion);
        const country = encodeURIComponent(selectedCountry);
        const financier = encodeURIComponent(selectedFundingAgency);
        const geopolitical = encodeURIComponent(selectedGeoPolitical);
        const product = encodeURIComponent(selectedProduct);
        const userCategory =  encodeURIComponent(selectedUserCategory);

        const baseUrl = "http://localhost:5000/apitender/tenderdetails/search";

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
        if(userCategory){
          searchUrl += `&userCategory=${userCategory}`;
        }

        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          auth: token,
        };

        const response = await axios.post(searchUrl, { details: detailsArray }, { headers });

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
    selectedRegion,
    selectedCountry,
    selectedFundingAgency,
    selectedGeoPolitical,
    selectedProduct,
    selectedRegion,
    selectedUserCategory
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

 

 

  const userTenderCategory = [
    // {value:"", name: 'All'}, 
    {value:"contractor", name: 'Contractor'}, 
    {value:"subcontractor", name: 'Sub Contractor '}, 
    {value:"government", name: 'Government'}, 
    {value:"private", name: 'Private'}, 
  ]

  return (
    <>
      <div className="p-4 mx-auto max-w-7xl">
      
     
      <h1 className="my-4 text-3xl font-bold text-center">
            About Tenders
          </h1>
        <img src={TenderImg} alt="tender_img" className="h-auto md:h-[600px] w-full my-5" />
            
        <div className="my-10">
          
          <div className="text-xl leading-8 text-center">
            The procurement of goods and services often involves a competitive bid process. This method requires 
            participants to submit sealed envelopes containing comprehensive information regarding the price and 
            terms of their respective offers. Following the submission, the recipient carefully evaluates the 
            proposals and ultimately chooses the bidder who has presented the most favorable terms or the lowest price.
          </div>
        </div>
        
        <h1 className="my-4 text-3xl font-bold text-center">
          Online Tenders, Tenders Website, Bids & Tenders
        </h1>
        <div className="flex flex-col-reverse gap-10 md:grid sm:grid-cols-2 md:grid-cols-3">
    

        <div className="">
            <div className="">
              <h2 className="mb-2 text-lg font-bold">Filter Tenders</h2>

              <div className="mb-4 border-[2px] border-black/20 shadow-xl ">
                <label
                  htmlFor="region"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Region
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {Object.keys(regionData).map((region) => (
                  <div className="flex items-center gap-3 text-lg" key={region}>

                  <input type="checkbox" onChange={handleRegionChange} value={region} name={region} />
                  <label>{region}</label>
                  </div>
                  ))}
                </div> */}
                <select
                  id="region"
                  name="region"
                  size={5}
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full px-4 py-2 bg-white "
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
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Country
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {countries.length > 0 ? countries.map((country) => (
                    <div className="flex items-center gap-3 text-lg" key={country}>

                    <input type="checkbox" onChange={handleCountryChange} value={country}  name={country} />
                    <label>{country}</label>
                    </div>
                    )) : (
                      <div>Select region first</div>
                    )}
                </div> */}
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
                  htmlFor="fundingAgency"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Funding Agency
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {fundingAgencies.map((agency) => (
                    <div className="flex items-center gap-3 text-lg" key={agency.name}>

                    <input type="checkbox" onChange={handleFundingAgencyChange} value={agency.value}  name={agency.name} />
                    <label>{agency.name}</label>
                    </div>
                  ))}
                </div> */}
                <select
                  id="fundingAgency"
                  name="fundingAgency"
                  size={5}
                  value={selectedFundingAgency}
                  onChange={handleFundingAgencyChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Funding Agencies</option>
                  {fundingAgencies.map((agency) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={agency.name} value={agency.value}>
                      {agency.name}
                    </option>
                  ))}
                  {/* <option value="Abu Dhabi Fund for Development (ADFD)">
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
                  </option> */}

                </select>
                
              </div>

              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
              <label
                  htmlFor="product"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Tenders By Geo-Political Region
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {Object.keys(geopoliticalData).map((geopoliticalDataObj) => (
                    <div className="flex items-center gap-3 text-lg" key={geopoliticalDataObj}>

                    <input type="checkbox" onChange={handleGeoPoliticalChange} value={geopoliticalDataObj}  name={geopoliticalDataObj} />
                    <label>{geopoliticalDataObj} Tenders</label>
                    </div>
                  ))}
                </div> */}
                <select
                  id="product"
                  name="product"
                  size={5}
                  value={selectedGeoPolitical}
                  onChange={handleGeoPoliticalChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Geo-Political Region</option>
                  {Object.keys(geopoliticalData).map((key) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={key} value={key}>
                      {key} Tenders
                    </option>
                  ))}
                </select>

              </div>

              
              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
                <label
                  htmlFor="region"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Tenders By Sector
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {tenderBysectorProducts.map((tenderBySectorProductObj) => (
                    <div className="flex items-center gap-3 text-lg" key={tenderBySectorProductObj.name}>

                    <input type="checkbox" onChange={handleProductChange} value={tenderBySectorProductObj.value}  name={tenderBySectorProductObj.name} />
                    <label>{tenderBySectorProductObj.name}</label>
                    </div>
                  ))}
                </div> */}

                <select
                  id="product"
                  name="product"
                  size={5}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Products</option>
                  {tenderBysectorProducts.map((tenderBySectorProductObj) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={tenderBySectorProductObj.name} value={tenderBySectorProductObj.value}>
                      {tenderBySectorProductObj.name}
                    </option>
                  ))}
                  
                  {/* <option value="Rehabilitation">Rehabilitation Tenders</option>
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
                  <option value="Training">Training Tenders</option> */}
                </select>
              </div>

              
              <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
                <label
                  htmlFor="product"
                  className="block text-xl font-bold text-gray-700 mb-0.5 px-4 py-3 text-white bg-black"
                >
                  Tenders By
                </label>
                {/* <div className="flex flex-col items-start mt-4 gap-x-4 gap-y-1 h-[150px] overflow-y-scroll px-4 mb-4">
                  {userTenderCategory.map((userTenderCategoryObj) => (
                    <div className="flex items-center gap-3 text-lg" key={userTenderCategoryObj.name}>

                    <input type="checkbox" onChange={handleUserCategoryChange} value={userTenderCategoryObj.value}  name={userTenderCategoryObj.name} />
                    <label>{userTenderCategoryObj.name}</label>
                    </div>
                  ))}
                </div> */}
                
                <select
                  id="tenderby"
                  name="tenderby"
                  size={5}
                  value={selectedUserCategory}
                  onChange={handleUserCategoryChange}
                  className="w-full px-4 py-2 bg-white"
                >
                  <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All </option>
                  {userTenderCategory.map((userTenderCategoryObj) => (
                    <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={userTenderCategoryObj.name} value={userTenderCategoryObj.value}>
                      {userTenderCategoryObj.name}
                    </option>
                  ))}
                  {/* <option value="contractor">Contractor </option>
                  <option value="subcontractor">Sub Contractor </option>
                  <option value="government">Government </option>
                  <option value="private">Private </option> */}

                </select>
              </div>
              
              <div className="mb-4">

              </div>
            </div>
          </div>


          <div className="mt-8 sm:col-span-2 md:col-span-2">
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

          



          
        </div>
      </div>
    </>
  );
};

export default TenderListingPage;
