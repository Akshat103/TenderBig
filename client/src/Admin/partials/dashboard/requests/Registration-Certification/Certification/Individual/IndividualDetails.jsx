import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const IndividualDetails = () => {
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        // Fetch data from the API
        fetch(`${BASE_URL}/services/icert/certification/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data)
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (id) => {
        setIsEditing(false);
    };

    function updateDetails() {
        fetch(`${BASE_URL}/services/icert/certification/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Replace formData with the updated data object
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert('form submitted')
            })
            .catch((error) => console.log(error));
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (!formData) {
        return (
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="flex justify-center">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-xl font-bold mb-4">Auction Material Detail</h2>
                                </div>
                            </div>
                        </div>
        );
    }
    const stepNames = ['Tender Name', 'Company Name', /* Add step names here */];

    const progress = Math.round((formData.currentStep / (stepNames.length - 1)) * 100);
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
                                                <div className={`step ${accomplished ? 'completed' : null}`} />
                                            )}
                                        </Step>
                                    ))}
                                </ProgressBar>
                                <h2 className="text-3xl font-bold mb-4 mt-6 text-center">Individual Detail</h2>
                                {/* <div className="grid grid-cols-2 gap-11  "> */}
                                <div className="w-full">
                                    <label className="block mb-2 text-xl font-medium ">Father's Name:</label>
                                    <input
                                        type="text"
                                        className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
                                        value={formData.fatherName}
                                        readOnly={!isEditing}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fatherName: e.target.value })
                                        }
                                    />
                                </div>

                                {/* </div> */}
                                <div className="grid grid-cols-2 mb-4 mt-4 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Date of Birth:</label>
                                        <input
                                            type="text"
                                            className="border text-lg mt-7 md:mt-0 border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                                            value={formData.dob}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, dob: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Aadhar Number:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.aadharNumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, aadharNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">PAN Number:</label>
                                        <input
                                            type="text"
                                            className="border mt-7 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                                            value={formData.panNumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, panNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Working Field:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.workingField}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, workingField: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Company Address 1:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.companyaddress1}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companyaddress1: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Company Address 2:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.companyaddress2}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companyaddress2: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">City:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.companycity}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companycity: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">State:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.companystate}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companystate: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Zip Code:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.zipcode}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, zipcode: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Country:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.companycountry}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companycountry: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 mt-2 md:mt-0 text-xl font-medium">Others:</label>
                                        <input
                                            type="text"
                                            className="border mt-6 md:mt-0 text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                                            value={formData.others}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, others: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">PMobile Number:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.mobileNumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, mobileNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 mt-4 md:mt-0 text-xl font-medium">Email:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 mt-4 md:mt-0 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.email}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Request License:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.requestLicense}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, requestLicense: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Photo</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.photoUrl}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Aadhar Card:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.aadharUrl}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">PAN Card:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.panUrl}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">Signature:</label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={formData.signatureUrl}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">CIN Upload:</label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.cinUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">GST Upload:</label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.gstUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">PAN Upload:</label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.companyUploads.panUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">PAN:</label>
                    <input
                      type="text"
                      className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                      value={data.pan}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    />
                  </div>
                </div> */}
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
                                            <FontAwesomeIcon icon={faEdit} />
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
                            </div></div>
                        </div>
                    </div>
    );
};

export default IndividualDetails;
