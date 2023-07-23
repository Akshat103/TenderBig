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
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SeekerForm = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [formsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the API
        fetch(`${BASE_URL}/services/seeker/forms`)
            .then((response) => response.json())
            .then((data) => setForms(data))
            .catch((error) => console.log(error));
    }, []);

    function deleteSeekerDetail(id) {
        fetch(`${BASE_URL}/services/seeker/forms/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
        navigate(`/dashboard/seekerrequests/${id}`);
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
          Name: form.name,
          "Father's Name": form.fathername,
          "Mobile:": form.mobile,
          "Email:": form.email ,
          "10th Mark:": form.tenMark ,
          "12th Mark:": form.twelveMark ,
          

          "Job Post": form.jobpost,
          "Job Experience": form.jobexp,
          "Company:": form.company,
          "Address:": form.address ,
          
          City: form.city,
          " State:": form.state ,
          "Country:": form.country ,
          "Zip": form.zip,
          "Past Salary":form.pastSalary,
          "Expected Salary": form.expectedSalary,
          Resume:form.resumeUrl,
          Photo:form.photoUrl,
          Aadhar:form.aadharUrl,
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
            Name: form.name,
            "Father's Name": form.fathername,
            Mobile: form.mobile,
            Email: form.email,
            "10th Mark": form.tenMark,
            "12th Mark": form.twelveMark,
            "Job Post": form.jobpost,
            "Job Experience": form.jobexp,
            Company: form.company,
            Address: form.address,
            City: form.city,
            State: form.state,
            Country: form.country,
            Zip: form.zip,
            "Past Salary": form.pastSalary,
            "Expected Salary": form.expectedSalary,
            Resume: form.resumeUrl,
            Photo: form.photoUrl,
            Aadhar: form.aadharUrl,
            "Received At": formatReceivedAt(form.createdAt),
          }));
      
        const tableConfig = {
          headStyles: { fillColor: [63, 81, 181] },
          bodyStyles: { valign: 'middle' },
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 40 },
            2: { cellWidth: 30 },
            3: { cellWidth: 30 },
            4: { cellWidth: 20 },
            5: { cellWidth: 20 },
            6: { cellWidth: 40 },
            7: { cellWidth: 40 },
            8: { cellWidth: 40 },
            9: { cellWidth: 40 },
            10: { cellWidth: 20 },
            11: { cellWidth: 20 },
            12: { cellWidth: 20 },
            13: { cellWidth: 20 },
            14: { cellWidth: 25 },
            15: { cellWidth: 30 },
            16: { cellWidth: 20 },
            17: { cellWidth: 20 },
            18: { cellWidth: 20 },
          },
          head: [
            [
              "Name",
              "Father's Name",
              "Mobile",
              "Email",
              "10th Mark",
              "12th Mark",
              "Job Post",
              "Job Experience",
              "Company",
              "Address",
              "City",
              "State",
              "Country",
              "Zip",
              "Past Salary",
              "Expected Salary",
              "Resume",
              "Photo",
              "Aadhar",
              "Received At",
            ],
          ],
          body: tableData.map((row) => Object.values(row)),
        };
      
        doc.autoTable(tableConfig);
        doc.save("forms.pdf");
      };
      


    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-auto overflow-y-auto">
                <main>
                    {/* Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        <h1 className="mb-4 text-xl font-bold">Seeker Requests</h1>
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
                                            Name
                                        </th>
                                        <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                                            Job Post
                                        </th>
                                        <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                                            Job Experience
                                        </th>
                                        <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                                            City
                                        </th>
                                        <th className="w-1/6 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                                            Expected Salary
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
                                                    {form.name}
                                                </td>
                                                <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                                                    {form.jobpost}
                                                </td>
                                                <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                                                    {form.jobexp}
                                                </td>
                                                <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                                                    {form.city}
                                                </td>
                                                <td className="w-1/6 px-4 py-2 font-medium border-b whitespace-nowrap">
                                                    {form.expectedSalary}
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
                                                        onClick={() => deleteSeekerDetail(form._id)}
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

export default SeekerForm;
