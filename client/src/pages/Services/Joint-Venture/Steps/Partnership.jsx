import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step4 = ({ formData, handleChange, handleSubmit, handlePrevious }) => {
  const [requirement, setRequirement] = useState('');

  const handleRadioChange = (e) => {
    handleChange(e);
    setRequirement(e.target.value);
  };

  return (
    <div className="mt-4">
      <div className="p-2 rounded-lg">
        <h2 className="text-xl font-bold mb-4 ">Partnership Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="block mb-2 font-semibold relative">
            Company Profile
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="text"
              name="companyProfile"
              value={formData.companyProfile}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Profile"
            />
          </label>
          <label className="block mb-2 font-semibold relative">
            Partnership Project Tender
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="text"
              name="partnershipProjectTender"
              value={formData.partnershipProjectTender}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Name"
            />
          </label>
          <label className="block mb-2 font-semibold relative">
            Volume
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="number"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Volume"
            />
          </label>

          <label className="block mb-2 font-semibold relative">
            Partnership Ratio
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="text"
              name="partnershipRatio"
              value={formData.partnershipRatio}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Partnership Ratio"
            />
          </label>

          <label className="block mb-2 font-semibold relative">
            Start Date
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </label>

          <label className="block mb-2 font-semibold relative">
            End Date
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input
              required
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </label>

          <div>
            <label className="block mb-2 font-semibold">
              Requirement
              <span className="text-red-700 relative top-0 right-0">*</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="requirement"
                value="finance"
                onChange={handleRadioChange}
                className="mr-2"
              />
              Finance
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="requirement"
                value="manpower"
                onChange={handleRadioChange}
                className="mr-2"
              />
              Manpower
            </label>
            {formData.requirement === 'finance' && (
              <input
                required
                type="text"
                name="requirement.finance"
                value={formData.requirement.finance}
                onChange={handleChange}
                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Finance Requirement"
              />
            )}
            {formData.requirement === 'manpower' && (
              <input
                required
                type="text"
                name="requirement.manpower"
                value={formData.requirement.manpower}
                onChange={handleChange}
                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Manpower Requirement & Worker Experience"
              />
            )}
          </div>


          <label className="block mb-2 font-semibold relative">
            Other Description
            <span className="text-red-700 relative top-0 right-0">*</span>
            <textarea
              required
              name="otherDescription"
              value={formData.otherDescription}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none h-20 resize-none"
              placeholder="Other Requirements"
            />
          </label>

        </div>

      </div>

      <div className="center flex flex-col items-center">
        <div className="flex justify-between w-full">
          <div className="w-1/4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 mt-8 rounded align-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div className="w-3/4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-red-700 mx-6 text-white px-4 py-2 mt-8 rounded-lg font-semibold hover:bg-red-800 w-2/4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
