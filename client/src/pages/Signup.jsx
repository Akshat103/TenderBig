import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { locations } from "../constants/countriesData"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        country: '',
        state: '',
        city: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make API request with form data
        fetch('http://localhost:5000/apitender/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle response data
                console.log(data);
                if (data.error) {
                    if (data.error.email) alert(data.error.email);
                    if (data.error.phoneNumber) alert(data.error.phoneNumber);
                } else {
                    setSuccessMessage(data.success);
                    // Clear input fields
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        phoneNumber: '',
                        country: '',
                        state: '',
                        city: ''
                    });
                }
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
    };

    return (
        <>
            <div className='m-10'>
                <div className="mx-auto mt-6 px-4 py-8 shadow-2xl p-6 bg-white rounded-lg flex flex-col md:flex-row">

                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <img
                            src={`${import.meta.env.BASE_URL}illustartion/signup.jpg`}
                            alt="Illustration"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-center ">Sign Up</h2>
                        {successMessage && (
                            <div className="mb-4 text-green-500">{successMessage}</div>
                        )}
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold relative">
                                            Name
                                            <span className="text-red-700 relative top-0 right-0">*</span>
                                            <input
                                                required
                                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                placeholder="Enter your name"
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <label className="block mb-2 font-semibold">
                                        Email
                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                        <input required
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            placeholder="Enter Email" />
                                    </label>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold" htmlFor="password">
                                            Password
                                            <span className="text-red-700 relative top-0 right-0">*</span>
                                            <input
                                                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                placeholder="Enter your password"
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold" htmlFor="phoneNumber">
                                            Phone Number
                                            <span className="text-red-700 relative top-0 right-0">*</span>

                                            <input
                                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                type="number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                placeholder="Enter your phone number"
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                            type="submit"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="mb-4">
                                    <label className="block font-semibold">
                                        Country
                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                        <select required
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        >
                                            {locations.map((country, index) => (
                                                <option key={index} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">
                                        State
                                        <span className="text-red-700 relative top-0 right-0">*</span>
                                        <input required
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            placeholder="Enter State"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">
                                        City
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            placeholder="Enter City"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-red-700 hover:text-red-800 text-sm font-medium">
                                Login
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Signup;
