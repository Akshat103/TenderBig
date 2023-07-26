import React, { useState } from 'react';

const Modal = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
