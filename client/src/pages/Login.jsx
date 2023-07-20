import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Make API request to login
        fetch("http://localhost:3000/apiTender/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Store response in local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user.data));
                // Navigate to the desired page
                const user = data.user.data
                if (user.userRole == "admin" || user.userRole == "hr" || user.userRole == "employee")
                    navigate("/dashboard/users");
                else if (user.userRole == "user")
                    navigate('/dashboard/userDashboard')
                else navigate("/");
                console.log("Login successful");
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

    };

    return (
        <>
            <div className='m-10 place-content-center flex justify-center'>
                <div className="mx-auto mt-6 px-4 py-8 shadow-2xl p-6 bg-white rounded-lg flex flex-col md:flex-row place-content-center">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 m-2">
                        <img className="w-80"
                            src={`${import.meta.env.BASE_URL}illustartion/login.jpg`}
                            alt="login"
                        />
                    </div>
                    <div className="w-full md:w-1/2 m-2">
                        <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Email
                                    <span className="text-red-700 relative top-0 right-0">*</span>
                                    <input required
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Email" />
                                </label>
                            </div>
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
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                                <a
                                    className="text-red-700 hover:text-red-800 text-sm font-medium cursor-pointer"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                        <div className="text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-red-700 hover:text-red-800 text-sm font-medium"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
