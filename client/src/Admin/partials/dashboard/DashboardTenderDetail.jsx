import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

function DashboardTenderDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tenderDetails, setTenderDetails] = useState({});
  const [active, setActive] = useState("");
  const [approve, setApprove] = useState("");
  const { tenderId } = useParams();
  const token = localStorage.getItem('token')
  const naviagate = useNavigate();

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await axios.get(
          `/apiTender/tenderdetails/tender/${tenderId}`,
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

    fetchTenderDetails();
  }, [tenderId]);


  const handleApprove = async () => {
    try {
      // Make API call to approve the tender
      await axios.post(
        `/apiTender/tenderdetails/tender/${tenderId}/switchApprovedStatus`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setApprove(!approve)
      alert("Approved");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  const handleReject = async () => {
    try {
      // Make API call to reject the tender
      await axios.post(
        `/apiTender/tenderdetails/tender/${tenderId}/switchActiveStatus`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setActive(!active);
      alert("Inspected")
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make API call to delete the tender
      await axios.delete(
        `/apiTender/tenderdetails/tender/${tenderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            auth: localStorage.getItem('token'),
          },
        }
      );

      alert("Deleted");
      naviagate("/dashboard/tenders");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              <h1 className="text-3xl font-bold mb-8">Tender Details</h1>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
                  <h2 className="text-2xl font-bold mb-4 text-red-700">
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

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
                    <h2 className="text-2xl font-bold mb-4 text-red-700">
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
                    <h2 className="text-2xl font-bold mb-4 text-red-700">
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
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[1px]">
                  <h2 className="text-2xl font-bold mb-4 text-red-700">
                    Tender Details
                  </h2>
                  <p className="mb-2">
                    <span className="font-bold">Country:</span>{' '}
                    {tenderDetails.tenderDetail?.country}
                  </p>
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

            <div className="flex justify-center">
            
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleApprove}
              >
                {tenderDetails.approvedStatus ? 'Reject' : 'Approve'}
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleReject}
              >
                {tenderDetails.active ? 'Ignore' : 'Inspected'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-15 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardTenderDetail;
