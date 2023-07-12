import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function AllProjects() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const AddProject = () => {
    navigate("/dashboard/addproject");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/apiTender/projects/getall",
          {
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("token"),
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const showDetails = (userId) => {
    navigate(`/dashboard/allprojects/${userId}`);
  };

  const editProject = (userId) => {
    navigate(`/dashboard/allprojects/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter((user) => {
    const nameMatch =
      user.companyname &&
      user.companyname.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch =
      user.detail && user.detail.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredData.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadAsExcel = () => {
    const selectedData = currentUsers.map((user) => ({
      PNR: user.pnr,
      "Company Name": user.companyname,
      "Project Detail": user.detail,
      "Project Value": user.value,
      "Project Status": user.status,
      Country: user.country,
      State: user.state,
      City: user.city,
      Sector: user.sector,
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "projects.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    const headers = [
      "PNR",
      "Company Name",
      "Project Detail",
      "Project Value",
      "Project Status",
      "Country",
      "State",
      "City",
      "Sector",
    ];

    const selectedData = currentUsers.map((user) => [
      user.pnr,
      user.companyname,
      user.detail,
      user.value,
      user.status,
      user.country,
      user.state,
      user.city,
      user.sector,
    ]);

    const data = {
      headers,
      rows: selectedData,
    };

    const tableConfig = {
      startY: 20,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { fillColor: 255, textColor: 0 },
      alternateRowStyles: { fillColor: 245 },
      margin: { top: 20 },
    };

    doc.autoTable(data.headers, data.rows, tableConfig);

    doc.save("projects.pdf");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-15 gap-6">
              <section className="container mx-auto p-6 font-mono overflow-x-auto">
                <h1 className="text-xl font-bold mb-4">All Projects</h1>
                <div className="flex mb-4 justify-between">
                  <input
                    type="text"
                    className="w-64 px-4 py-2 mr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow focus:outline-none"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  <button
                    className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={() => {
                      AddProject();
                    }}
                  >
                    Add New projects
                  </button>
                </div>
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 mr-2"
                    onClick={downloadAsExcel}
                  >
                    Download Excel
                  </button>
                  <button
                    className="bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={downloadAsPDF}
                  >
                    Download PDF
                  </button>
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                          <th className="px-4 py-3">PNR</th>
                          <th className="px-4 py-3">Company Name</th>
                          <th className="px-4 py-3">Project Detail</th>
                          <th className="px-4 py-3">Project Value</th>
                          <th className="px-4 py-3">Project Status</th>
                          <th className="px-4 py-3">Country</th>
                          <th className="px-4 py-3">Project Stat</th>
                          <th className="px-4 py-3">City</th>
                          <th className="px-4 py-3">Sector</th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((user) => (
                          <tr key={user._id}>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.pnr}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.companyname}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.detail}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.value}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.status}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.country}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.state}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.city}
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => showDetails(user._id)}
                            >
                              {user.sector}
                            </td>
                            <td>
                              <button
                                className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                onClick={() => editProject(user._id)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between px-4 py-3 bg-gray-100 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center">
                      <button
                        className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <span className="px-2 text-sm">{currentPage}</span>
                      <button
                        className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                        onClick={nextPage}
                        disabled={
                          currentPage ===
                          Math.ceil(filteredData.length / usersPerPage)
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllProjects;