import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const RegistrationDetails = () => {
  const [formData, setFormData] = useState(null);
  const token = localStorage.getItem('token');

  const headers = {
    'auth': token
  };
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    fetch(
      `${BASE_URL}/services/register/registration/${id}`, { headers }
    )
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
    fetch(
      `${BASE_URL}/services/register/registration/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth:token
        },
        body: JSON.stringify(formData), // Replace formData with the updated data object
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("form submitted");
      })
      .catch((error) => console.log(error));
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!formData) {
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
    (formData.currentStep / (stepNames.length - 1)) * 100
  );
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="flex justify-center flex-shrink">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-20 w-full lg:w-3/4">
          <ProgressBar
            percent={progress}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
          >
            {/* Step rendering */}
          </ProgressBar>
          <h2 className="text-3xl font-bold mb-4 mt-6 text-center">
            Registration Detail
          </h2>
          <div className="grid grid-cols-2 mb-4 mt-4 gap-11">
          <div>
            <label className="block mb-2 text-xl font-medium ">
              Company
            </label>
            <input
              type="text"
              className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
              value={formData.company}
              readOnly={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium ">
              Company Est
            </label>
            <input
              type="text"
              className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
              value={formData.companyEstd}
              readOnly={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, companyEstd: e.target.value })
              }
            />
          </div>
          </div>

          <div className="grid grid-cols-2 mb-4 mt-4 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Mobile
              </label>
              <input
                type="text"
                className="border text-lg  md:mt-0  border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                value={formData.mobile}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Secondary Mobile
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.secMobile}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, secMobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Email
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                value={formData.email}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Website
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.cwebsite}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, cwebsite: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                CIN
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.CIN}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, CIN: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Work Mobile
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.wmobile}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, wmobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Company Profile
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.cprofile}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, cprofile: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Other Details
              </label>
              <input
                type="text"
                className="border mt-6 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.otherDetails}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherDetails: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Company Post
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.companypost}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companypost: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                License
              </label>
              <input
                type="text"
                className="border mt-6 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.liscence}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, liscence: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Contact Person Name
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                value={formData.cpname}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, cpname: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Category
              </label>
              <input
                type="text"
                className="border mt-6 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.category}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Father's Name
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.fname}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                GST
              </label>
              <input
                type="text"
                className="border mt-6 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.GST}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, GST: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                PAN
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.PAN}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, PAN: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Address
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.address}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                Country
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.companycountry}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companycountry: e.target.value,
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
                value={formData.companycity}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companycity: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                State
              </label>
              <input
                type="text"
                className="border  md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.companystate}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companystate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                Registration URL
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.regUrl}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, regUrl: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label className="block mb-2 text-xl font-medium">
                GST URL
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.gstUrl}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, gstUrl: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-xl font-medium">
                PAN URL
              </label>
              <input
                type="text"
                className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                value={formData.panUrl}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, panUrl: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className=" mt-4">
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
            <div className=" mt-4">
              <button
                className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                onClick={() => updateDetails(formData._id)}
              >
                Submit
              </button>
            </div>
          </div>
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
