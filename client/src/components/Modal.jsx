import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);
  const auth = JSON.parse(localStorage.getItem("user"));
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const isUserSignedIn = true;
    setIsSignedIn(!false);
  }, [isSignedIn]);

  const handleLogin = () => {
    setIsSignedIn(true);
    navigate(`/login`);
  };

  const handleSubscription = () => {
    navigate(`/subscribe`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 p-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700">{message}</p>
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
              {auth ?  (
                <button
                  className="px-4 ml-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSubscription}
                >
                  Subscription
                </button>
              ): (
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

export default Modal;