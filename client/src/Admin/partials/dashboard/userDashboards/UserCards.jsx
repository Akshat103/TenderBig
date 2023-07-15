import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import payment from '../../../../../src/components/payment';
import axios from 'axios';



const UserCards = ({ title, description, buttonLink1, buttonLink2, formData }) => {
    const navigate = useNavigate();
    const [titleName, setTitleName] = useState(title);
    const [count, setCount] = useState(description);
    const [formData1, setFormData1] = useState(formData);
    const [formName, setFormName] = useState("");
    // console.log(count);

    const getAmount = async (Formprice) => {
        console.log(Formprice)
        const { data: { price } } = await axios.get(`http://localhost:5000/apiTender/formprice/${Formprice}/price`);
        return price;
    }

    const StoreAtDB = (requestBody, formName1) => {

        console.log(formName1);
        console.log(requestBody);
        const token = localStorage.getItem('token');
        axios
            .post(`http://localhost:5000/apiTender/services/${formName1}`, requestBody, {
                headers: {
                    'auth': token
                }
            })
            .then((response) => {
                console.log(" data updated:", response.data);
                alert("We will contact you soon!!!");

            })
            .catch((error) => {
                console.error("Error sending form data:", error);
                // alert("Oops something went wrong!!!");
            });
    }

    const handleAutoClick = async () => {
        console.log(description)
        console.log(count);
        if (Number(description) === 0) {
            alert('you does not have any form');
            return navigate(buttonLink2);
        }
        console.log('this is auto click button')
        let price;
        //  console.log(titleName);
        if (titleName === "Registrations") {
            let value = "Registration";
            price = await getAmount(value)
            setFormName("register/registration");
        }
        else if (titleName === "Career & Manpower") {
            let value = "Seeker";
            price = await getAmount(value)
            setFormName("seeker/submit-form");

        }
        else if (titleName === "Company Certifications") {
            let value = "Company%20Certification";
            price = await getAmount(value)
            setFormName("ccert/certification");

        }
        else if (titleName === "Individual Certifications") {
            let value = "Individual%20Certification";
            price = await getAmount(value)
            setFormName("icert/certification");

        }
        else if (titleName === "Joint Venture") {
            let value = "Joint%20Venture";
            price = await getAmount(value)
            setFormName("jv/submitjv");
        }
        else if (titleName === "Tender Offline") {
            let value = "Joint%20Venture";  // this value also wrong not getting value
            price = await getAmount(value);
            setFormName("tender/offline");
        }

        else if (titleName === "Auction Materials") {
            let value = "Auction%20Material";
            price = await getAmount(value)
            setFormName("aumt/auction-material");
        }
        else if (titleName === "Gem Registration") {
            let value = "Gem%20Registration";
            price = await getAmount(value)
            setFormName("gem/submit");

        }
        else if (titleName === "Tender Online") {
            let value = "Joint%20Venture";  // i am not getting any api to take price
            price = await getAmount(value);
            setFormName("tender/online");

        }
        //  const price = await getAmount(Formprice);
        const receipt = titleName;
        //  console.log(price);
        payment(price, receipt)
            .then(async success => {
                console.log('Payment success:', success);
                console.log(receipt, price);
                alert("payment successful ")
                console.log(formData, formName);
                StoreAtDB(formData, formName);
            })
            .catch(error => {
                console.error('Payment error:', error);
                // Handle the error if the payment fails
            });
        // navigate(buttonLink1);
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