import React, { useEffect, useState } from "react";
import Sidebar from "../../../../../Sidebar";
import Header from "../../../../../Header";
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

const IndividualList = () => {
  const [forms, setForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/apiTender/services/icert/certification")
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteFormDetails(id) {
    fetch(
      `http://localhost:5000/apiTender/services/icert/certification/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
    navigate(`/dashboard/individualrequests/${id}`);
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
    const selectedData = forms
      .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
      .map((form) => ({
        Name: form.name,
        Address: form.address,
        "Contact Number": form.mobileNumber,
        "Working Field": form.workingField,
        "Received At": formatReceivedAt(form.createdAt),
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forms");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "forms.xlsx";
    saveAs(data, filename);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const tableData = forms
      .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
      .map((form) => [
        form.name,
        form.address,
        form.mobileNumber,
        form.workingField,
        formatReceivedAt(form.createdAt),
      ]);

    doc.autoTable({
      head: [
        ["Name", "Address", "Contact Number", "Working Field", "Received At"],
      ],
      body: tableData,
    });

    doc.save("forms.pdf");
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
            <h1 className="text-xl font-bold mb-4">Individual Requests</h1>
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
                    <th className="py-4 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Name
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Address
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Contact Number
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Working Field
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
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
                          className="py-2 px-4 font-medium whitespace-nowrap border-b cursor-pointer w-1/5"
                          onClick={() => viewDetails(form._id)}
                        >
                          {form.name}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.address}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.mobileNumber}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.workingField}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
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
                            onClick={() => deleteFormDetails(form._id)}
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

export default IndividualList;
