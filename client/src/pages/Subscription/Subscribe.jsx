import React, { useEffect, useState } from 'react';
import axios from 'axios';
import payment from "../../components/payment";
import { State } from 'country-state-city';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SubscribePage = () => {
    const [oneState, setOneState] = useState();
    const [allIndia, setAllIndia] = useState();
    const [global, setGlobal] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedState, setSelectedState] = useState('');

    const getState = async () => {
        const { data: { price } } = await axios.get(`${BASE_URL}/formprice/One%20State/price`);
        setOneState(price);
    };
    const getIndia = async () => {
        const { data: { price } } = await axios.get(`${BASE_URL}/formprice/All%20India/price`);
        setAllIndia(price);
    };
    const getGlobal = async () => {
        const { data: { price } } = await axios.get(`${BASE_URL}/formprice/Global/price`);
        setGlobal(price);
    };

    let stateNames = [];
    const stateData = State.getStatesOfCountry("IN");
    stateNames = Array.from(new Set(Object.values(stateData).map((state) => state.name)));

    useEffect(() => {

        const fetchRazorpayKey = async () => {
            try {
                getState();
                getIndia();
                getGlobal();
            } catch (error) {
                console.log('Error:', error);
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

    const handleSubscription = async (price, planType, selectedState = '') => {
        var receipt = "subscription";
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user._id;

        if (!user) {
            alert("Login first");
            return;
        }
        const requestBody = {
            state: selectedState,
            planType: planType
        };

        payment(price, receipt)
            .then(async (success) => {
                console.log("Payment success:", success);
                const token = localStorage.getItem("token");
                const response = await axios.put(
                    `${BASE_URL}/userdetails/update-status/${id}`,
                    requestBody,
                    {
                        headers: {
                            auth: token,
                        },
                    }
                );
                if (response.data.status == "success") {
                    alert(response.data.message);
                } else {
                    alert("Something went wrong. Try again.");
                }
            })
            .catch((error) => {
                console.error("Payment error:", error);
                alert("Payment Failed")
            });
    }
    // #1f1d5a
    return (
        <div className='min-h-screen  bg-gray-100 py-20'>

        <div className="flex justify-center items-center ">
            <div className="bg-white rounded-lg shadow-lg p-8 border-[2px] border-black/20 ">
                <h2 className="text-3xl font-bold mb-6 text-center">Subscribe Now</h2>

                <div className='grid md:grid-cols-3 gap-10'>
                    <div className="">
                        {/* One State Plan */}
                        <div className="border-[2px] py-4 px-6 rounded-md w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
                            <h3 className="text-lg font-semibold mb-2">One State Plan</h3>
                            <p className="text-gray-600 mb-4">${oneState}/month</p>
                            <button className="bg-red-700 text-white rounded-md py-2 px-4 hover:bg-red-800" onClick={() => handleOneState(oneState)}>Subscribe</button>
                        </div>
                    </div>

                    <div className="">
                        {/* All India Plan */}
                        <div  className="border-[2px] py-4 px-6 rounded-md w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
                            <h3 className="text-lg font-semibold mb-2">All India Plan</h3>
                            <p className="text-gray-600 mb-4">${allIndia}/month</p>
                            <button className="bg-red-700 text-white rounded-md py-2 px-4 hover:bg-red-800" onClick={() => handleSubscription(allIndia, "All India")}>Subscribe</button>
                        </div>
                    </div>

                    <div className="">
                        {/* Global Plan */}
                        <div  className="border-[2px] py-4 px-6 rounded-md w-[330px] cursor-pointer hover:bg-red-100/40 hover:border-red-100/40 duration-200 linear">
                            <h3 className="text-lg font-semibold mb-2">Global Plan</h3>
                            <p className="text-gray-600 mb-4">${global}/month</p>
                            <button className="bg-red-700 text-white rounded-md py-2 px-4 hover:bg-red-800" onClick={() => handleSubscription(global, "Global")}>Subscribe</button>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-8">
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
                                        handleSubscription(oneState, "One State Plan", selectedState);
                                    }
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default SubscribePage;
