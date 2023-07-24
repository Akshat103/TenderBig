import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    // Fetch all departments
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=departments`);
      console.log(response.data[0].departments);
      setDepartments(response.data[0].departments);
    } catch (error) {
      console.error(error);
    }
  };

  const addDepartment = async () => {
    if (!newDepartment.trim()) {
      // If newDepartment is empty or contains only whitespace, return early without making the API call.
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/options/departments`, { departments: [newDepartment] });
      setDepartments(response.data.departments);
      setNewDepartment("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (department) => {
    try {
      const response = await axios.delete(`${BASE_URL}/options/departments/${department}`);
      setDepartments(response.data.departments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Department</h1>
            {/* Add department form */}
            <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Enter new department"
                className="mr-2 mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 mb-3 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={addDepartment}
              >
                Add Department
              </button>
            </div>
            {/* Department list */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Existing Departments:</h2>
              {departments.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">Department Name</th>
                      <th className="py-2 px-4 bg-gray-100 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department) => (
                      <tr key={department}>
                        <td className="py-2 px-4 border-b">{department}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => deleteDepartment(department)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No departments found.</p>
              )}
            </div>
          </div>
  );
};

export default Department;
