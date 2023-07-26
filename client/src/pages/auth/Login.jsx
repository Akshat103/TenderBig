import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
        fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.error){
                    alert(data.error);
                    return
                }
                // Store response in local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user.data));
                // Navigate to the desired page
                const user = data.user.data
                if (user.userRole == "admin" || user.userRole == "hr" || user.userRole == "employee" || user.userRole == "franchise")
                    navigate("/dashboard/admin");
                else if (user.userRole == "user")
                    navigate('/userDashboard')
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
            <div className='flex justify-center m-10 place-content-center'>
                <div className="flex flex-col p-6 px-4 py-8 mx-auto mt-6 bg-white rounded-lg shadow-2xl md:flex-row place-content-center">
                    <div className="w-full m-2 mb-4 md:w-1/2 md:mb-0">
                        <img className="w-80"
                            src={`${import.meta.env.BASE_URL}illustartion/login.svg`}
                            alt="login"
                        />
                    </div>
                    <div className="w-full m-2 md:w-1/2">
                        <h2 className="mb-4 text-2xl font-bold text-center ">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Email
                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                    <input required
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        placeholder="Enter Email" />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold" htmlFor="password">
                                    Password
                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                    <input
                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                                    className="px-4 py-2 font-bold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                                <a
                                    className="text-sm font-medium text-red-700 cursor-pointer hover:text-red-800"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                        <div className="text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-sm font-medium text-red-700 hover:text-red-800"
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
