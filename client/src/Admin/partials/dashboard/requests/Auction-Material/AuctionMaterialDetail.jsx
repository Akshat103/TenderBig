import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Sidebar";
import Header from "../../../Header";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuctionMaterialDetail = () => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    // Fetch data from the API
    fetch(
      `http://localhost:5000/apitender/services/aumt/auction-material/${id}`
    )
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.log(error));
    console.log(formData);
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (id) => {
    // Perform update logic here with the updated form data
    // You can send a request to the API to update the data
    // After updating, set isEditing to false to exit editing mode
    setIsEditing(false);
  };

  function updateDetails() {
    fetch(
      `http://localhost:5000/apitender/services/aumt/auction-material/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Replace formData with the updated data object
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("form submitted");
        // Perform any necessary actions after successful update
        // For example, you can navigate to a different page or display a success message
      })
      .catch((error) => console.log(error));
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!formData) {
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
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Auction Material Detail
                  </h2>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  const stepNames = ["Tender Name", "Company Name" /* Add step names here */];

  const progress = Math.round(
    (formData.currentStep / (stepNames.length - 1)) * 100
  );
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
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-20 w-full lg:w-3/4">
                <ProgressBar
                  percent={progress}
                  filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                >
                  {stepNames.map((_, index) => (
                    <Step key={index}>
                      {({ accomplished }) => (
                        <div
                          className={`step ${accomplished ? "completed" : null}`}
                        />
                      )}
                    </Step>
                  ))}
                </ProgressBar>
                <h2 className="text-3xl font-bold mb-4 mt-6 text-center">
                  Auction Material Detail
                </h2>
                <div className="grid  md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Tender Number
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                      value={formData.tenderNumber}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, tenderNumber: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Tender Link
                    </label>
                    <input
                      type="text"
                      className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.tenderLink}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, tenderLink: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.companyName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      CIN Registration
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.cinReg}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, cinReg: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      {" "}
                      GST
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.gst}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, gst: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      PAN
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.pan}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <div>
                    {isEditing ? (
                      <button
                        className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                        onClick={() => handleUpdate(formData._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                      onClick={() => updateDetails(formData._id)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuctionMaterialDetail;