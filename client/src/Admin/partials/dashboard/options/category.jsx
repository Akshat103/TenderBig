import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const token = localStorage.getItem('token');

  const headers = {
    'auth': token
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=categories`, { headers });
      console.log(response.data[0].categories);
      setCategories(response.data[0].categories);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) {
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/options/categories`, { categories: [newCategory] }, { headers });
      setCategories(response.data.categories);
      setNewCategory("");
    } catch (error) {
      console.error(error);
    }
  };


  const deleteCategory = async (category) => {
    try {
      const response = await axios.delete(`${BASE_URL}/options/categories/${category}`, { headers });
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Category</h1>

            {/* Add category form */}
            <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Enter new category"
                className="mr-2 mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"

                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className="px-4 py-2 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={addCategory}
              >
                Add Category
              </button>
            </div>

            {/* Category list */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Existing Categories:</h2>
              {categories.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">Category Name</th>
                      <th className="py-2 px-4 bg-gray-100 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category}>
                        <td className="py-2 px-4 border-b">{category}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => deleteCategory(category)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No categories found.</p>
              )}
            </div>
          </div>
        
  );
};

export default Category;