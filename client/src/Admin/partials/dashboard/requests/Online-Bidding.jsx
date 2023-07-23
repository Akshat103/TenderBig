import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const OnlineBidding = () => {
  const [contactForms, setContactForms] = useState([]);
  const [sortOption, setSortOption] = useState("receivedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const [selectedService, setSelectedService] = useState("All");

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/Online%20Bidding`,
        {
          headers: {
            auth: token,
          },
        }
      );

      setContactForms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortForms = (forms, option, isDescending) => {
    switch (option) {
      case "receivedAt":
        return forms.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return isDescending ? dateB - dateA : dateA - dateB;
        });
      case "name":
        return forms.sort((a, b) => a.name.localeCompare(b.name));
      case "company":
        return forms.sort((a, b) => a.company.localeCompare(b.company));
      case "email":
        return forms.sort((a, b) => a.email.localeCompare(b.email));
      case "mobile":
        return forms.sort((a, b) => a.mobile.localeCompare(b.mobile));
      default:
        return forms;
    }
  };

  const formatReceivedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleResetFilters = () => {
    setSelectedService("All");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = contactForms
    .filter(
      (form) =>
        selectedService === "All" ? true : form.selectedService === selectedService
    )
    .slice(indexOfFirstForm, indexOfLastForm);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto overflow-x-auto">
            <h1 className="text-xl font-bold mb-4">Requests for Online Bidding</h1>
            {/* Table */}
            <div className="shadow overflow-hidden rounded-lg overflow-x-auto border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Name
                    </th>
                    <th
                      className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Company
                    </th>
                    <th
                      className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Email
                    </th>
                    <th
                      className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Mobile
                    </th>
                    <th
                      className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer border-b">
                      Received At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentForms.map((form) => (
                    <tr key={form.id}>
                      <td className="py-2 px-4 whitespace-nowrap border-b">
                        {form.name}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap border-b">
                        {form.company}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap border-b">
                        {form.email}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap border-b">
                        {form.mobile}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap border-b">
                        {formatReceivedAt(form.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 lg:px-8 py-2 flex justify-center">
              <nav className="flex items-center">
                <ul className="pagination flex space-x-3">
                  {Array.from({
                    length: Math.ceil(contactForms.length / formsPerPage),
                  }).map((_, index) => (
                    <li key={index}>
                      <button
                        className={`pagination-link ${
                          currentPage === index + 1
                            ? "pagination-link-active"
                            : ""
                        }`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnlineBidding;
