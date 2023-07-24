import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GemRegistrationDetail = () => {
  const [data, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${BASE_URL}/services/gem/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (id) => {
    setIsEditing(false);
  };

  function updateDetails() {
    fetch(`${BASE_URL}/services/gem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("form updated");
      })
      .catch((error) => console.log(error));
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!data) {
    return (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Auction Material Detail
                  </h2>
                </div>
              </div>
            </div>
    );
  }
  const stepNames = ["Tender Name", "Company Name" /* Add step names here */];

  const progress = Math.round(
    (data.currentStep / (stepNames.length - 1)) * 100
  );
  return (
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
                  Gem Registration Detail
                </h2>
                {/* <div className="grid grid-cols-2 gap-11  "> */}
                <div className="w-full">
                  <label className="block mb-2 text-xl font-medium ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
                    value={data.name}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...data, name: e.target.value })
                    }
                  />
                </div>

                {/* </div> */}
                <div className="grid  grid-cols-2 mb-4 mt-4 gap-11">
                  <div className="mt-7 md:mt-0">
                    <label className="block mb-2 text-xl font-medium">
                      Email
                    </label>
                    <input
                      type="text"
                      className="border text-lg  border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                      value={data.email}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.contact}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, contact: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Aadhar Number
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                      value={data.aadhar}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, aadhar: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      {" "}
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, companyName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div className="mt-7 md:mt-0">
                    <label className="block mb-2 text-xl font-medium">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.panNumber}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, panNumber: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Website Address
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.websiteAddress}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, websiteAddress: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div className="mt-7 md:mt-0">
                    <label className="block mb-2 text-xl font-medium">
                      GST Number
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
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Business Start Date
                    </label>
                    <input
                      type="date"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.startDate}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, startDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Business Office Building
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.address}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="mt-12 md:mt-0">
                    <label className="block mb-2 text-xl font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.country}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, country: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      {" "}
                      State
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                      value={data.state}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, state: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.city}
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
                      ZIP Code
                    </label>
                    <input
                      type="number"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.zip}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...data, zip: e.target.value })
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
  );
};

export default GemRegistrationDetail;
