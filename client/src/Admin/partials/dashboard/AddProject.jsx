import { useEffect, useState } from "react";
import { getCountries, getStatesByCountry, getCitiesByCountryAndState } from '../../../utils/CountryData';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddProject = () => {
    const token = localStorage.getItem('token');

    const headers = {
          'auth': token
        };

    useEffect(() => {
        // Fetch all sectors
        fetchSectors();
    }, []);

    const [sectors, setSectors] = useState([]);

    const fetchSectors = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/options/alloptions?array=sectors`, { headers });
            setSectors(response.data[0].sectors);
        } catch (error) {
            console.error(error);
        }
    };

    const [formData, setFormData] = useState({
        pnr: "",
        companyname: "",
        detail: "",
        value: "",
        status: "",
        country: "",
        state: "",
        city: "",
        sector: ""
    });

    const clearInputs = () => {
        setFormData({
            pnr: "",
            companyname: "",
            detail: "",
            value: "",
            status: "",
            country: "",
            state: "",
            city: "",
            sector: ""
        });
    }

    const countryNames = getCountries();

    let stateNames = [];
    if (formData.country) {
      stateNames = getStatesByCountry(formData.country);
    }
  
    let cityNames = [];
    if (formData.country && formData.state) {
      cityNames = getCitiesByCountryAndState(formData.country, formData.state);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        fetch(`${BASE_URL}/projects/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Added")
                clearInputs();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops something went wrong!!!");
            });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div className="grid grid-cols-15 gap-6">
                {/*---------> Table (Top Channels) */}

                <div className="max-w-3xl mx-auto mt-6 px-4 py-8 mb-6 shadow-2xl rounded-lg">
                    <form onSubmit={handleSubmit}>
                        {/* Global Section */}
                        <h2 className="text-2xl font-bold mb-4 text-center ">Add Project</h2>
                        <p className="text-red-700 font-thin font-serif text-sm">
                            Fields marked with an asterisk (*) are mandatory.
                        </p>
                        <div className="p-2 rounded-lg">
                            <label className="block mb-2 font-semibold relative">
                                PNR
                                <span className="text-red-700 relative top-0 right-0">*</span>
                                <input
                                    required
                                    type="text"
                                    name="pnr"
                                    value={formData.pnr}
                                    onChange={handleChange}
                                    className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                    placeholder="Enter PNR"
                                />
                            </label>
                            <div className=" grid grid-cols-2 gap-4 ">
                                <div className="relative">
                                    <label className="block mb-2 font-semibold">
                                        Company Name
                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="companyname"
                                        value={formData.companyname}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <label className="block mb-2 font-semibold">
                                    Project Detail
                                    <input
                                        required
                                        type="text"
                                        name="detail"
                                        value={formData.detail}
                                        onChange={handleChange}
                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Detail"
                                    />
                                </label>

                                <label className="block mb-2 font-semibold">
                                    Project Value
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <input
                                        required
                                        type="number"
                                        name="value"
                                        value={formData.value}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Value"
                                    />
                                </label>
                                <label className="block mb-2 font-semibold">
                                    Project Status
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <input
                                        required
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Status"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className=" p-2 rounded-lg mt-2">
                            <div className="grid grid-cols-2 gap-4">

                                <label className="block mb-2 font-semibold">
                                    Country
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <select
                                        required
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                    >
                                        <option value="">Select a country</option>
                                        {countryNames.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block mb-2 font-semibold">
                                    Project State
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <select
                                        required
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                    >
                                        <option value="">Select a state</option>
                                        {stateNames.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-1.5 mb-1.5">

                                <label className="block mb-2 font-semibold">
                                    City
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter a city"
                                        autoComplete="off"
                                        list="cityNamesList"
                                    />
                                    <datalist id="cityNamesList">
                                        {cityNames.map((city) => (
                                            <option key={city} value={city} />
                                        ))}
                                    </datalist>
                                </label>

                                <label className="block font-semibold">
                                    Sector
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <select
                                        required
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                    >
                                        <option value="">Select Sector</option>
                                        {sectors.map((sector) => (
                                            <option key={sector} value={sector}>
                                                {sector}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                        </div>
                        <div className="w-3/4">

                            <button
                                type="submit"
                                className="bg-[#182235] hover:bg-[#111a2b] mx-6 text-white px-4 py-2 mt-8 rounded-lg font-semibold w-2/4"
                            >
                                Submit
                            </button>

                        </div>
                    </form>

                </div>

            </div>
        </div>

    );
};

export default AddProject;




