import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const FormPriceManagement = () => {
    const [formPrices, setFormPrices] = useState([]);
    const [updatePrices, setUpdatePrices] = useState({});

    const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

    useEffect(() => {
        fetchFormPrices();
    }, []);

    const fetchFormPrices = () => {
        axios
            .get(`${BASE_URL}/formprice/getall`, { headers })
            .then(response => {
                const data = response.data;
                setFormPrices(data);
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while fetching form prices. Please try again.');
            });
    };

    const handleUpdatePrice = (formName) => {
        const updatedPrice = parseFloat(updatePrices[formName]);
        if (isNaN(updatedPrice)) {
            alert('Please enter a valid price.');
            return;
        }

        axios
            .put(`${BASE_URL}/formprice/${formName}/price`, { price: updatedPrice }, { headers })
            .then(response => {
                const data = response.data;
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Price updated successfully!');
                    fetchFormPrices();
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while updating the price. Please try again.');
            });
    };

    const handlePriceChange = (formName, event) => {
        const updatedPrices = { ...updatePrices };
        updatedPrices[formName] = event.target.value;
        setUpdatePrices(updatedPrices);
    };

    return (
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        <div className="grid grid-cols-15 gap-6">
                            <div className="container mx-auto mt-4">
                                <h1 className="text-2xl font-bold mb-4">Form Price Management</h1>

                                {formPrices.map((formPrice) => (
                                    <div key={formPrice.formName} className="flex items-center justify-between mt-2 mb-2 border-2 border-gray-500 p-4 m-2 grid grid-cols-1 md:flex md:justify-between md:grid-cols-none">
                                        <div>
                                            <span className="font-semibold">{formPrice.formName}</span>: ₹{formPrice.price}
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                name={`price-${formPrice.formName}`}
                                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:gray-red-700 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                                                placeholder="Enter Price"
                                                value={updatePrices[formPrice.formName] || ''}
                                                onChange={(event) => handlePriceChange(formPrice.formName, event)}
                                            />
                                            <button
                                                className="bg-[#182235] hover:bg-[#111a2b] mx-6 text-white px-4 py-2 rounded-lg font-semibold"
                                                onClick={() => handleUpdatePrice(formPrice.formName)}
                                            >
                                                Update Price
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>


                    </div>
    );
};

export default FormPriceManagement;
