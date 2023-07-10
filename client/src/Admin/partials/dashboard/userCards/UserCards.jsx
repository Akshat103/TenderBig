import { useState } from "react";
import { Link } from "react-router-dom";
import demoImg from "./assets/docIcon.png";

const UserCards = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className="max-w-xs w-full lg:max-w-xs lg:flex border border-gray-400 bg-white rounded">
                <div className="h-32 lg:h-auto lg:w-24 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <img src={demoImg} className="ml-6 mt-11 w-16" alt="Document Icon" />
                </div>
                <div className="p-4 flex flex-col justify-between leading-normal ml-3">
                    <div className="mb-2">
                        <p className="text-xs text-gray-600 flex items-center">
                            <svg
                                className="fill-current text-gray-500 w-2 h-2 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            {props.title}
                        </p>
                        <div className="text-gray-900 font-bold text-sm">
                            {/* { props.updates } */}
                            Lorem ipsum dolor sit amet
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="bg-red-700 px-2 py-1 text-sm font-medium transition-colors duration-300 rounded-md text-white"
                            >
                                options
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`ml-1 h-3 w-3 inline-block transform ${dropdownOpen ? "rotate-180" : ""}`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <input type="date" className="mt-2" />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <Link
                                        to="#"
                                        className="block px-2 py-1 text-sm font-medium transition-colors duration-300 hover:bg-red-700 hover:text-white"
                                    >
                                        Auto
                                    </Link>
                                    <Link
                                        to="#"
                                        className="block px-2 py-1 text-sm font-medium transition-colors duration-300 hover:bg-red-700 hover:text-white"
                                    >
                                        New
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCards;
