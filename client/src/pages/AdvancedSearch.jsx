import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { locations } from "../constants/countriesData"
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


const TenderCard = ({ tender }) => {

  const navigate = useNavigate();
  
  const handleViewDetails = (referenceNo) => {
    navigate(`/tender/${referenceNo}`, {
      state: { referenceNo },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-full rounded-lg overflow-hidden mb-4 bg-white shadow-lg p-4 border-[2px]">
    <div className="px-6 py-4">
      <div className="flex justify-between">
        <div className="font-bold text-xl mb-2">{tender.procurementSummary.summary}</div>
        <span
          className={`${
            new Date(tender.procurementSummary.deadline) < new Date() ? 'bg-red-700' : 'bg-green-500'
          } text-white font-bold py-1 px-2 rounded mr-2 mb-2 h-8 ml-3`}
        >
          {new Date(tender.procurementSummary.deadline) < new Date() ? 'Closed' : 'Live'}
        </span>
      </div>
      <p className="text-gray-700 text-base">
        <strong>Deadline:</strong> {formatDate(tender.procurementSummary.deadline)}
      </p>
      <p className="text-gray-700 text-base">
        <strong>Location:</strong> {tender.procurementSummary.city}, {tender.procurementSummary.country}
      </p>
      <p className="text-gray-700 text-base">
        <strong>Product:</strong> {tender.product}
      </p>
      <button
        className="bg-red-700 hover:bg-red-700 text-white font-bold mt-2 py-1 px-2 rounded transition-colors"
        onClick={() => handleViewDetails(tender.tenderId)}
      >
        View Details
      </button>
    </div>
  </div>
  );
};


const AdvancedSearchForm = () => {

  const [selectedLocation, setSelectedLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const keywords = useSelector((state) => state.keywords);
  const [formData, setFormData] = useState({
    totNo: '',
    documentNo: '',
    location: '',
    sector: '',
    cpvNo: '',
    finance: '',
    deadlineFrom: '',
    deadlineTo: '',
    postingFrom: '',
    postingTo: '',
    purchaserName: '',
    year: '',
    keywords: []
  });

  const clearState = () => {
    setFormData({
      totNo: '',
      documentNo: '',
      location: '',
      sector: '',
      cpvNo: '',
      finance: '',
      deadlineFrom: '',
      deadlineTo: '',
      postingFrom: '',
      postingTo: '',
      purchaserName: '',
      year: '',
      keywords: []
    });
    setSelectedLocation('');
  }


  useEffect(() => {
    const fetchByKeywords = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          auth: token,
        };

        const body = {
          keywords: keywords,
          details: [
            'procurementSummary.summary',
            'procurementSummary.deadline',
            'procurementSummary.city',
            'procurementSummary.country',
            'product',
            'tenderId',
          ],
        };

        const response = await axios.post('http://localhost:5000/apitender/tenderdetails/advance-search', body, { headers });
        console.log(response.data);
        setTenderDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchByKeywords();
  }, [keywords]);



  const handleLocationChange = (event) => {
    const inputValue = event.target.value;
    setSelectedLocation(inputValue);
    setShowDropdown(inputValue !== '');
  };

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'keywords') {
      // Handle keywords array differently
      setFormData((prevState) => ({
        ...prevState,
        keywords: value.split(',').map(keyword => keyword.trim())
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const [tenderDetails, setTenderDetails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      auth: token,
    };

    // Create a new object with only the non-empty fields
    const filteredFormData = {};
    for (const key in formData) {
      if (formData[key] !== '') {
        filteredFormData[key] = formData[key];
      }
    }

    // Add the selected location to the filteredFormData
    filteredFormData.location = selectedLocation;

    // Add the details array to the filteredFormData
    filteredFormData.details = [
      "procurementSummary.summary",
      "procurementSummary.deadline",
      "procurementSummary.city",
      "procurementSummary.country",
      "product",
      "tenderId",
    ];

    try {
      const response = await axios.post('http://localhost:5000/apitender/tenderdetails/advance-search', filteredFormData, { headers });
      console.log(response.data);
      setTenderDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow border-[1px]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-[#414141]">Advanced Search</h1>
          <p className="text-gray-600 my-2">You can perform advanced search using the form below</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
            <div className="flex items-center">
              <label htmlFor="totNo" className="w-full md:w-1/4">
                Tot No:
              </label>
              <input
                id="totNo"
                name="totNo"
                type="text"
                placeholder="Enter Tot No"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="documentNo" className="w-full md:w-1/4">
                Document No:
              </label>
              <input
                id="documentNo"
                name="documentNo"
                type="text"
                placeholder="Enter Document No"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="location" className="w-full md:w-1/4">
                Location:
              </label>
              <div className="relative w-full md:w-3/4">
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  onFocus={() => setShowDropdown(selectedLocation !== '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="Search for a location"
                />
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded shadow">
                    {filteredLocations.map((location) => (
                      <div
                        key={location}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowDropdown(false);
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label htmlFor="sector" className="w-full md:w-1/4">
                Sector:
              </label>
              <input
                id="sector"
                name="sector"
                type="text"
                placeholder="Enter Sector"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="cpvNo" className="w-full md:w-1/4">
                CPV No:
              </label>
              <input
                id="cpvNo"
                name="cpvNo"
                type="text"
                placeholder="Enter CPV No"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="finance" className="w-full md:w-1/4">
                Finance:
              </label>
              <input
                id="finance"
                name="finance"
                type="text"
                placeholder="Enter Finance"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="deadlineFrom" className="w-full md:w-1/4">
                Deadline From:
              </label>
              <input
                id="deadlineFrom"
                name="deadlineFrom"
                type="date"
                placeholder="Enter Deadline From"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="deadlineTo" className="w-full md:w-1/4">
                Deadline To:
              </label>
              <input
                id="deadlineTo"
                name="deadlineTo"
                type="date"
                placeholder="Enter Deadline To"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="postingFrom" className="w-full md:w-1/4">
                Posting From:
              </label>
              <input
                id="postingFrom"
                name="postingFrom"
                type="date"
                placeholder="Enter Posting From"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="postingTo" className="w-full md:w-1/4">
                Posting To:
              </label>
              <input
                id="postingTo"
                name="postingTo"
                type="date"
                placeholder="Enter Posting To"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="purchaserName" className="w-full md:w-1/4">
                Purchaser Name:
              </label>
              <input
                id="purchaserName"
                name="purchaserName"
                type="text"
                placeholder="Enter Purchaser Name"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="year" className="w-full md:w-1/4">
                Year:
              </label>
              <input
                id="year"
                name="year"
                type="text"
                placeholder="Enter Year"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="keywords" className="w-full md:w-1/4">
                Keywords:
              </label>
              <input
                id="keywords"
                name="keywords"
                type="text"
                placeholder="Enter Keywords"
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-red-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              Search
            </button>
            <button
              type="reset"
              className="ml-4 px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => clearState()}
            >
              Reset
            </button>
          </div>
        </form>

      </div>
      {tenderDetails.length > 0 && (
        <div className="mt-4 container">
          {tenderDetails.map((tender) => (
            <TenderCard key={tender.tenderId} tender={tender} />
          ))}
        </div>
      )}
    </div>
  </>
  );
};

export default AdvancedSearchForm;