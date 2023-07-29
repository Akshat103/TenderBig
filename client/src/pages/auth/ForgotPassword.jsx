import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();

    const [otpSent, setOtpSent] = useState(false);

    const [password, setPassword] = useState();
    const [conformPassword, setconformPassword] = useState();
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConformPasswordChange = (event) => {
        setconformPassword(event.target.value);
    };

    useEffect(() => {
        if (password !== conformPassword && conformPassword !== '') {
            setPasswordError("Passwords don't match");
        } else {
            setPasswordError('');
        }
    }, [password, conformPassword]);

    const handleGetOtp = async (e) => {
        e.preventDefault();
        // Make API request to login
        try {
            setLoading(true)
            await fetch(`${BASE_URL}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false)
                    if (data.success) {
                        setOtpSent(true)
                        alert(data.message)
                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                    alert("Something went wrong. Try again later.")
                });

        } catch (error) {
            alert("Something went wrong. Try again.")
        }

    };

    const handleResetRequest = (e) => {
        e.preventDefault();
        // Make API request to login
        try {
            fetch(`${BASE_URL}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: password, conformPassword: conformPassword, otp: otp }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setOtpSent(true)
                        alert(data.message)
                        navigate('/login')
                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                    alert("Something went wrong. Try again later.")
                });
        }
        catch (error) {
            alert("Something went wrong. Try again.")
        }

    };

    return (
        <>
            <div className='flex justify-center m-10 place-content-center'>
                <div className="flex flex-col p-6 px-4 py-8 mx-auto mt-6 bg-white rounded-lg shadow-2xl md:flex-row place-content-center">
                    <div className="w-full m-2">
                        <h2 className="mb-4 text-2xl font-bold text-center ">Change Password</h2>

                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">
                                Email
                                <span className="relative top-0 right-0 text-red-700">*</span>
                                <input required
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                    placeholder="Enter Email" />
                            </label>
                        </div>
                        <button
                            className="flex items-center justify-center w-28 px-4 py-2 font-bold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 mt-2 mb-2"
                            onClick={handleGetOtp}
                        >
                            {loading ? (
                                <div>
                                    <button
                                        className="w-full h-full flex items-center justify-center px-4 py-2 font-bold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        onClick={handleGetOtp}
                                    >
                                        <img
                                            src={`${import.meta.env.BASE_URL}reload.gif`}
                                            alt="login"
                                            className="w-5 h-5"
                                            loading="lazy"
                                        />
                                    </button>
                                </div>
                            ) : (
                                "Get OTP"
                            )}
                        </button>


                        <div className="mb-4">
                            {otpSent ? <>
                                <label className="block mb-2 font-semibold" htmlFor="password">
                                    Password
                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                    <input
                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        placeholder="Enter your password"
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </label>
                                <label className="block mb-2 font-semibold" htmlFor="conformPassword">
                                    Conform Password
                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                    <input
                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        type="password"
                                        id="conformPassword"
                                        name="conformPassword"
                                        value={conformPassword}
                                        placeholder="Enter password again"
                                        onChange={handleConformPasswordChange}
                                        required
                                    />
                                </label>
                                {passwordError && <p className="text-red-700">{passwordError}</p>}
                                <label className="block mb-2 font-semibold" htmlFor="otp">
                                    Enter One Time Password
                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                    <input
                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        type="number"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        placeholder="Enter OTP"
                                        onChange={handleOtpChange}
                                        required
                                    />
                                </label>
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        className="px-4 py-2 font-bold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        onClick={handleResetRequest}
                                    >
                                        Conform
                                    </button>
                                </div>
                            </> : <></>}
                        </div>

                        <div>
                            <div className="text-center">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-red-700 hover:text-red-800"
                                >
                                    Sign up
                                </Link>
                            </div>

                            <div className="text-center">
                                Ready to Login?{" "}
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-red-700 hover:text-red-800"
                                >
                                    Log In
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
