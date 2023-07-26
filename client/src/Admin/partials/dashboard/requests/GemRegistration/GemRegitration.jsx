import React, { useEffect, useState } from "react";
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
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GemRegistration = () => {
  const [forms, setForms] = useState([]);

  const token = localStorage.getItem('token');

  const headers = {
    'auth': token
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch(`${BASE_URL}/services/gem/getall`, { headers })
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteDetails(id) {
    fetch(`${BASE_URL}/services/gem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth:token
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
      "pan Number": form.panNumber,
      "Website Address": form.websiteAddress,
      " GST Number": form.gst,
      "Business Start Date ": form.startDate,
      "Business Office Building ": form.address,
      "Country ": form.country,
      "State ": form.state,
      "City ": form.city,
      "ZIP Code ": form.zip,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Gem Registration Requests"
    );
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
    const doc = new jsPDF("p", "mm", "a4"); // Set page size to A4

    const tableData = forms
      .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
      .map((form) => ({
        "Company Name": form.companyName,
        "Contact Person Name": form.name,
        "Email": form.email,
        "Contact Number": form.contact,
        "Country": form.country,
        "Received At": formatReceivedAt(form.createdAt),
        "Pan Number": form.panNumber,
        "Website Address": form.websiteAddress,
        "GST Number": form.gst,
        "Business Start Date": form.startDate,
        "Business Office Building": form.address,
        "Country": form.country,
        "State": form.state,
        "City": form.city,
        "ZIP Code": form.zip,
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
          "Pan Number",
          "Website Address",
          "GST Number",
          "Business Start Date",
          "Business Office Building",
          "Country",
          "State",
          "City",
          "ZIP Code",
        ],
      ],
      body: tableData.map((row) => Object.values(row)),
      columnStyles: {
        0: { cellWidth: 40 }, // Company Name
        1: { cellWidth: 40 }, // Contact Person Name
        2: { cellWidth: 50 }, // Email
        3: { cellWidth: 40 }, // Contact Number
        4: { cellWidth: 30 }, // Country
        5: { cellWidth: 40 }, // Received At
        6: { cellWidth: 30 }, // Pan Number
        7: { cellWidth: 50 }, // Website Address
        8: { cellWidth: 30 }, // GST Number
        9: { cellWidth: 35 }, // Business Start Date
        10: { cellWidth: 50 }, // Business Office Building
        11: { cellWidth: 30 }, // Country
        12: { cellWidth: 30 }, // State
        13: { cellWidth: 30 }, // City
        14: { cellWidth: 30 }, // ZIP Code
      },
      styles: {
        cellPadding: 2,
        fontSize: 10,
        fontStyle: "normal",
        valign: "middle",
      },
    };

    doc.autoTable(tableConfig);
    doc.save("gem_registration_requests.pdf");
  };

  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
      <h1 className="mb-4 text-xl font-bold">
        Gem Registration Requests
      </h1>
      {/* Download buttons */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 mr-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2"
          onClick={downloadAsExcel}
        >
          Download Excel
        </button>
        {/* <button
                className="px-4 py-2 font-bold text-white bg-red-700 rounded focus:outline-none focus:ring-2"
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
              <th className="w-1/6 px-6 py-4 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                Company Name
              </th>
              <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                Contact Person Name
              </th>
              <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                Email
              </th>
              <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                Contact Number
              </th>
              <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                Country
              </th>

              <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b cursor-pointer text-md">
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
                    className="w-1/6 px-4 py-2 font-medium border-b cursor-pointer whitespace-nowrap"
                    onClick={() => viewDetails(form._id)}
                  >
                    {form.companyName}
                  </td>
                  <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                    {form.name}
                  </td>
                  <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                    {form.email}
                  </td>
                  <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                    {form.contact}
                  </td>
                  <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                    {form.country}
                  </td>
                  <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                    {formatReceivedAt(form.createdAt)}
                  </td>
                  <td className="px-4 py-2 font-medium border-b whitespace-nowrap w-1/10">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => viewDetails(form._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td className="px-4 py-2 font-medium border-b whitespace-nowrap w-1/10">
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
  );
};

export default GemRegistration;
