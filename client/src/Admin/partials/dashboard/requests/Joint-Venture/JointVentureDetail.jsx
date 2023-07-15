import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Sidebar";
import Header from "../../../Header";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JointVentureDetail = () => {
  const [data, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    // Fetch data from the API
    fetch(`http://localhost:5000/apiTender/services/jv/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.log(error));
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
    fetch(`http://localhost:5000/apiTender/services/jv/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Replace formData with the updated data object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after successful update
        // For example, you can navigate to a different page or display a success message
      })
      .catch((error) => console.log(error));
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!data) {
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
                <div className="bg-white rounded-lg shadow-lg p-6">
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
    (data.currentStep / (stepNames.length - 1)) * 100
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
            <div className="flex justify-center flex-shrink">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-20 w-full lg:w-3/4">
                <ProgressBar
                  percent={progress}
                  filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                >
                  {stepNames.map((_, index) => (
                    <Step key={index}>
                      {({ accomplished }) => (
                        <div
                          className={`step ${
                            accomplished ? "completed" : null
                          }`}
                        />
                      )}
                    </Step>
                  ))}
                </ProgressBar>
                <h2 className="text-3xl font-bold mb-4 mt-6 text-center">
                  Joint Venture Detail
                </h2>
                {/* <div className="grid grid-cols-2 gap-11  "> */}
                <div className="w-full">
                  <label className="block mb-2 text-xl font-medium ">
                    Tender Name
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
                    value={data.tenderName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...data, tenderName: e.target.value })
                    }
                  />
                </div>

                {/* </div> */}
                <div className="grid grid-cols-2 mb-4 mt-4 gap-11">
                  <div>
                    <label className="block mt-6 md:mt-0 mb-2 text-xl font-medium">
                      City:
                    </label>
                    <input
                      type="text"
                      className="border mt-2 md:mt-0 text-lg  border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                      value={data.city}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Company Address:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyAddress}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, companyAddress: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Country:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                      value={data.country}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, country: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      State:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.state}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, state: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Zip Code:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.zipCode}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, zipCode: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Website:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.website}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, website: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Start Date:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.startDate}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      End Date:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.endDate}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Work Ratio:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.workRatio}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, workRatio: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      GST:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.gst}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, gst: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 mt-3 md:mt-0 text-xl font-medium">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="border mt-6 md:mt-0 text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                      value={data.companyName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, companyName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Partnership Project Tender:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.partnershipProjectTender}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...data,
                          partnershipProjectTender: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 mt-5 md:mt-0 text-xl font-medium">
                      Partnership Ratio:
                    </label>
                    <input
                      type="text"
                      className="border mt-3 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.partnershipRatio}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...data,
                          partnershipRatio: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Project Tender Name:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.projectTenderName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...data,
                          projectTenderName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Other Description:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.otherDescription}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...data,
                          otherDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Manpower Requirement:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.requirement.manpower}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, manpower: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Other Description:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.otherDescription}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...data,
                          otherDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Manpower Requirement:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.requirement.manpower}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, manpower: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      CIN Upload:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.cinUpload[0]}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      GST Upload:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.gstUpload[0]}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      PAN Upload:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.panUpload[0]}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      PAN:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.pan}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, pan: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className=" mt-4">
                    {isEditing ? (
                      <button
                        className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                        onClick={() => handleUpdate(data._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                        onClick={handleEdit}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit
                      </button>
                    )}
                  </div>
                  <div className=" mt-4">
                    <button
                      className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                      onClick={() => updateDetails(data._id)}
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

export default JointVentureDetail;
