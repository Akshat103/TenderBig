import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import payment from '../../../../../src/components/payment';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserCards = ({ title, description, buttonLink1, buttonLink2, formData }) => {
    const navigate = useNavigate();
    const [titleName, setTitleName] = useState(title);
    const [count, setCount] = useState(description);
    const [formData1, setFormData1] = useState(formData);
    let formLink;
    const [dataStored, setDataStored] = useState(false);

    const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

    const getAmount = async (form) => {
        const { data: { price } } = await axios.get(`${BASE_URL}/formprice/${form}/price`, { headers });
        return price;
    }

    const StoreAtDB = (requestBody, link) => {
        const token = localStorage.getItem('token');

        // Remove unwanted fields from the requestBody
        const filteredRequestBody = Object.keys(requestBody).reduce((acc, key) => {
            if (!['_id', '__v', 'createdAt', 'updatedAt'].includes(key)) {
                acc[key] = requestBody[key];
            }
            return acc;
        }, {});

        axios
            .post(`${BASE_URL}/services/${link}`, filteredRequestBody, {
                headers: {
                    'auth': token
                }
            })
            .then((response) => {
                console.log(" data updated:", response.data);
                setDataStored(true);
                alert("We will contact you soon!!!");
            })
            .catch((error) => {
                console.error("Error sending form data:", error);
                alert("Oops something went wrong!!!");
            });
    }

    const handleRerender = () => {
        setDataStored(false);
    }


    if (dataStored) {
        handleRerender();
    }

    const handleAutoClick = async () => {
        if (Number(description) === 0) {
            alert('you does not have any form');
            return navigate(buttonLink2);
        }
        let price;
        if (titleName === "Registrations") {
            price = await getAmount("Registration")
            formLink = "register/registration";
        }
        else if (titleName === "Seeker") {
            price = await getAmount("Seeker")
            formLink = "seeker/submit-form";
        }
        else if (titleName === "Employer") {
            price = await getAmount("Employer")
            formLink = "employer/submit-form";
        }
        else if (titleName === "Company Certifications") {
            price = await getAmount("Company%20Certification")
            formLink = "ccert/certification";
        }
        else if (titleName === "Individual Certifications") {
            price = await getAmount("Individual%20Certification")
            formLink = "icert/certification";

        }
        else if (titleName === "Joint Venture") {
            price = await getAmount("Joint%20Venture")
            formLink = "jv/submitjv";
        }
        else if (titleName === "Auction Materials") {
            price = await getAmount("Auction%20Material")
            formLink = "aumt/auction-material";
        }
        else if (titleName === "Gem Registration") {
            price = await getAmount("Gem%20Registration")
            formLink = "gem/submit";
        }
        else if (titleName === "Tender Online") {
            price = await getAmount("Online%20Tender");
            formLink = "tender/online";
        }

        const receipt = titleName;
        payment(price, receipt)
            .then(async success => {
                console.log('Payment success:', success);
                console.log(receipt, price);
                alert("payment successful ")
                console.log(formData, formLink);
                StoreAtDB(formData, formLink);
            })
            .catch(error => {
                console.error('Payment error:', error);
                console.log("Payment Failed.")
            });
    };

    const handleNewClick = () => {
        navigate(buttonLink2);
    };

    return (
        <div className="my-10 mx-5">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Count: {description}
                </p>
                <div className="flex flex-wrap justify-center">
                    <button
                        onClick={handleAutoClick}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
                    >
                        Auto
                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNewClick}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
                    >
                        New
                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCards;