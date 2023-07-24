import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Material = () => {
  const [auctionMaterials, setAuctionMaterial] = useState([]);
  const [newAuctionMaterial, setNewAuctionMaterial] = useState("");

  useEffect(() => {
    // Fetch all licenses
    fetchAuctionMaterial();
  }, []);

  const fetchAuctionMaterial = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/options/alloptions?array=AuctionMaterials`);
      console.log(response.data[0].AuctionMaterials);
      setAuctionMaterial(response.data[0].AuctionMaterials);
    } catch (error) {
      console.error(error);
    }
  };

  const addAuctionMaterials = async () => {
    if (!newAuctionMaterial.trim()) {
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/options/auctionmaterials`, { auctionMaterials: [newAuctionMaterial] });
      setAuctionMaterial(response.data.AuctionMaterials);
      setNewAuctionMaterial("");
    } catch (error) {
      console.error(error);
    }
  };


  const deleteAuctionMaterials = async (auctionmaterial) => {
    try {
      const response = await axios.delete(`${BASE_URL}/options/auctionmaterials/${auctionmaterial}`);
      setAuctionMaterial(response.data.AuctionMaterials);
    } catch (error) {
      console.error(error);
    }
  };

  return (

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Auction Material</h1>

            {/* Add licenses form */}
            <div className="flex">
              <input
                type="text"
                placeholder="Enter new material"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={newAuctionMaterial}
                onChange={(e) => setNewAuctionMaterial(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={addAuctionMaterials}
              >
                Add Material
              </button>
            </div>

            {/* Category list */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Existing Auction Material:</h2>
              {auctionMaterials.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">Auction Material Name</th>
                      <th className="py-2 px-4 bg-gray-100 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctionMaterials.map((auctionmaterial) => (
                      <tr key={auctionmaterial}>
                        <td className="py-2 px-4 border-b">{auctionmaterial}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => deleteAuctionMaterials(auctionmaterial)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No material found.</p>
              )}
            </div>
          </div>
        
  );
};

export default Material;
