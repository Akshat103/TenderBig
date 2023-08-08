import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
const Step1 = ({ formData, handleChange, handleNext }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const updateLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  };

  useEffect(() => {
    updateLoginStatus(); // Update login status on initial render
  }, []);
  return (
    <div>
      <h2 className="mt-4 mb-4 text-2xl font-bold text-center ">Auction Material</h2>
      <p className="font-serif text-sm font-thin text-red-700">
        Fields marked with an asterisk (*) are mandatory.
      </p>
      <div className="p-2 rounded-lg">
        <div className="grid grid-cols-2 gap-4 ">
          <label className="relative block mb-2 font-semibold">
            Tender Number
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="tenderNumber"
              value={formData.tenderNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Tender Number"
            />
          </label>
          <label className="relative block mb-2 font-semibold">
            Tender Link
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="url"
              name="tenderLink"
              value={formData.tenderLink}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Tender Link"
            />
          </label>
          <label className="relative block mb-2 font-semibold">
            Comapny Name
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Company Name"
            />
          </label>
          <label className="relative block mb-2 font-semibold">
            CIN/Registration Number
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="cinReg"
              value={formData.cinReg}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Number"
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
        </div>
      </div>

          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={handleNext}
              disabled={ !isLoggedIn}
              className="px-4 py-2 mt-8 text-white bg-black rounded hover:bg-red-800 align-center"
            >
              Next
            </button>
            {!isLoggedIn && (
                <p className="mt-2 text-center">
                  <NavLink to="/login" className="text-red-700 hover:underline">
                    Login to proceed
                  </NavLink>
                </p>
              )}
      </div>

    </div>
  );
};

export default Step1;
