import React from 'react';
import { Link } from 'react-router-dom';

const NotLogedIn = () => {
    return (
        <div className="flex flex-col items-center h-screen">
            <img
                src={`${import.meta.env.BASE_URL}illustartion/noaccess.svg`}
                className="w-1/5 md:w-1/5 m-2"
                alt="ACCESS DENIED"
            />
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
            <p className="text-lg">Please <Link to="/login" className="text-blue-600 underline">LOGIN</Link> to access the content.</p>
        </div>
    );
};

export default NotLogedIn;
