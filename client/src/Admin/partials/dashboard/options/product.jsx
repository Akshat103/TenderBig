import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Product = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    // Fetch all products
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=products`);
      console.log(response.data[0].products);
      setProducts(response.data[0].products);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    if (!newProduct.trim()) {
      // If newProduct is empty or contains only whitespace, return early without making the API call.
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/options/products`, { products: [newProduct] });
      setProducts(response.data.products);
      setNewProduct("");
    } catch (error) {
      console.error(error);
    }
  }; 

  const deleteProduct = async (product) => {
    try {
      const response = await axios.delete(`${BASE_URL}/options/products/${product}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Product</h1>
            {/* Add product form */}
            <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Enter new product"
                className="mr-2 px-4 py-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
              />
              <button
                className="px-4 py-2 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={addProduct}
              >
                Add Product
              </button>
            </div>
            {/* Product list */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Existing Products:</h2>
              {products.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">Product Name</th>
                      <th className="py-2 px-4 bg-gray-100 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product}>
                        <td className="py-2 px-4 border-b">{product}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => deleteProduct(product)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
