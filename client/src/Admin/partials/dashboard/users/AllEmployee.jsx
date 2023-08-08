import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function AllEmployee() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const AddEmployee = () => {
    navigate("/dashboard/addemployee");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/userdetails/users/employee`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              auth: token,
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
    navigate(`/dashboard/user/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Check if any of the conditions is true
    return nameMatch || emailMatch;
  });

  // Pagination
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
      User: user.name,
      Role: user.userRole,
      Email: user.email,
      Phone: user.phoneNumber,
      Country: user.country,
      City: user.city,
      Subscription: user.subscription ? user.subscription.status : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "users.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    const headers = [
      "User",
      "Role",
      "Email",
      "Phone",
      "Country",
      "City",
      "Subscription",
    ];

    const selectedData = currentUsers.map((user) => [
      user.name,
      user.userRole,
      user.email,
      user.phoneNumber,
      user.country,
      user.city,
      user.subscription ? user.subscription.status : "",
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

    doc.save("users.pdf");
  };

  return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}

            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/*---------> Table (Top Channels) */}
              <section className="container mx-auto p-6 font-mono overflow-x-auto">
                <h1 className="text-xl font-bold mb-4">All Employee</h1>
                <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
                  {/* Search bar */}
                  <input
                    type="text"
                    className="w-full md:w-64 px-4 py-2 mb-2 md:mb-0 mr-0 md:mr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow focus:outline-none"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={() => {
                      AddEmployee();
                    }}
                  >
                    Add New Employee
                  </button>
                </div>
                {/* Download buttons */}
                <div className="flex flex-col md:flex-row justify-end mb-4">
                  <button
                    className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 mb-2 md:mb-0 md:mr-2"
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
                          <th className="px-4 py-3">User</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Country</th>
                          <th className="px-4 py-3">City</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((user) => (
                          <tr className="text-gray-700" key={user._id}>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                <div
                                  onClick={() => {
                                    showDetails(user._id);
                                  }}
                                >
                                  <p className="font-semibold text-black cursor-pointer">
                                    {user.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ms font-semibold border">
                              {user.email}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                {user.phoneNumber}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {user.country}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {user.city}
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
                        <path
                          fillRule="evenodd"
                          d="M5.293 6.707a1 1 0 010-1.414L2.414 2.343A1 1 0 113.828.93L7.586 4.686a1 1 0 010 1.414L3.828 9.07a1 1 0 11-1.414-1.414L5.293 6.707z"
                          clipRule="evenodd"
                        ></path>
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
                        <path
                          fillRule="evenodd"
                          d="M14.707 13.293a1 1 0 010 1.414l-3.758 3.758a1 1 0 11-1.414-1.414L12.586 14H7a1 1 0 110-2h5.586l-3.293-3.293a1 1 0 111.414-1.414l3.758 3.758z"
                          clipRule="evenodd"
                        ></path>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
  );
}

export default AllEmployee;
