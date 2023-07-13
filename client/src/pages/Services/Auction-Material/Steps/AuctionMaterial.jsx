import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Step5 = ({ formData, handleChange, handleSubmit, handlePrevious, auctionMaterials }) => {
  const [inputArray, setInputArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    // Check if the option has already been selected
    if (!selectedOptions.includes(selectedValue)) {
      // Add the selected value to the inputArray
      const newInputArray = [...inputArray, selectedValue];
      setInputArray(newInputArray);

      // Update selectedOptions and formData.auctionMaterial
      const newSelectedOptions = [...selectedOptions, selectedValue];
      setSelectedOptions(newSelectedOptions);
      handleChange({
        target: {
          name: 'auctionMaterial',
          value: newSelectedOptions.join(', '), // Store the selected options as a comma-separated string
        },
      });
    }
  };

  const handleRemoveString = (index) => {
    const removedValue = inputArray[index];
    const newArray = [...inputArray];
    newArray.splice(index, 1);
    setInputArray(newArray);

    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== removedValue
    );
    setSelectedOptions(newSelectedOptions);
    handleChange({
      target: {
        name: 'auctionMaterial',
        value: newSelectedOptions.join(', '), // Update formData.auctionMaterial after removing the value
      },
    });
  };

  // Function to split the inputArray into rows of up to 5 elements
  const splitIntoRows = (array, rowSize) => {
    return array.reduce((acc, _, index) => {
      if (index % rowSize === 0) acc.push(array.slice(index, index + rowSize));
      return acc;
    }, []);
  };

  // Split the inputArray into rows of 5 elements each
  const rows = splitIntoRows(inputArray, 5);

  return (
    <div className='mt-4 mb-4'>
          <h2 className="mt-4 mb-4 text-2xl font-bold text-center ">Auction Material</h2>
      <label className="relative block mb-2 font-semibold">
        Auction Material
        <span className="relative top-0 right-0 text-red-700">*</span>
      </label>
      <select
        onChange={handleSelectChange}
        required
        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
      >
        <option value="">Select Auction Materials</option>
        {auctionMaterials.map((option) => (
          <option
            key={option}
            value={option}
            disabled={selectedOptions.includes(option)}
          >
            {option}
          </option>
        ))}
      </select>

      {/* Display the selected options in rows */}
      <div className='mt-4'>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex p-4 mb-4 bg-gray-200 rounded-lg"
          >
            {row.map((item, index) => (
              <div key={index}>
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveString(index)}
                  className="p-1 mr-2 text-red-500"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <label className="relative block mb-2 font-semibold">
        Other Description
        <span className="relative top-0 right-0 text-red-700">*</span>
        <textarea
          required
          name="otherDescription"
          value={formData.otherDescription}
          onChange={handleChange}
          className="w-full h-32 px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm resize-none focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
          placeholder="Other Requirements"
        />
      </label>

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

export default Step5;
