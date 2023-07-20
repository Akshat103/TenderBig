import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";

const AllTendersSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const tendersPerPage = 8;

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + tendersPerPage);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => prevIndex - tendersPerPage);
  };

  const [tenderData, setTenderData] = useState([]);
  const [userCategoryFilter, setUserCategoryFilter] = useState("");
  const [approvedFilter, setApprovedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const Url = "http://localhost:5000/apitender/tenderdetails/all-tenders";

        const detailsArray = [
          "tenderId",
          "summary",
          "sector",
          "procurementSummary.deadline",
          "tenderDetail.publishDate",
          "userCategory",
          "approvedStatus",
        ];

        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          auth: token,
        };

        const response = await axios.post(Url, { details: detailsArray }, { headers });

        if (response.status === 401) {
          // Unauthorized - display error message
          console.error("Unauthorized. Sign in first.");
          // Update the code here to display the error message on the screen as needed
          return;
        }

        setTenderData(response.data.tenders);
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

  const filteredTenderData = tenderData.filter((tender) => {
    if (
      (userCategoryFilter === "" || tender.userCategory === userCategoryFilter) &&
      (approvedFilter === "" || (tender.approvedStatus ? "Yes" : "No") === approvedFilter) &&
      tender.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const sortedTenderData = filteredTenderData.sort((a, b) => {
    const publishDateA = new Date(a.tenderDetail.publishDate);
    const publishDateB = new Date(b.tenderDetail.publishDate);
    if (sortOrder === "asc") {
      return publishDateA - publishDateB;
    } else {
      return publishDateB - publishDateA;
    }
  });

  const filteredAndPaginatedTenders = sortedTenderData.slice(
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
                <h1 className="text-xl font-bold mb-4">All Tenders</h1>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg overflow-x-auto">
                  <div className="w-full overflow-x-auto">
                    <div className="table-container overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Summary</th>
                            <th className="px-4 py-3">Sector</th>
                            <th className="px-4 py-3">Deadline</th>
                            <th
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            >
                              Publish Date
                              {sortOrder === "asc" ? (
                                <span>&#x25B2;</span>
                              ) : (
                                <span>&#x25BC;</span>
                              )}
                            </th>
                            <th className="px-4 py-3">User Category</th>
                            <th className="px-4 py-3">Approved</th>
                          </tr>
                          <tr>
                            <th className="px-4 py-3">
                              <input
                                type="text"
                                placeholder="Search by summary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-2 py-1 w-full border border-gray-300 rounded-md"
                              />
                            </th>
                            <th>
                              <select
                                value={userCategoryFilter}
                                onChange={(e) => setUserCategoryFilter(e.target.value)}
                                className="px-2 py-1 w-full border border-gray-300 rounded-md"
                              >
                                <option value="">All User Categories</option>
                                <option value="subcontractor">Subcontractor</option>
                                <option value="contractor">Contractor</option>
                                <option value="admin">Admin</option>
                                <option value="hr">HR</option>
                                <option value="employee">Employee</option>
                              </select>
                            </th>
                            <th>
                              <select
                                value={approvedFilter}
                                onChange={(e) => setApprovedFilter(e.target.value)}
                                className="px-2 py-1 w-full border border-gray-300 rounded-md"
                              >
                                <option value="">All Approved</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filteredAndPaginatedTenders.map((tender) => (
                            <tr className="text-gray-700" key={tender._id}>
                              <td
                                className="px-4 py-3 border cursor-pointer"
                                onClick={() => viewTenderDetails(tender.tenderId)}
                              >
                                {tender.summary}
                              </td>
                              <td className="px-4 py-3 border">{tender.sector}</td>
                              <td className="px-4 py-3 border">
                                {formatDate(tender.procurementSummary.deadline)}
                              </td>
                              <td className="px-4 py-3 border">
                                {formatDate(tender.tenderDetail.publishDate)}
                              </td>
                              <td className="px-4 py-3 border">{tender.userCategory}</td>
                              <td className="px-4 py-3 text-xs border">
                                <span
                                  className={`px-2 py-1 font-semibold leading-tight ${
                                    tender.approvedStatus
                                      ? "text-green-700 bg-green-100"
                                      : "text-red-700 bg-red-100"
                                  } rounded-sm`}
                                >
                                  {tender.approvedStatus ? "Yes" : "No"}
                                </span>
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
                    disabled={startIndex + tendersPerPage >= filteredTenderData.length}
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

export default AllTendersSection;