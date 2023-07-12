import React, { useEffect, useState } from "react";
import Sidebar from "../../../Sidebar";
import Header from "../../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const GemRegistration = () => {
  const [forms, setForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/apiTender/services/gem/getall")
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteDetails(id) {
    fetch(`http://localhost:5000/apiTender/services/gem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the forms state to remove the deleted item
        setForms(forms.filter((form) => form._id !== id));
      })
      .catch((error) => console.log(error));
  }

  const formatReceivedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const viewDetails = (id) => {
    navigate(`/dashboard/gemregistration/${id}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(forms.length / formsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadAsExcel = () => {
    const selectedData = forms.slice(
      (currentPage - 1) * formsPerPage,
      currentPage * formsPerPage
    );

    const formattedData = selectedData.map((form) => ({
      "Company Name": form.companyName,
      "Contact Person Name": form.name,
      Email: form.email,
      "Contact Number": form.contact,
      Country: form.country,
      "Received At": formatReceivedAt(form.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gem Registration Requests");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "gem_registration_requests.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    const tableData = forms
      .slice(
        (currentPage - 1) * formsPerPage,
        currentPage * formsPerPage
      )
      .map((form) => ({
        "Company Name": form.companyName,
        "Contact Person Name": form.name,
        Email: form.email,
        "Contact Number": form.contact,
        Country: form.country,
        "Received At": formatReceivedAt(form.createdAt),
      }));

    const tableConfig = {
      head: [
        [
          "Company Name",
          "Contact Person Name",
          "Email",
          "Contact Number",
          "Country",
          "Received At",
        ],
      ],
      body: tableData.map((row) => Object.values(row)),
    };

    doc.autoTable(tableConfig);
    doc.save("gem_registration_requests.pdf");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">
              Gem Registration Requests
            </h1>
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
            {/* Table */}
            <div className="overflow-hidden rounded-lg border shadow-2xl">
              <table className="min-w-full divide-y py-3 divide-gray-200 table-fixed">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/6">
                      Company Name
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/6">
                      Contact Person Name
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/6">
                      Email
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/6">
                      Contact Number
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/6">
                      Country
                    </th>

                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider cursor-pointer border-b w-1/6">
                      Received At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forms
                    .slice(
                      (currentPage - 1) * formsPerPage,
                      currentPage * formsPerPage
                    )
                    .map((form) => (
                      <tr key={form._id}>
                        <td
                          className="py-2 px-4 cursor-pointer font-medium whitespace-nowrap border-b w-1/6"
                          onClick={() => viewDetails(form._id)}
                        >
                          {form.companyName}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/6">
                          {form.name}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/6">
                          {form.email}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/6">
                          {form.contact}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/6">
                          {form.country}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/6">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => viewDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
                      currentPage === Math.ceil(forms.length / formsPerPage)
                    }
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GemRegistration;
