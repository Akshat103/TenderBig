import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modals = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (auth) {
      closeModal(); // Close the modal if the user is signed in
    }
  }, [auth]);

  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 p-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700 ml-1">Please Signed in!</p>
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
              {!auth && (
                <button
                  className="px-4 ml-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;