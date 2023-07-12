import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Country, State, City } from 'country-state-city';

const Step1 = ({ formData, handleChange, handleNext }) => {
    const countryData = Country.getAllCountries();
    const countryNames = Object.values(countryData).map((country) => country.name);

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

    return (
        <div>
            <div className="p-2 rounded-lg">
                <h2 className="text-xl font-bold mb-4 ">Company Details</h2>
                <div className=" grid grid-cols-2 gap-4 ">
                    <label className="block mb-2 font-semibold relative">
                        Project/Tender Name
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="projectTenderName"
                            value={formData.projectTenderName}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Name"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Company Name
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="url"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Company Name"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        PAN Number
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="number"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter PAN"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        GST Number
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="number"
                            name="gst"
                            value={formData.gst}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter GST"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Website
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Website Url"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Work Ratio
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="workRatio"
                            value={formData.workRatio}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Ratio"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Company Email
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="email"
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Email"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Company Contact Number
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            name="companyContactNo"
                            value={formData.companyContactNo}
                            placeholder="Enter Number"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        CIN
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="cin"
                            value={formData.cin}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter CIN"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Company Registration Number
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="companyRegNo"
                            value={formData.companyRegNo}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Registration Number"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Company Address
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Address"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
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

                    <label className="block mb-2 font-semibold relative">
                        State
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

                    <label className="block mb-2 font-semibold relative">
                        City
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                        required
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

                    <label className="block mb-2 font-semibold relative">
                        ZIP Code
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter ZIP"
                        />
                    </label>
                    <label className="block mb-2 font-semibold relative">
                        Tender Name
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            required
                            type="text"
                            name="tenderName"
                            value={formData.tenderName}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Name"
                        />
                    </label>
                </div>
            </div>

            <div className="flex justify-end w-full">
                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 mt-8 rounded align-center"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

        </div>
    );
};

export default Step1;
