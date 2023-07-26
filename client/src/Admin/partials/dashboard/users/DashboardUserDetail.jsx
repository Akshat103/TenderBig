import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function UserDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const logedInUser = JSON.parse(localStorage.getItem("user"));

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/userdetails/single-user/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      setUser(response.data.User[0]);
      setSelectedRole(response.data.User[0].userRole);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchUserDetails();
  }, [userId, token]);

  const handleDelete = async () => {
    try {
      // Make API call to delete the user
      await axios.delete(
        `${BASE_URL}/userdetails/delete/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );

      alert('Deleted');
      navigate('/dashboard/users');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleUpdateRole = async (userId, selectedRole) => {
    try {
      // Make API call to update the user role
      await axios.put(
        `${BASE_URL}/userdetails/updaterole`,
        {
          userId: userId,
          userRole: selectedRole,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
      alert('Role updated successfully');
      fetchUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">Name:</strong>{' '}
              <span className="ml-2">{user.name}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">Email:</strong>{' '}
              <span className="ml-2">{user.email}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">User Role:</strong>{' '}
              <span className="ml-2">{user.userRole}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">Phone Number:</strong>{' '}
              <span className="ml-2">{user.phoneNumber}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">Country:</strong>{' '}
              <span className="ml-2">{user.country}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">State:</strong>{' '}
              <span className="ml-2">{user.state}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-gray-900">City:</strong>{' '}
              <span className="ml-2">{user.city}</span>
            </p>
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userRole"
            >
              Update Role:
            </label>
            <select
              className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
              id="userRole"
              name="userRole"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {
                (logedInUser.userRole === "admin") ? (
                  <>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                    <option value="franchise">Franchise</option>
                    <option value="user">User</option>
                  </>
                ) : (logedInUser.userRole === "hr") ? (
                  // Options for HR role
                  <>
                    <option value="employee">Employee</option>
                    <option value="franchise">Franchise</option>
                    <option value="user">User</option>
                  </>
                ) : (logedInUser.userRole === "employee") ? (
                  // Options for Employee role
                  <>
                    <option value="franchise">Franchise</option>
                    <option value="user">User</option>
                  </>
                ) : (
                  // Options for Franchise role
                  <option value="user">User</option>
                )
              }

            </select>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUpdateRole(user.userId, selectedRole)}
              >
                Update Role
              </button>
              <button
                className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;