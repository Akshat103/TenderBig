import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { getCountries, getStatesByCountry, getCitiesByCountryAndState } from '../../utils/CountryData';

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


    const countryNames = getCountries();

    let stateNames = [];
    if (formData.country) {
      stateNames = getStatesByCountry(formData.country);
    }
  
    let cityNames = [];
    if (formData.country && formData.state) {
      cityNames = getCitiesByCountryAndState(formData.country, formData.state);
    }

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
        fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setSuccessMessage("User added successfully.")
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
                else {
                    const error = data.error;
                    if (error.email.length > 0) alert(error.email)
                    else if (error.name.length > 0) alert(error.name)
                    else if (error.password.length > 0) alert(error.password)
                    else if (error.phoneNumber.length > 0) alert(error.phoneNumber)
                    else alert("Something went wrong. Try again.")
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
                            src={`${import.meta.env.BASE_URL}illustartion/signup.svg`}
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
                                            {countryNames.map((country, index) => (
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
                                        <select
                                            required
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        >
                                            <option value="">Select a state</option>
                                            {stateNames.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">
                                        City
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            placeholder="Enter a city"
                                            autoComplete="off"
                                            list="cityNamesList"
                                        />
                                        <datalist id="cityNamesList">
                                            {cityNames.map((city) => (
                                                <option key={city} value={city} />
                                            ))}
                                        </datalist>
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
