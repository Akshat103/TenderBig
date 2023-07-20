import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Sector = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [newSector, setNewSector] = useState("");

  useEffect(() => {
    // Fetch all sectors
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/apitender/options/alloptions?array=sectors");
      console.log(response.data[0].sectors);
      setSectors(response.data[0].sectors);
    } catch (error) {
      console.error(error);
    }
  };

  const addSector = async () => {
    if (!newSector.trim()) {
      // If newSector is empty or contains only whitespace, return early without making the API call.
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/apitender/options/sectors", { sectors: [newSector] });
      setSectors(response.data.sectors);
      setNewSector("");
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteSector = async (sector) => {
    try {
      const response = await axios.delete(`http://localhost:5000/apitender/options/sectors/${sector}`);
      setSectors(response.data.sectors);
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
            <h1 className="text-xl font-bold mb-4">Sector</h1>

            {/* Add sector form */}
            <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Enter new sector"
                className="mr-2 px-4 mb-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={newSector}
                onChange={(e) => setNewSector(e.target.value)}
              />
              <button
                className="px-4 py-2 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={addSector}
              >
                Add Sector
              </button>
            </div>

            {/* Sector list */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Existing Sectors:</h2>
              {sectors.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b font-medium text-gray-700">Sector Name</th>
                      <th className="py-2 px-4 bg-gray-100 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectors.map((sector) => (
                      <tr key={sector}>
                        <td className="py-2 px-4 border-b">{sector}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => deleteSector(sector)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No sectors found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sector;
