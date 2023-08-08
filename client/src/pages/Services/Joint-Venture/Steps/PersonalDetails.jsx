import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ formData, handleChange, handleNext, handlePrevious, setFormData }) => {
  const handleDirectorChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDirectors = [...formData.directors];
    updatedDirectors[index][name] = value;
    setFormData({ ...formData, directors: updatedDirectors });
  };

  const handleDirectorFileChange = (index, fileType, event) => {
    const { name, files } = event.target;
    const updatedDirectors = [...formData.directors];
    const file = files[0];

    updatedDirectors[index].uploads[fileType] = file;

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
      companyPost: '',
      email: '',
      contactNumber: '',
      uploads: {
        gst: null,
        pan: null,
        aadhar: null,
        photo: null,
      },
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
      <h2 className="mb-4 text-xl font-bold ">Personal Details</h2>
      {formData.directors.map((director, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 gap-4">
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
            <label className="relative block mb-2 font-semibold">
              Company Post
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="text"
                name="companyPost"
                value={director.companyPost}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Post"
                required
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Email
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                type="email"
                name="email"
                value={director.email}
                onChange={(event) => handleDirectorChange(index, event)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Email"
                required
              />
            </label>
            <label className="block mb-2 font-semibold">
              Contact Number
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                placeholder="Enter Phone Number"
                onChange={(event) => handleDirectorChange(index, event)}
                required
              />
            </label>

            <div>
              <label htmlFor="file-input" className="block mb-2 font-semibold">
              GST Certificate
                <span className="relative top-0 right-0 text-red-700">*</span>
              </label>
              <input
                type="file"
                name="uploads.gst"
                accept='.pdf'
                onChange={(event) => handleDirectorFileChange(index, 'gst', event)}
                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
              />
            </div>

            <div>
              <label htmlFor="file-input" className="block mb-2 font-semibold">
              PAN Card
                <span className="relative top-0 right-0 text-red-700">*</span>
              </label>
              <input
                type="file"
                name="uploads.pan"
                accept='.pdf'
                onChange={(event) => handleDirectorFileChange(index, 'pan', event)}
                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
              />
            </div>

            <div>
              <label htmlFor="file-input" className="block mb-2 font-semibold">
              Aadhar Card
                <span className="relative top-0 right-0 text-red-700">*</span>
              </label>
              <input
                type="file"
                name="uploads.aadhar"
                accept='.pdf'
                onChange={(event) => handleDirectorFileChange(index, 'aadhar', event)}
                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="file-input" className="block mb-2 font-semibold">
              Photo
                <span className="relative top-0 right-0 text-red-700">*</span>
              </label>
              <input
                type="file"
                name="uploads.photo"
                accept='.png,.jpeg,.jpg'
                onChange={(event) => handleDirectorFileChange(index, 'photo', event)}
                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
              />
            </div>

            <div></div>
            {index > 0 && (
              <button type="button" onClick={() => removeDirector(index)}>
                <FontAwesomeIcon icon={faTrash} /> Remove
              </button>
            )}
          </div>
          <hr className="mb-4 border-2 border-gray-900" />
        </div>
      ))}

      <div className="mt-4">
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
              className="px-4 py-2 mt-8 text-white bg-black rounded align-center"
            >
              Previous
            </button>
          </div>
          <div className="flex justify-end w-1/4">
            <button
              type="button"
              onClick={handleNext}
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

export default Step3;
