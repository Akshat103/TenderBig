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
        <h2 className="mb-4 text-xl font-bold ">Partnership Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="relative block mb-2 font-semibold">
            Company Profile
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="companyProfile"
              value={formData.companyProfile}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Profile"
            />
          </label>
          <label className="relative block mb-2 font-semibold">
            Partnership Project Tender
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="partnershipProjectTender"
              value={formData.partnershipProjectTender}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Name"
            />
          </label>
          <label className="relative block mb-2 font-semibold">
            Volume
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="number"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Volume"
            />
          </label>

          <label className="relative block mb-2 font-semibold">
            Partnership Ratio
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="partnershipRatio"
              value={formData.partnershipRatio}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Partnership Ratio"
            />
          </label>

          <label className="relative block mb-2 font-semibold">
            Start Date
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </label>

          <label className="relative block mb-2 font-semibold">
            End Date
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </label>

          <div>
            <label className="block mb-2 font-semibold">
              Requirement
              <span className="relative top-0 right-0 text-red-700">*</span>
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
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Manpower Requirement & Worker Experience"
              />
            )}
          </div>


          <label className="relative block mb-2 font-semibold">
            Other Description
            <span className="relative top-0 right-0 text-red-700">*</span>
            <textarea
              required
              name="otherDescription"
              value={formData.otherDescription}
              onChange={handleChange}
              className="w-full h-20 px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm resize-none focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Other Requirements"
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
              className="px-4 py-2 mt-8 text-white bg-black rounded align-center"
            >
              Previous
            </button>
          </div>
          <div className="w-3/4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-2/4 px-4 py-2 mx-6 mt-8 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
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
