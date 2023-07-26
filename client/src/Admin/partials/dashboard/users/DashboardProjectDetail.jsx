import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

  const { projectId } = useParams();

  const [editedProject, setEditedProject] = useState({
    pnr: "",
    companyname: "",
    detail: "",
    value: "",
    status: "",
    country: "",
    state: "",
    city: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${BASE_URL}/projects/${projectId}`,
        editedProject, { headers }
      )
      .then((response) => {
        setProject(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/projects/${projectId}`, { headers })
      .then(() => {
        setIsDeleting(false);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate("/dashboard/allproject");
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/projects/byid/${projectId}`, { headers })
      .then((response) => {
        setProject(response.data);
        setEditedProject({
          pnr: response.data.pnr,
          companyname: response.data.companyname,
          detail: response.data.detail,
          value: response.data.value,
          status: response.data.status,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = () => {
    // Logic for downloading project file
    console.log("Download button clicked");
  };

  return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-xl mx-auto flex justify-center">
            {/* Dashboard actions */}
            <div className="container mx-auto py-8 px-4 ">
              {project && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                  <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Project Details
                  </h1>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">PNR:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="pnr"
                        value={editedProject.pnr}
                        onChange={handleEditChange}
                        className="ml-[94px] border border-gray-300 p-1 rounded "
                      />
                    ) : (
                      <span className="ml-[94px]">{project.pnr}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Company Name:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="companyname"
                        value={editedProject.companyname}
                        onChange={handleEditChange}
                        className="ml-2 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-2">{project.companyname}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Detail:</strong>{" "}
                    {isEditing ? (
                      <input
                        name="detail"
                        value={editedProject.detail}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.detail}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Value:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="value"
                        value={editedProject.value}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.value}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Status:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="status"
                        value={editedProject.status}
                        onChange={handleEditChange}
                        className="ml-[75px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[75px]">{project.status}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Country:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={editedProject.country}
                        onChange={handleEditChange}
                        className="ml-[60px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[60px]">{project.country}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">State:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={editedProject.state}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.state}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">City:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={editedProject.city}
                        onChange={handleEditChange}
                        className="ml-[90px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[90px]">{project.city}</span>
                    )}
                  </p>
                  {isEditing ? (
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-[#111a2b] text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#182235] text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsDeleting(true)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
              {isDeleting && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                  <p className="text-gray-700">
                    Are you sure you want to delete this project?
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setIsDeleting(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {project && (
                <div className="text-center">
                  <button
                    className="bg-[182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>

  );
}

export default ProjectDetails;