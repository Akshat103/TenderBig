import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserDetailsCard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedCountry, setEditedCountry] = useState('');
    const [editedState, setEditedState] = useState('');
    const [editedCity, setEditedCity] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserDetails(user);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditedPhoneNumber(user.phoneNumber);
        setEditedCountry(user.country);
        setEditedState(user.state);
        setEditedCity(user.city);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() - 30);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Event handler for enabling editing mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const token = localStorage.getItem("token");

    // Event handler for saving the edited data to the API
    const handleSave = () => {
        const formData = {
            name: editedName,
            email: editedEmail,
            phoneNumber: editedPhoneNumber,
            country: editedCountry,
            state: editedState,
            city: editedCity,
        };

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        fetch(`${BASE_URL}/userdetails/single-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                auth: token
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the API response here
                if (data.success) {
                    setUserDetails(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                else {
                    alert("Something went wrong. Try again.")
                }
                setIsEditing(false);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-3 mb-3 border-4 border-red-700">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Welcome {userDetails?.name}</h2>
                {isEditing ? (
                    <>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">Name:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">Email:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">Phone Number:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="tel"
                                value={editedPhoneNumber}
                                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">Country:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="text"
                                value={editedCountry}
                                onChange={(e) => setEditedCountry(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">State:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="text"
                                value={editedState}
                                onChange={(e) => setEditedState(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold text-gray-600">City:</label>
                            <input
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                type="text"
                                value={editedCity}
                                onChange={(e) => setEditedCity(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mt-2 text-gray-600">
                            Email: {userDetails?.email}
                        </p>
                        <p className="mt-2 text-gray-600">
                            Phone Number: {userDetails?.phoneNumber}
                        </p>
                        <p className="mt-2 text-gray-600">
                            Country: {userDetails?.country}
                        </p>
                        <p className="mt-2 text-gray-600">
                            State: {userDetails?.state}
                        </p>
                        <p className="mt-2 text-gray-600">
                            City: {userDetails?.city}
                        </p>
                        {(userDetails?.subscription.status == "inactive") ?
                            <p className="mt-2 text-gray-600">
                                Subscription: {userDetails?.subscription.status.toUpperCase()}
                            </p>
                            : <>
                                <p className="mt-2 text-gray-600">
                                    Subscription: {userDetails?.subscription.status.toUpperCase()}
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Plan: {userDetails?.subscription.type}
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Subscription Date: {formatDate(userDetails?.subscription?.date)}
                                </p>
                                {(userDetails?.subscription.type == 'One State Plan') ? <p className="mt-2 text-gray-600">
                                    State: {formatDate(userDetails?.subscription?.state)}
                                </p> : <></>}
                            </>
                        }
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserDetailsCard;
