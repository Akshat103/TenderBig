import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function DashboardTenderDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tenderDetails, setTenderDetails] = useState({});
  const [active, setActive] = useState("");
  const [approve, setApprove] = useState("");
  const { tenderId } = useParams();
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const fetchTenderDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tenderdetails/tender/${tenderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setTenderDetails(response.data.Product[0]);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchTenderDetails();
  }, [tenderId]);


  const handleApprove = async () => {
    try {
      // Make API call to approve the tender
      await axios.post(
        `${BASE_URL}/tenderdetails/tender/${tenderId}/switchApprovedStatus`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setApprove(!approve);
      fetchTenderDetails();
    } catch (error) {
      console.error(error);
    }
  };


  const handleReject = async () => {
    try {
      // Make API call to reject the tender
      await axios.post(
        `${BASE_URL}/tenderdetails/tender/${tenderId}/switchActiveStatus`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setActive(!active);
      fetchTenderDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make API call to delete the tender
      await axios.delete(
        `${BASE_URL}/tenderdetails/tender/${tenderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );

      alert("Deleted");
      navigate("/dashboard/tenders");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="px-4 py-8 max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Tender Details</h1>
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
            <p>
              <span className="font-bold">For:</span>{" "}
              {tenderDetails.type}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
            <h2 className="text-2xl font-bold mb-4 text-[#182235]">
              Procurement Summary
            </h2>
            <p className="mb-2">
              <span className="font-bold">Country:</span>{' '}
              {tenderDetails.procurementSummary?.country}
            </p>
            <p className="mb-2">
              <span className="font-bold">Summary:</span>{' '}
              {tenderDetails.procurementSummary?.summary}
            </p>
            <p>
              <span className="font-bold">Deadline:</span>{' '}
              {tenderDetails.procurementSummary?.deadline}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
            <h2 className="text-2xl font-bold mb-4 text-[#182235]">
              Other Information
            </h2>
            <p className="mb-2">
              <span className="font-bold">Notice Type:</span>{' '}
              {tenderDetails.otherInformation?.noticeType}
            </p>
            <p className="mb-2">
              <span className="font-bold">TOT Ref.No.:</span>{' '}
              {tenderDetails.otherInformation?.totNo}
            </p>
            <p className="mb-2">
              <span className="font-bold">Document Ref. No.:</span>{' '}
              {tenderDetails.otherInformation?.documentNo}
            </p>
            <p className="mb-2">
              <span className="font-bold">Competition:</span>{' '}
              {tenderDetails.otherInformation?.competition}
            </p>
            <p className="mb-2">
              <span className="font-bold">Financier:</span>{' '}
              {tenderDetails.otherInformation?.financier}
            </p>
            <p className="mb-2">
              <span className="font-bold">Purchaser Ownership:</span>{' '}
              {tenderDetails.otherInformation?.ownership}
            </p>
            <p>
              <span className="font-bold">Tender Value:</span>{' '}
              {tenderDetails.otherInformation?.tenderValue}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
            <h2 className="text-2xl font-bold mb-4 text-[#182235]">
              Purchaser's Detail
            </h2>
            <p className="mb-2">
              <span className="font-bold">Purchaser:</span>{' '}
              {tenderDetails.purchaserDetail?.purchaser}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span>{' '}
              {tenderDetails.purchaserDetail?.address}
            </p>
            <p className="mb-2">
              <span className="font-bold">City:</span>{' '}
              {tenderDetails.purchaserDetail?.city}
            </p>
            <p className="mb-2">
              <span className="font-bold">District:</span>{' '}
              {tenderDetails.purchaserDetail?.district}
            </p>
            <p className="mb-2">
              <span className="font-bold">State:</span>{' '}
              {tenderDetails.purchaserDetail?.state}
            </p>
            <p className="mb-2">
              <span className="font-bold">Pin:</span>{' '}
              {tenderDetails.purchaserDetail?.pin}
            </p>
            <p className="mb-2">
              <span className="font-bold">Tel/Fax:</span>{' '}
              {tenderDetails.purchaserDetail?.telfax}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span>{' '}
              {tenderDetails.purchaserDetail?.email}
            </p>
            <p>
              <span className="font-bold">URL:</span>{' '}
              {tenderDetails.purchaserDetail?.url}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
            <h2 className="text-2xl font-bold mb-4 text-[#182235]">
              Tender Details
            </h2>
            <p className="mb-2">
              <span className="font-bold">Description:</span>{' '}
              {tenderDetails.tenderDetail?.description}
            </p>
            <p className="mb-2">
              <span className="font-bold">Publish Date:</span>{' '}
              {tenderDetails.tenderDetail?.publishDate}
            </p>
            <p className="mb-2">
              <span className="font-bold">UN Organization:</span>{' '}
              {tenderDetails.tenderDetail?.organization}
            </p>
            <p>
              <span className="font-bold">Type of Notice:</span>{' '}
              {tenderDetails.tenderDetail?.noticeType}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleApprove}
        >
          {tenderDetails.approvedStatus ? 'Approved': 'Rejected'}
        </button>

        <button
          className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleReject}
        >
          {tenderDetails.active ? 'Active' : 'Inactive'}
        </button>

        <button
          className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DashboardTenderDetail;
