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
import axios from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const EmployerForms = () => {
  const [forms, setForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {

    if (token) {
      const headers = {
        'auth': token
      };

      // Fetch data from the API with the token in the headers
      axios.get(`${BASE_URL}/services/employer/forms`, { headers })
        .then((response) => {
          setForms(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []); 

  function deleteEmployerDetail(id) {
    fetch(`${BASE_URL}/services/employer/forms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth:token
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Resource deleted successfully");
          setForms(forms.filter((form) => form._id !== id));
        } else {
          throw new Error("Failed to delete resource");
        }
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
    navigate(`/dashboard/employerrequests/${id}`);
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
      Company: form.company,
      "Contact Number":form.mobile,
      "Email Address":form.email,
      "Company Work": form.cwork,
      "Job Post": form.jobexp,
      Salary:form.salary,
      "Company Website":form.curl,
      "Contact Person Number":form.contactpnumber,
      "Company Profile": form.companyprofile,
      "Registration Number": form.regno,
      "PAN Number":form.PAN,
      "GST Number": form.GST,
      "Address Line 1": form.addressline1,
      "Address Line 2": form.addressline2,
      Country: form.country,
      State: form.state,
      City: form.city,
      "Zip Code": form.zipcode,
      "Received At": formatReceivedAt(form.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forms");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "forms.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
  
    const tableData = forms
      .slice(
        (currentPage - 1) * formsPerPage,
        currentPage * formsPerPage
      )
      .map((form) => ({
        Company: form.company,
        "Contact Number": form.mobile,
        "Email Address": form.email,
        "Company Work": form.cwork,
        "Job Post": form.jobexp,
        Salary: form.salary,
        "Company Website": form.curl,
        "Contact Person Number": form.contactpnumber,
        "Company Profile": form.companyprofile,
        "Registration Number": form.regno,
        "PAN Number": form.PAN,
        "GST Number": form.GST,
        "Address Line 1": form.addressline1,
        "Address Line 2": form.addressline2,
        Country: form.country,
        State: form.state,
        City: form.city,
        "Zip Code": form.zipcode,
        "Received At": formatReceivedAt(form.createdAt),
      }));
  
    const tableConfig = {
      headStyles: { fillColor: [63, 81, 181] },
      bodyStyles: { valign: 'middle' },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 },
        6: { cellWidth: 45 },
        7: { cellWidth: 45 },
        8: { cellWidth: 50 },
        9: { cellWidth: 50 },
        10: { cellWidth: 50 },
        11: { cellWidth: 40 },
        12: { cellWidth: 40 },
        13: { cellWidth: 20 },
        14: { cellWidth: 20 },
        15: { cellWidth: 20 },
        16: { cellWidth: 20 },
        17: { cellWidth: 20 },
        18: { cellWidth: 25 },
      },
      head: [
        [
          "Company",
          "Contact Number",
          "Email Address",
          "Company Work",
          "Job Post",
          "Salary",
          "Company Website",
          "Contact Person Number",
          "Company Profile",
          "Registration Number",
          "PAN Number",
          "GST Number",
          "Address Line 1",
          "Address Line 2",
          "Country",
          "State",
          "City",
          "Zip Code",
          "Received At",
        ],
      ],
      body: tableData.map((row) => Object.values(row)),
    };
  
    doc.autoTable(tableConfig);
    doc.save("forms.pdf");
  };
  
  return (
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <h1 className="mb-4 text-xl font-bold">Employer Requests</h1>
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
                      Company
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Company Work
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Job Post
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Company Profile
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Country
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b cursor-pointer text-md">
                      Received At
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-right text-gray-900 uppercase border-b cursor-pointer text-md">
                    <FontAwesomeIcon icon={faEdit} />
                    </th>
                    <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-right text-gray-900 uppercase border-b cursor-pointer text-md">
                    <FontAwesomeIcon icon={faTrash} />
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
                          {form.company}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.cwork}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.jobpost}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.companyprofile}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.country}
                        </td>
                        <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="w-1/12 px-4 py-2 font-medium border-b whitespace-nowrap text-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => viewDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="w-1/12 px-4 py-2 font-medium border-b whitespace-nowrap text-center">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteEmployerDetail(form._id)}
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

export default EmployerForms;
