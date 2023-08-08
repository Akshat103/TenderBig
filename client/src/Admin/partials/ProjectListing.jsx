import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectListing = () => {
  const [startIndex, setStartIndex] = useState(0);
  const tendersPerPage = 8;

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + tendersPerPage);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => prevIndex - tendersPerPage);
  };

  const [tenderData, setTenderData] = useState([]);
  const [approvedFilter, setApprovedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // Track the current sort order

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const Url = `${BASE_URL}/projects/getall`;

        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          auth: token,
        };

        const response = await axios.get(Url, {}, { headers });

        if (response.status === 401) {
          // Unauthorized - display error message
          console.error("Unauthorized. Sign in first.");
          // Update the code here to display the error message on the screen as needed
          return;
        }
        console.log(response.data)
        setTenderData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Sign in first.");
          // Update the code here to display the error message on the screen as needed
        } else {
          console.error("Error fetching tender data:", error);
        }
      }
    };

    fetchTenderData();
  }, []);



  const filteredAndPaginatedTenders = tenderData.slice(
    startIndex,
    startIndex + tendersPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const navigate = useNavigate();

  const viewTenderDetails = (tenderId) => {
    navigate(`/dashboard/tender/${tenderId}`);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}

            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/* Table */}
              <section className="container mx-auto p-6 font-mono overflow-x-auto">
                <h1 className="text-xl font-bold mb-4">Tenders by Subcontractor</h1>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg overflow-x-auto">
                  <div className="w-full overflow-x-auto">
                    <div className="table-container overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">PNR</th>
                            <th className="px-4 py-3">Company Name</th>
                            <th className="px-4 py-3">Detail</th>
                            <th className="px-4 py-3">Value</th>
                            <th className="px-4 py-3">Country</th>
                            <th className="px-4 py-3">City</th>
                            <th className="px-4 py-3">Sector</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filteredAndPaginatedTenders.map((tender) => (
                            <tr className="text-gray-700" key={tender._id}>
                              <td
                                className="px-4 py-3 border"
                              >
                                {tender.pnr}
                              </td>
                              <td className="px-4 py-3 border">{tender.companyname}</td>
                              <td className="px-4 py-3 border">
                              {tender.detail}
                              </td>
                              <td className="px-4 py-3 border">
                              {tender.value}
                              </td>
                              <td className="px-4 py-3 text-xs border">
                              {tender.country}
                              </td>
                              <td className="px-4 py-3 text-xs border">
                              {tender.city}
                              </td>
                              <td className="px-4 py-3 text-xs border">
                              {tender.sector}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevClick}
                    disabled={startIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectListing;