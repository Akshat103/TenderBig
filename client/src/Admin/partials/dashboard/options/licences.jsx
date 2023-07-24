import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const License = () => {
  const [licenses, setLicenses] = useState([]);
  const [newLicenses, setNewLicenses] = useState("");

  useEffect(() => {
    // Fetch all licenses
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=licenses`);
      console.log(response.data[0].licenses);
      setLicenses(response.data[0].licenses);
    } catch (error) {
      console.error(error);
    }
  };

  const addLicenses = async () => {
    if (!newLicenses.trim()) {
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/options/licenses`, { licenses: [newLicenses] });
      setLicenses(response.data.licenses);
      setNewLicenses("");
    } catch (error) {
      console.error(error);
    }
  };


  const deleteLicenses = async (license) => {
    try {
      const response = await axios.delete(`${BASE_URL}/options/licenses/${license}`);
      setLicenses(response.data.licenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <h1 className="text-xl font-bold mb-4">License</h1>

      {/* Add licenses form */}
      <div className="flex">
        <input
          type="text"
          placeholder="Enter new license"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          value={newLicenses}
          onChange={(e) => setNewLicenses(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={addLicenses}
        >
          Add License
        </button>
      </div>

      {/* Category list */}
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2">Existing Licenses:</h2>
        {licenses.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">License Name</th>
                <th className="py-2 px-4 bg-gray-100 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((license) => (
                <tr key={license}>
                  <td className="py-2 px-4 border-b">{license}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                      onClick={() => deleteLicenses(license)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No licenses found.</p>
        )}
      </div>
    </div>

  );
};

export default License;
