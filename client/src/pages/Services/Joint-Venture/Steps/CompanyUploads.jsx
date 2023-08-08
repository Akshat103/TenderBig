import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ formData, handleChange, handleNext, handlePrevious }) => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const updatedFiles = Array.from(files);
    setFileList((prevFileList) => ({
      ...prevFileList,
      [name]: updatedFiles,
    }));
  };

  const handleNextClick = () => {
    handleChange({
      target: {
        name: 'companyUploads',
        value: fileList,
      },
    });
    handleNext();
  };

  return (
    <div className="mt-4">
      <div className="p-2 rounded-lg">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label htmlFor='gstUpload' className="block mb-2 font-semibold">
              GST
              <span className="relative top-0 right-0 text-red-700">*</span>
            </label>
            <input
              required
              type="file"
              id="gstUpload"
              accept='.pdf'
              name="gstUpload"
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
            />
          </div>

          <div>
            <label htmlFor="panUpload" className="block mb-2 font-semibold">
              PAN Card
              <span className="relative top-0 right-0 text-red-700">*</span>
            </label>
            <input
              required
              type="file"
              id="panUpload"
              name="panUpload"
              accept='.pdf'
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
            />
          </div>

          <div>
            <label htmlFor="cinUpload" className="block mb-2 font-semibold">
              CIN
              <span className="relative top-0 right-0 text-red-700">*</span>
            </label>
            <input
              required
              type="file"
              id="cinUpload"
              name="cinUpload"
              accept='.pdf'
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
            />
          </div>

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
          <div className="flex justify-end w-1/4">
            <button
              type="button"
              onClick={handleNextClick}
              className="px-4 py-2 mt-8 text-white bg-black rounded align-center"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step2;
