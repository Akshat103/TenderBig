import React, { useEffect, useState } from "react";
import axios from "axios";
import { faArrowLeft, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ContactFormList = () => {
  const [contactForms, setContactForms] = useState([]);
  const [sortOption, setSortOption] = useState("receivedAt");
  const [isDescending, setIsDescending] = useState(true);
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
        `${BASE_URL}/get-allcontactforms`,
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
      case "selectedService":
        return forms.sort((a, b) =>
          a.selectedService.localeCompare(b.selectedService)
        );
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

  const downloadAsExcel = () => {
    const selectedData = contactForms
      .filter(
        (form) =>
          selectedService === "All"
            ? true
            : form.selectedService === selectedService
      )
      .map((form) => ({
        Name: form.name,
        Company: form.company,
        Email: form.email,
        "Phone Number": form.mobile,
        "Received At": formatReceivedAt(form.createdAt),
        Services: form.selectedService,
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forms");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "forms.xlsx";
    saveAs(data, filename);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const tableData = contactForms
      .filter(
        (form) =>
          selectedService === "All"
            ? true
            : form.selectedService === selectedService
      )
      .map((form) => [
        form.name,
        form.company,
        form.email,
        form.mobile,
        formatReceivedAt(form.createdAt),
        form.selectedService,
      ]);

    doc.autoTable({
      head: [
        ["Name", "Company", "Email", "Phone Number", "Received At", "Services"],
      ],
      body: tableData,
    });

    doc.save("forms.pdf");
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(contactForms.length / formsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (id) => {
    // Handle the delete functionality
  };

  // const handleEdit = (id) => {
  //   // Handle the edit functionality
  // };

  return (
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <h1 className="mb-4 text-xl font-bold">Contact Requests</h1>

            {/* Filters */}
            <div className="flex items-center mb-4 space-x-4">
              <div>
                <label htmlFor="service" className="text-lg font-medium">
                  Select Service:
                </label>
                <select
                  id="service"
                  name="service"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-xl focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={selectedService}
                  onChange={(e) => handleServiceChange(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Career&Man Power">Career & Man Power</option>
                  <option value="Registration/Certificate">
                    Registration / Certificate
                  </option>
                  <option value="License">License</option>
                  <option value="Auction Material">Auction Material</option>
                  <option value="Joint Venture">Joint Venture</option>
                  <option value="Online Bidding">Online Bidding</option>
                  <option value="Tender Result">Tender Result</option>
                </select>
              </div>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-primary-500 focus:outline-none"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>

            {/* Download buttons */}
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 mr-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2"
                onClick={downloadAsExcel}
              >
                Download Excel
              </button>
              {/* <button
                ssName="bg-red-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                onClick={downloadAsPDF}
              >
                Download PDF
              </button> */}
            </div>

            {/* Table */}
            <div className="overflow-hidden border rounded-lg shadow-2xl">
              <table className="min-w-full py-3 divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="w-1/6 px-6 py-4 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("name")}
                    >
                      Name
                    </th>
                    <th
                      className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("company")}
                    >
                      Company
                    </th>
                    <th
                      className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("email")}
                    >
                      Email
                    </th>
                    <th
                      className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("mobile")}
                    >
                      Mobile
                    </th>
                    <th
                      className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("receivedAt")}
                    >
                      Received At
                    </th>
                    <th
                      className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md"
                      onClick={() => handleSortOptionChange("selectedService")}
                    >
                      Services
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentForms
                    .slice(
                      (currentPage - 1) * formsPerPage,
                      currentPage * formsPerPage
                    )
                    .map((form) => (
                      <tr key={form._id}>
                        <td
                          className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap"
                          onClick={() => viewDetails(form._id)}
                        >
                          {form.name}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.company}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.email}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.mobile}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.selectedService}
                        </td><td className="w-1/12 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {/* <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(form._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button> */}
                        </td>
                        <td className="w-1/12 px-4 py-2 font-medium border-b whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(form._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
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
                  disabled={currentPage === Math.ceil(contactForms.length / formsPerPage)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>

          </div>
  );
};

export default ContactFormList;
