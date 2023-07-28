import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getCountries, getStatesByCountry, getCitiesByCountryAndState } from '../../../../utils/CountryData';

const Step1 = ({ formData, handleChange, handleNext }) => {

    const countryNames = getCountries();

    let stateNames = [];
    if (formData.country) {
        stateNames = getStatesByCountry(formData.country);
    }

    let cityNames = [];
    if (formData.country && formData.state) {
        cityNames = getCitiesByCountryAndState(formData.country, formData.state);
    }

    return (
        <div>
            <div className="p-2 rounded-lg">
                <h2 className="mb-4 text-xl font-bold ">Company Details</h2>
                <div className="grid grid-cols-2 gap-4 ">
                    <label className="relative block mb-2 font-semibold">
                        Project/Tender Name
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="projectTenderName"
                            value={formData.projectTenderName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Name"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Company Name
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="url"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Company Name"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        PAN Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter PAN"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        GST Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="gst"
                            value={formData.gst}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter GST"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Website
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Website Url"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Work Ratio
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="workRatio"
                            value={formData.workRatio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Ratio"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Company Email
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="email"
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Email"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Company Contact Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
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
                    <label className="relative block mb-2 font-semibold">
                        CIN
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="cin"
                            value={formData.cin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter CIN"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Company Registration Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="companyRegNo"
                            value={formData.companyRegNo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Registration Number"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Company Address
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Address"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Country
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <select
                            required
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        >
                            <option value="">Select a country</option>
                            {countryNames.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="relative block mb-2 font-semibold">
                        State
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <select
                            required
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        >
                            <option value="">Select a state</option>
                            {stateNames.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="relative block mb-2 font-semibold">
                        City
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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

                    <label className="relative block mb-2 font-semibold">
                        ZIP Code
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter ZIP"
                        />
                    </label>
                    <label className="relative block mb-2 font-semibold">
                        Tender Name
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="text"
                            name="tenderName"
                            value={formData.tenderName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Enter Name"
                        />
                    </label>
                </div>
            </div>

            <div className="flex justify-end w-full">
                <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 mt-8 text-white bg-black rounded align-center"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default Step1;
