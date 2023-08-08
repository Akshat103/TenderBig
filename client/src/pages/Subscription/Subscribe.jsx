import React, { useEffect, useState } from "react";
import axios from "axios";
import payment from "../../components/payment";
import { getStatesByCountry } from "../../utils/CountryData";
import Modal from "../../components/Modal";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SubscribePage = () => {
  const [oneState, setOneState] = useState();
  const [allIndia, setAllIndia] = useState();
  const [global, setGlobal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    auth: token,
  };

  const getState = async () => {
    const {
      data: { price },
    } = await axios.get(`${BASE_URL}/formprice/One%20State/price`, { headers });
    setOneState(price);
  };
  const getIndia = async () => {
    const {
      data: { price },
    } = await axios.get(`${BASE_URL}/formprice/All%20India/price`, { headers });
    setAllIndia(price);
  };
  const getGlobal = async () => {
    const {
      data: { price },
    } = await axios.get(`${BASE_URL}/formprice/Global/price`, { headers });
    setGlobal(price);
  };

  const stateNames = getStatesByCountry("India");

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        getState();
        getIndia();
        getGlobal();
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchRazorpayKey();
  }, []);

  const handleOneState = (price) => {
    setIsModalOpen(true);
  };

  const handleStateSelect = (event) => {
    setSelectedState(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const preventCloseModal = (e) => {
    e.stopPropagation();
  };

  const handleSubscription = async (price, planType, selectedState = "") => {
    if (!token) {
      setErrorMessage("Sign in Please.");
      return;
    }

    var receipt = "subscription";
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user._id;

    payment(price, receipt, true, planType, selectedState, id)
      .then(async (success) => {
        console.log("Payment success:", success);
        if (success) {
          alert("Subscription activated successfully.");
        } else {
          alert("Something went wrong. Try again.");
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        alert("Payment Failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* One State Plan */}
          <div className="bg-white rounded-lg shadow-lg  border-[2px] border-black/20 w-full md:w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
            <h3 className="text-3xl bg-gray-300  h-16 font-semibold text-center mb-2">
              One State Plan
            </h3>
            <p className="text-gray-600 pl-5 text-2xl text-center mb-4">
              Rs{oneState}/month
            </p>
            <li className="font-semibold text-center list-none px-3 mb-5">
              Unlimited Website Access
            </li>
            <li className="font-semibold text-center list-none px-3 mb-5">
              Unlimited Tenders Download
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Unlimited Keyword Search
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Access to Archive Tenders
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              24*7 Customer Support
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Validity 1 Months
            </li>
            <button
              className="bg-red-700 ml-48 md:ml-28  mb-3 text-white rounded-md py-2 px-4 hover:bg-red-800"
              onClick={() => handleOneState(oneState)}
            >
              Subscribe
            </button>
          </div>

          {/* All India Plan */}
          <div className="bg-white rounded-lg shadow-lg  border-[2px] border-black/20 w-full md:w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
            <h3 className="text-3xl bg-gray-300 h-16 font-semibold text-center mb-2">
              All India Plan
            </h3>
            <p className="text-gray-600 pl-5 text-2xl text-center mb-4">
              Rs{allIndia}/month
            </p>
            <li className="font-semibold text-center list-none px-3 mb-5">
              Unlimited Website Access
            </li>
            <li className="font-semibold text-center list-none px-3 mb-5">
              Unlimited Tenders Download
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Unlimited Keyword Search
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Access to Archive Tenders
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              24*7 Customer Support
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Validity 1 Months
            </li>
            <button
              className="bg-red-700 ml-48 md:ml-28  mb-3 text-white rounded-md py-2 px-4 hover:bg-red-800"
              onClick={() => handleSubscription(oneState)}
            >
              Subscribe
            </button>
          </div>

          {/* Global Plan */}
          <div className="bg-white rounded-lg shadow-lg  border-[2px] border-black/20 w-full md:w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
            <h3 className="text-3xl bg-gray-300  h-16 font-semibold text-center mb-2">
              Global Plan
            </h3>
            <p className="text-gray-600 pl-5 text-2xl text-center mb-4">Rs{global}/month</p>
            <li className="font-semibold text-center  list-none px-3 mb-5">
              Contract Awards, Projects and Many Other Benefits
            </li>
            <li className="font-semibold text-center list-none px-3 mb-5">
              Unlimited Website Access
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
            Unlimited Tenders Download
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Unlimited Keyword Search
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Access to Archive Tenders
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              24*7 Customer Support
            </li>
            <li className="font-semibold text-center px-3 list-none mb-5">
              Validity 1 Months
            </li>
            <button
              className="bg-red-700 text-white ml-48 md:ml-28 mb-3 rounded-md py-2 px-4 hover:bg-red-800"
              onClick={() => handleSubscription(global, "Global")}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-8"
              onClick={preventCloseModal}
            >
              <h2 className="text-2xl font-bold mb-6">Select State</h2>
              <select
                className="border p-2 rounded-md w-full mb-4"
                value={selectedState}
                onChange={handleStateSelect}
              >
                <option value="">Select a state</option>
                {stateNames.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <button
                className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                onClick={() => {
                  setIsModalOpen(false);
                  if (selectedState) {
                    handleSubscription(
                      oneState,
                      "One State Plan",
                      selectedState
                    );
                  }
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        )}

        {errorMessage && <Modal message={errorMessage} />}
      </div>
    </div>
  );
};

export default SubscribePage;
