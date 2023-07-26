
import { useEffect, useState } from "react";
import { locations } from "../../../../constants/countriesData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Country, State, City } from 'country-state-city';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Forms = () => {

    const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

    const countryData = Country.getAllCountries();  //
    const countryNames = Object.values(countryData).map((country) => country.name);
    const [formData, setFormData] = useState({
        summary: "",
        BRR: "",
        Authority: "",
        userCategory: "admin",
        TendorNo: "",
        TenderId: "",
        country: "",
        state: "",
        city: "",
        deadline: "",
        contractValue: "",
        tenderValue: "",
        description: "",
        sector:""
    });

    let stateNames = [];
    if (formData.country) {
        const countryCode = countryData.find((country) => country.name === formData.country)?.isoCode;
        const stateData = State.getStatesOfCountry(countryCode);
        stateNames = Array.from(new Set(Object.values(stateData).map((state) => state.name)));
    }

    let cityNames = [];
    if (formData.country) {
        const countryCode = countryData.find((country) => country.name === formData.country)?.isoCode;
        const cityData = City.getCitiesOfCountry(countryCode);
        cityNames = Array.from(new Set(Object.values(cityData).map((city) => city.name)));
    }

    const clearInputs = () => {
        setFormData({
            summary: "",
            BRR: "",
            Authority: "",
            userCategory: "admin",
            TendorNo: "",
            TenderId: "",
            country: "",
            state: "",
            city: "",
            deadline: "",
            contractValue: "",
            tenderValue: "",
            description: "",
            sector:""
        });
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [sectors, setSectors] = useState([]);
  
    useEffect(() => {
      // Fetch all sectors
      fetchSectors();
    }, []);
  
    const fetchSectors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/options/alloptions?array=sectors`, { headers });
        setSectors(response.data[0].sectors);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);
        // console.log(requestBody);

        fetch(`${BASE_URL}/tenderresults/add-tenderResults`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert("Submitted")
                clearInputs();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops something went wrong!!!");
            });
    };


    const nextPage = () => {
        setCurrentPage(2);
    };

    const previousPage = () => {
        setCurrentPage(1);
    };

    return (
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}

                        {/* Cards */}
                        <div className="grid grid-cols-15 gap-6">
                            {/*---------> Table (Top Channels) */}

                            <div className="max-w-3xl mx-auto mt-6 px-4 py-8 mb-6 shadow-2xl rounded-lg">
                                {currentPage === 1 && (
                                    <form onSubmit={handleSubmit}>
                                        {/* Global Section */}
                                        <h2 className="text-2xl font-bold mb-4 text-center ">Submit Tender Results</h2>
                                        <p className="text-red-700 font-thin font-serif text-sm">
                                            Fields marked with an asterisk (*) are mandatory.
                                        </p>
                                        <div className="p-2 rounded-lg">
                                            <label className="block mb-2 font-semibold relative">
                                                BRR
                                                <span className="text-red-700 relative top-0 right-0">*</span>
                                                <input
                                                    required
                                                    type="text"
                                                    name="BRR"
                                                    value={formData.BRR}
                                                    onChange={handleChange}
                                                    className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter BRR"
                                                />
                                            </label>
                                            <div className=" grid grid-cols-2 gap-4 ">
                                                <div className="relative">
                                                    <label className="block mb-2 font-semibold">
                                                        Tender Authority
                                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="Authority"
                                                        value={formData.Authority}
                                                        onChange={handleChange}
                                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Authority"
                                                    />
                                                </div>

                                                <label className="block mb-2 font-semibold">
                                                    Tender No
                                                    <input
                                                        type="text"
                                                        name="TendorNo"
                                                        value={formData.TendorNo}
                                                        onChange={handleChange}
                                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Tender No"
                                                    />
                                                </label>

                                                <label className="block mb-2 font-semibold">
                                                    Tender Id
                                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                                    <input required
                                                        type="text"
                                                        name="TenderId"
                                                        value={formData.TenderId}
                                                        onChange={handleChange}
                                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Tender Id"
                                                    />
                                                </label>

                                                <label className="block mb-2 font-semibold">
                                                    Sector
                                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                                    <select required
                                                            name="sector"
                                                            value={formData.sector}
                                                            onChange={handleChange}
                                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        >
                                                            <option value="">Select a sector</option>
                                                            {sectors.map((sector) => (
                                                                <option key={sector} value={sector}>
                                                                    {sector}
                                                                </option>
                                                            ))}
                                                        </select>
                                                </label>
                                            </div>
                                        </div>

                                        {/* procurementSummary and tenderDetail Sections */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Procurement Summary Section */}
                                            <div className=" p-2 rounded-lg mt-2">
                                                <h2 className="text-2xl font-bold mb-4 ">Procurement Summary</h2>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <label className="block font-semibold">
                                                        Country
                                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                                        <select required
                                                            name="country"
                                                            value={formData.country}
                                                            onChange={handleChange}
                                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        >
                                                            <option value="">Select a country</option>
                                                            {countryNames.map((country) => (
                                                                <option key={country} value={country}>
                                                                    {country}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>

                                                    <label className="block font-semibold">
                                                        State
                                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                                        <select
                                                            required
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        >
                                                            <option value="">Select State</option>
                                                            {stateNames.map((state) => (
                                                                <option key={state} value={state}>
                                                                    {state}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-1.5 mb-1.5">
                                                    <label className="block font-semibold">
                                                        City
                                                        <select
                                                            required
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        >
                                                            <option value="">Select City</option>
                                                            {cityNames.map((city) => (
                                                                <option key={city} value={city}>
                                                                    {city}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                    <label className="block font-semibold">
                                                        Deadline
                                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                                        <input required
                                                            type="date"
                                                            name="deadline"
                                                            value={formData.deadline}
                                                            onChange={handleChange}
                                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Enter Deadline"
                                                        />
                                                    </label>
                                                </div>
                                                <label className="block mb-2 font-semibold">
                                                    Summary
                                                    <input
                                                        type="text"
                                                        name="summary"
                                                        value={formData.summary}
                                                        onChange={handleChange}
                                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Summary"
                                                    />
                                                </label>
                                            </div>

                                            {/* tenderDetail Section */}
                                            <div className="p-2 rounded-lg mt-2">
                                                <h2 className="text-2xl font-bold mb-4 ">Tender Detail</h2>
                                                <label className="block mb-2 font-semibold">
                                                    Description
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Description"
                                                    />
                                                </label>
                                                <label className="block mb-2 font-semibold">
                                                    Contract Value
                                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                                    <input required
                                                        type="text"
                                                        name="contractValue"
                                                        value={formData.contractValue}
                                                        onChange={handleChange}
                                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Contract Value"
                                                    />
                                                </label>
                                                <label className="block mb-2 font-semibold">
                                                    Tender Value
                                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                                    <input required
                                                        type="text"
                                                        name="tenderValue"
                                                        value={formData.tenderValue}
                                                        onChange={handleChange}
                                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Enter Tender Value"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="ml-64">
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-8 rounded mx-auto "
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>
                    </div>
    );
};

export default Forms;



