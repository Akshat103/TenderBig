import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TenderByCategory = () => {
  const { referenceNo } = useParams();
  const [tenderDetails, setTenderDetails] = useState(null);

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const baseUrl = `${BASE_URL}/tenderdetails/tender`;
        const token = localStorage.getItem("token");

        const headers = {
          auth: token,
        };

        const response = await axios.get(`${baseUrl}/${referenceNo}`, { headers });
        const tenderDetails = response.data.Product[0];
        setTenderDetails(tenderDetails);
      } catch (error) {
        console.error("Error fetching tender details:", error);
      }
    };

    if (referenceNo) {
      fetchTenderDetails();
    }
  }, [referenceNo]);

  if (!tenderDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-2 animate-bounce">
          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold">Tender Details</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <p>
            <span className="font-bold">Summary:</span>{" "}
            {tenderDetails.summary}
          </p>
          <p>
            <span className="font-bold">Sector:</span>{" "}
            {tenderDetails.sector}
          </p>
          <p>
            <span className="font-bold">CPV No:</span>{" "}
            {tenderDetails.cpvNo}
          </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <p>
            <span className="font-bold">Type:</span>{" "}
            {tenderDetails.userCategory}
          </p>
          <p>
            <span className="font-bold">Product:</span>{" "}
            {tenderDetails.product}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <h2 className="mb-4 text-2xl font-bold text-red-700">
            Procurement Summary
          </h2>
          <p>
            <span className="font-bold">Country:</span>{" "}
            {tenderDetails.procurementSummary.country}
          </p>
          <p>
            <span className="font-bold">Summary:</span>{" "}
            {tenderDetails.procurementSummary.summary}
          </p>
          <p>
            <span className="font-bold">Deadline:</span>{" "}
            {tenderDetails.procurementSummary.deadline}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <h2 className="mb-4 text-2xl font-bold text-red-700">
            Other Information
          </h2>
          <p>
            <span className="font-bold">Notice Type:</span>{" "}
            {tenderDetails.otherInformation.noticeType}
          </p>
          <p>
            <span className="font-bold">TOT Ref.No.:</span>{" "}
            {tenderDetails.otherInformation.totNo}
          </p>
          <p>
            <span className="font-bold">Document Ref. No.:</span>{" "}
            {tenderDetails.otherInformation.documentNo}
          </p>
          <p>
            <span className="font-bold">Competition:</span>{" "}
            {tenderDetails.otherInformation.competition}
          </p>
          <p>
            <span className="font-bold">Financier:</span>{" "}
            {tenderDetails.otherInformation.financier}
          </p>
          <p>
            <span className="font-bold">Purchaser Ownership:</span>{" "}
            {tenderDetails.otherInformation.ownership}
          </p>
          <p>
            <span className="font-bold">Tender Value:</span>{" "}
            {tenderDetails.otherInformation.tenderValue}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <h2 className="mb-4 text-2xl font-bold text-red-700">
            Purchaser's Detail
          </h2>
          <p>
            <span className="font-bold">Purchaser:</span>{" "}
            {tenderDetails.purchaserDetail.purchaser}
          </p>
          <p>
            <span className="font-bold">Address:</span>{" "}
            {tenderDetails.purchaserDetail.address}
          </p>
          <p>
            <span className="font-bold">City:</span>{" "}
            {tenderDetails.purchaserDetail.city}
          </p>
          <p>
            <span className="font-bold">District:</span>{" "}
            {tenderDetails.purchaserDetail.district}
          </p>
          <p>
            <span className="font-bold">State:</span>{" "}
            {tenderDetails.purchaserDetail.state}
          </p>
          <p>
            <span className="font-bold">Pin:</span>{" "}
            {tenderDetails.purchaserDetail.pin}
          </p>
          <p>
            <span className="font-bold">Tel/Fax:</span>{" "}
            {tenderDetails.purchaserDetail.telfax}
          </p>
          <p>
            <span className="font-bold">Email:</span>{" "}
            {tenderDetails.purchaserDetail.email}
          </p>
          <p>
            <span className="font-bold">URL:</span>{" "}
            {tenderDetails.purchaserDetail.url}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
          <h2 className="mb-4 text-2xl font-bold text-red-700">
            Tender Details
          </h2>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {tenderDetails.tenderDetail.description}
          </p>
          <p>
            <span className="font-bold">Publish Date:</span>{" "}
            {tenderDetails.tenderDetail.publishDate}
          </p>
          <p>
            <span className="font-bold">UN Organization:</span>{" "}
            {tenderDetails.tenderDetail.organization}
          </p>
          <p>
            <span className="font-bold">Type of Notice:</span>{" "}
            {tenderDetails.tenderDetail.noticeType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenderByCategory;