import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuctionMaterialDetail = () => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    fetch(`${BASE_URL}/services/aumt/auction-material/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (id) => {
    setIsEditing(false);
  };

  function updateDetails() {
    fetch(`${BASE_URL}/services/aumt/auction-material/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("form submitted");
      })
      .catch((error) => console.log(error));
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!formData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Auction Material Detail</h2>
          </div>
        </div>
      </div>
    );
  }
  const stepNames = ["Tender Name", "Company Name" /* Add step names here */];

  const progress = Math.round(
    (formData.currentStep / (stepNames.length - 1)) * 100
  );
  return (
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
              <label className="block mb-2 text-xl font-medium"> GST</label>
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
              <label className="block mb-2 text-xl font-medium">PAN</label>
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
          {formData.workExperience.map((data, index) => (
            <div key={index}>
              <div className="grid  md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Experience 1
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                    value={data.workExperience[0]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ tenderNumber: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Experience 2
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                    value={data.workExperience[1]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ tenderNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Order Sample 1
                  </label>
                  <input
                    type="text"
                    className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.workOrderSamples[0]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ tenderLink: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Order Sample 2
                  </label>
                  <input
                    type="text"
                    className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.workOrderSamples[1]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ tenderLink: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Profiles 1
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.workProfiles[0]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Work Profiles 2
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.workProfiles[1]}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              ;
            </div>
          ))}

          {formData.directors.map((data, index) => (
            <div key={index}>
              <div className="grid  md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Director Name {index + 1}
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                    value={data.directorName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, tenderNumber: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Director Aadhar {index + 1}
                  </label>
                  <input
                    type="text"
                    className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.directorAadhar}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, tenderLink: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-medium">
                    Director Pan {index + 1}
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.directorPan}
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
                    Director Dob {index + 1}
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.directorDob}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, cinReg: e.target.value })
                    }
                  />
                </div>
                
              </div>
            </div>
          ))}
          {formData.directors.map((data, index) => (
            <div key={index}>
          <div className="w-full">
                  <label className="block mb-2 text-xl font-medium">
                    {" "}
                    Director Father Name {index +1}
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                    value={data.directorFatherName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, gst: e.target.value })
                    }
                  />
                </div>
                </div>
          ))}

          <div className="grid  md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Address
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                value={formData.address}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, tenderNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Country
              </label>
              <input
                type="text"
                className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.country}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, tenderLink: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                State
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.state}
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
                City
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.city}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, cinReg: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium"> Zip Code</label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.zipCode}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">Website</label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.website}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, pan: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid  md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Project Mail ID
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                value={formData.projectMailId}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, tenderNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Contact Person Name
              </label>
              <input
                type="text"
                className="border text-lg  border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.contactPersonName}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, tenderLink: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Contact Person Number
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.contactPersonNumber}
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
                Auction Material
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.auctionMaterial}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, cinReg: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium"> Other Description</label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.otherDescription}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
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
  );
};

export default AuctionMaterialDetail;
