import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Sidebar";
import Header from "../../../Header";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SeekerFormDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch data from the API
    fetch(`http://localhost:5000/apiTender/services/seeker/forms/${id}`)
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
    fetch(`http://localhost:5000/apiTender/services/seeker/forms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Replace formData with the updated data object
    })
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
            <div className="flex justify-center flex-shrink">
              <div className="bg-white rounded-lg  p-20 shadow-2xl w-3/4">
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
                  Seeker Form Detail
                </h2>
                {/* <div className="grid grid-cols-2 gap-11  "> */}
                <div className="w-full">
                  <label className="block mb-2 text-xl font-medium ">
                    Name
                  </label>
                  <input
                    type="text"
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
                    value={formData.name}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* </div> */}
                {/* <div className="grid grid-cols-2 mb-4 mt-4 gap-11"> */}
                <div className="w-full">
                  <label className="block mb-2 text-xl font-medium">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    className="border text-lg  border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                    value={formData.fathername}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, fathername: e.target.value })
                    }
                  />
                </div>
                {/* </div> */}
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Mobile:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                      value={formData.mobile}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Email:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.email}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      10th Mark:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.tenMark}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, tenMark: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      12th Mark:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.twelveMark}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, twelveMark: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Job Post:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.jobpost}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, jobpost: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Job Experience:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.jobexp}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, jobexp: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Company:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.company}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Address:
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
                      City:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                      value={formData.city}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
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
                      value={formData.state}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
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
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.country}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      ZIP:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.zip}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, zip: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Past Salary:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.pastSalary}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, pastSalary: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Expected Salary:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.expectedSalary}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expectedSalary: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      PAN:
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
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Hobies:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.hobbies}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, hobbies: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Resume:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.resumeUrl}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Photo:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.photoUrl}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Aadhar:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.aadharUrl}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">
                      Aadhar:
                    </label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={formData.aadhar}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mt-4">
                    {isEditing ? (
                      <button
                      className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleUpdate(formData._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                      className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={handleEdit}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
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

export default SeekerFormDetail;
