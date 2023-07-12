import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step1 = ({ formData, handleChange, handleNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center ">Auction Material</h2>
      <p className="text-red-700 font-thin font-serif text-sm">
        Fields marked with an asterisk (*) are mandatory.
      </p>
      <div className="p-2 rounded-lg">
        <div className=" grid grid-cols-2 gap-4 ">
          <label className="block mb-2 font-semibold relative">
            Tender Number
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="text"
              name="tenderNumber"
              value={formData.tenderNumber}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Tender Number"
            />
          </label>
          <label className="block mb-2 font-semibold relative">
            Tender Link
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="url"
              name="tenderLink"
              value={formData.tenderLink}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Tender Link"
            />
          </label>
          <label className="block mb-2 font-semibold relative">
            Comapny Name
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Company Name"
            />
          </label>
          <label className="block mb-2 font-semibold relative">
            CIN/Registration Number
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="number"
              name="cinReg"
              value={formData.cinReg}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Number"
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
