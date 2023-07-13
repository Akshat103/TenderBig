import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Country, State, City } from 'country-state-city';

const Step4 = ({ formData, handleChange, handleNext, handlePrevious }) => {
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
    <div className="mt-4">
          <h2 className="mt-4 mb-4 text-2xl font-bold text-center ">Auction Material</h2>
      <div className="p-2 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <label className="relative block mb-2 font-semibold">
            Address
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
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
            Website
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Site Url"
            />
          </label>

          <label className="relative block mb-2 font-semibold">
            Project Mail ID
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="email"
              name="projectMailId"
              value={formData.projectMailId}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Mail"
            />
          </label>

          <label className="relative block mb-2 font-semibold">
            Contact Person Name
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Name"
            />
          </label>

          <label className="block mb-2 font-semibold">
            Contact Person Number
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="contactPersonNumber"
              value={formData.contactPersonNumber}
              placeholder="Enter Phone Number"
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center center">
        <div className="flex justify-between w-full">
          <div className="w-1/4">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 mt-8 text-white bg-black rounded hover:bg-red-800 align-center"
            >
              Previous
            </button>
          </div>
          <div className="flex justify-end w-1/4">
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 mt-8 text-white bg-black rounded hover:bg-red-800 align-center"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step4;
