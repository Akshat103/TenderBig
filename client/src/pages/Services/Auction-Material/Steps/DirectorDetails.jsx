import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ formData, handleChange, handleNext, handlePrevious, setFormData }) => {
  const handleDirectorChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDirectors = [...formData.directors];
    updatedDirectors[index][name] = value;
    setFormData({ ...formData, directors: updatedDirectors });
  };

  const addDirector = () => {
    const updatedDirectors = [...formData.directors];
    updatedDirectors.push({
      directorName: '',
      directorAadhar: '',
      directorPan: '',
      directorDob: '',
      directorFatherName: '',
    });
    setFormData({ ...formData, directors: updatedDirectors });
  };

  const removeDirector = (index) => {
    const updatedDirectors = [...formData.directors];
    updatedDirectors.splice(index, 1);
    setFormData({ ...formData, directors: updatedDirectors });
  };

  return (
    <div className="mt-4">
            <h2 className="mt-4 mb-4 text-2xl font-bold text-center ">Auction Material</h2>
      <div>
        {formData.directors.map((director, index) => (
<>
          <div key={index} className="grid grid-cols-2 gap-4 ">
            <label className="relative block mb-2 font-semibold">
              Director Name
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="text"
                name="directorName"
                value={director.directorName}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Director Name"
                required
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Director Aadhar No
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="number"
                name="directorAadhar"
                value={director.directorAadhar}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Number"
                required
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Director PAN No
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="number"
                name="directorPan"
                value={director.directorPan}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Number"
                required
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Director DOB
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="date"
                name="directorDob"
                value={director.directorDob}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                required
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Father's Name
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="text"
                name="directorFatherName"
                value={director.directorFatherName}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Name"
                required
              />
            </label>
            {index > 0 && (
              <button type="button" onClick={() => removeDirector(index)}>
              <FontAwesomeIcon icon={faTrash} /> Remove
            </button>
            )}
          </div>
          <hr className="mb-4 border-2 border-gray-900"/>
</>
        ))}
      </div>

      <div className='mt-4'>
        <button type="button" onClick={addDirector}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
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

export default Step3;

