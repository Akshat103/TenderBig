import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TenderOnlineDetail = () => {
    const [data, setFormData] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        // Fetch data from the API
        fetch(`${BASE_URL}/services/tender/online/${id}`)
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
        fetch(`${BASE_URL}/services/tender/online/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Replace formData with the updated data object
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert('form submitted');
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
                                                    className={`step ${accomplished ? "completed" : null
                                                        }`}
                                                />
                                            )}
                                        </Step>
                                    ))}
                                </ProgressBar>
                                <h2 className="text-3xl font-bold mb-4 mt-6 text-center">
                                    Tender Online Detail
                                </h2>
                                {/* <div className="grid grid-cols-2 gap-11  "> */}
                                <div className="w-full">
                                    <label className="block mb-2 text-xl font-medium ">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 me-12 w-full"
                                        value={data.cname}
                                        readOnly={!isEditing}
                                        onChange={(e) =>
                                            setFormData({ ...data, cname: e.target.value })
                                        }
                                    />
                                </div>

                                {/* </div> */}
                                <div className="grid grid-cols-2 mb-4 mt-4 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company PAN Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg  border-gray-300 rounded-md p-2  py-4 w-full bg-gray-200"
                                            value={data.cPANnum}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, cPANnum: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company GST Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.cGSTnum}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, cGSTnum: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Description:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full  bg-gray-200"
                                            value={data.des}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, des: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Vendor:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.vendor}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, vendor: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 mt-11 md:mt-0 text-xl font-medium">
                                            Mobile:
                                        </label>
                                        <input
                                            type="text"
                                            className="border mt-4 md:mt-0 text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.mobile}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, mobile: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Account Holder Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.accholdername}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    accholdername: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            IFSC Code:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.ifscCode}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, ifscCode: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Registration Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.regno}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, regno: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            K-Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.knumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, knumber: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company Address 1:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.companyaddress1}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    companyaddress1: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company Address 2:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md p-2 w-full"
                                            value={data.companyaddress2}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    companyaddress2: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company City:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.companycity}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    companycity: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Company State:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.companystate}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    companystate: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 mt-7 md:mt-0 text-xl font-medium">
                                            Country:
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
                                <div className="grid grid-cols-2  gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Branch Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.branchnum}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, branchnum: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 mt-7 md:mt-0 text-xl font-medium">
                                            ITR One:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.ITRone}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, ITRone: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            ITR Two:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.ITRtwo}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, ITRtwo: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            ITR Three:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.ITRthree}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, ITRthree: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 mt-7 md:mt-0 text-xl font-medium">
                                            Turnover:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.turnover}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, turnover: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Work Experience:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.workexp}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, workexp: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Number of Workers:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.noofworkers}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    noofworkers: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Director Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.directorname}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    directorname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Father's Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.fname}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, fname: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mt-7 md:mt-0 mb-2 text-xl font-medium">
                                            Date of Birth:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.iDOB}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, iDOB: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block  mb-2 text-xl font-medium">
                                            Primary Email:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.pemail}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, pemail: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Primary Aadhar:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.paadhar}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, paadhar: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 mt-7 md:mt-0 text-xl font-medium">
                                            Primary PAN:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.ppan}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, ppan: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Primary Mobile:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.pmobile}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, pmobile: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Work Mobile:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.wmobile}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, wmobile: e.target.value })
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
                                            Account Number:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.accnumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, accnumber: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 mt-7 md:mt-0 text-xl font-medium">
                                            Email:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.email}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            GEM Registration:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.gemreg}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, gemreg: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Reference Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.refno}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, refno: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Requested License:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.requestLicense}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    requestLicense: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Rent Document:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.rent[0]}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, dob: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-11">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Bidding Document{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.biddingDocs[0]}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...data,
                                                    biddingDocs: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Tender Document:
                                        </label>
                                        <input
                                            type="text"
                                            className="border text-lg border-gray-300 rounded-md p-2 py-4 w-full bg-gray-200"
                                            value={data.tenderDocs[0]}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...data, tenderDocs: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    {isEditing ? (
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleUpdate(data._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={handleEdit}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                            Edit
                                        </button>
                                    )}
                                </div>
                                <div className="flex justify-center mt-4">
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
    );
};

export default TenderOnlineDetail;
