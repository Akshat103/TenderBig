import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function DashboardUsers() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("all");
  const [subscriptionStatus, setSubscriptionStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/apiTender/userdetails/allusers",
          {
            method: "GET",
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
    navigate(`/dashboard/user/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubscriptionStatusChange = (e) => {
    setSubscriptionStatus(e.target.value);
  };

  const filteredData = userData.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const userTypeMatch =
      userType === "all" ||
      (userType === "admin" && user.userRole === "admin") ||
      (userType === "hr" && user.userRole === "hr") ||
      (userType === "user" && user.userRole === "user") ||
      (userType === "employee" && user.userRole === "employee");
    const subscriptionStatusMatch =
      subscriptionStatus === "all" ||
      (subscriptionStatus === "active" &&
        user.subscription &&
        user.subscription.status === "active") ||
      (subscriptionStatus === "inactive" &&
        (!user.subscription || user.subscription.status === "inactive"));

    // Check if any of the conditions is true
    return (
      (nameMatch || emailMatch) && userTypeMatch && subscriptionStatusMatch
    );
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

  const AddUser = () => {
    navigate("/dashboard/adduser");
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
  
    const headers = ["User", "Role", "Email", "Phone", "Country", "City", "Subscription"];
  
    const selectedData = currentUsers.map((user) => [
      user.name,
      user.userRole,
      user.email,
      user.phoneNumber,
      user.country,
      user.city,
      user.subscription ? user.subscription.status : ""
    ]);
  
    const data = {
      headers,
      rows: selectedData
    };
  
    const tableConfig = {
      startY: 20,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { fillColor: 255, textColor: 0 },
      alternateRowStyles: { fillColor: 245 },
      margin: { top: 20 }
    };
  
    doc.autoTable(data.headers, data.rows, tableConfig);
  
    doc.save("users.pdf");
  };
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden ">
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
              {/* Table (Top Channels) */}
              <section className="container mx-auto p-6 font-mono overflow-x-auto">
                <h1 className="text-xl font-bold mb-4">All User</h1>
                <div className="flex mb-4  justify-between ">
                  {/* Search bar */}
                  <input
                    type="text"
                    className="w-64 px-4 py-2 mr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow focus:outline-none"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/* User type select bar */}
                  <select
                    className="w-32 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow focus:outline-none"
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="all">All Users</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="user">User</option>
                    <option value="employee">Employee</option>
                  </select>
                  {/* Subscription status select bar */}
                  {userType !== "all" && (
                    <select
                      className="w-32 px-4 py-2 ml-2 text-gray-700 bg-white border border-gray-300 rounded shadow focus:outline-none"
                      value={subscriptionStatus}
                      onChange={handleSubscriptionStatusChange}
                    >
                      <option value="all">All Subscriptions</option>
                      <option value="active">Subscribed</option>
                      <option value="inactive">Not Subscribed</option>
                    </select>
                  )}
                  <button
                    className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={AddUser}
                  >
                    Add New User
                  </button>
                </div>
                {/* Download buttons */}
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-green-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 mr-2"
                    onClick={downloadAsExcel}
                  >
                    Download Excel
                  </button>
                  <button
                    className="bg-red-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
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
                          <th className="px-4 py-3">Role</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Country</th>
                          <th className="px-4 py-3">City</th>
                          <th className="px-4 py-3">Subscription</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((user) => (
                          <tr className="text-gray-700" key={user._id}>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                <div
                                  onClick={() => {
                                    showDetails(user.userId);
                                  }}
                                >
                                  <p className="font-semibold text-black cursor-pointer">
                                    {user.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ms font-semibold border">
                              {user.userRole}
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
                            <td className="px-4 py-3 text-xs border">
                              <span
                                className={`px-2 py-1 font-semibold leading-tight ${
                                  !user.subscription ||
                                  user.subscription.status === "inactive"
                                    ? "text-red-700 bg-red-100"
                                    : "text-green-700 bg-green-100"
                                } rounded-sm`}
                              >
                                {user.subscription &&
                                user.subscription.status !== "inactive"
                                  ? "Active"
                                  : "Inactive"}
                              </span>
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
        </main>
      </div>
    </div>
  );
}

export default DashboardUsers;
