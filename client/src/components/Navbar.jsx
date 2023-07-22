import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import logo from "../Admin/images/tender-logo.png";
import PhoneImg from '../Admin/images/phone.png'
import LandlineImg from '../Admin/images/landline.png'
import WAImg from '../Admin/images/whatsapp.png'


const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const dashboard = () => {
    navigate("/dashboard/users");
  };

  const toggleMobileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* contact bar */}
      <div className="h-[80px] flex items-center justify-between gap-8  text-black xl:px-80 lg:px-20 px-10 font-bold">
        <div className="flex items-center gap-8">
          
          <div className="flex items-center gap-2">
            <img src={PhoneImg} alt="phone_img" className="w-8 h-8" />
            <div className="whitespace-nowrap">+91 1413953880</div>
          </div>
          <div className="flex items-center gap-2">
            <img src={LandlineImg} alt="phone_img" className="w-8 h-8" />
            <div className="whitespace-nowrap">+91 9352810000</div>
          </div>
          <div className="md:flex items-center hidden gap-2">
            <img src={WAImg} alt="phone_img" className="w-8 h-8" />
            <div>8875515555</div>
          </div>
          {/* <div className="px-4 py-2 text-white bg-black rounded">
            Contact
          </div> */}
          
        </div>

      <div>
          {auth ? (
                  <>
                    <div className="md:flex hidden flex-row gap-8">
                      <button
                        onClick={logout}
                        className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                      >
                        Logout
                      </button>

                      {auth.userRole == "admin" ? (
                        <button
                          onClick={dashboard}
                          className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                        >
                          Dashboard
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                    >
                    Login
                  </Link>
                )}
      </div>
          
       {/* <div className="flex items-center gap-8">
        <button
          onClick={logout}
          className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
        >
          Logout
        </button><button
          onClick={logout}
          className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
        >
          Dashboard
        </button>
       </div> */}
      </div>
      <nav className="bg-red-700 shadow ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img className="w-[60px] h-auto " src={logo} alt="logo" />
              </Link>
            </div>
            <div className="flex items-center justify-end flex-1 sm:items-stretch">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Home
                  </Link>

                  <Link
                    to="/tenders"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Tenders
                  </Link>

                  <Link
                    to="/projects"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Projects
                  </Link>

                  <Link
                    to="/gems"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Gems
                  </Link>

                  <Link
                    to="/forms"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Apply for Tenders
                  </Link>

                  <Link
                    to="/contact"
                    className="px-3 py-2 text-lg font-medium text-gray-600 transition-colors duration-300 rounded-md hover:text-red-700"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/tenderResults"
                    className="px-3 py-2 text-lg font-medium text-gray-600 transition-colors duration-300 rounded-md hover:text-red-700"
                  >
                    Tender Results
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(true)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      // onMouseLeave={() => setDropdownOpen(false)}

                      className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                    >
                      Services
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`ml-1 h-4 w-4 inline-block transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-md shadow-lg w-[290px] z-10"
                        // onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <Link
                          to="/careerandmanpower"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Career & Man Power
                        </Link>

                        <Link
                          to="/regandcert"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Registration/Certificate
                        </Link>

                        <Link
                          to="/contact"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />{" "}
                          </svg>
                          License
                        </Link>

                        <Link
                          to="/auctionmaterial"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                          onClick={() => setSelectedService("License")}
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Auction Material
                        </Link>

                        <Link
                          to="/jointventure"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Joint Venture
                        </Link>

                        <Link
                          to="/tenderfilling"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Tender Filling
                        </Link>
                        <Link
                          to="/gemregistration"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Gem Registration
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/contact"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/tenderresults"
                    className="px-3 py-2 text-lg font-bold text-white transition-colors duration-300 rounded-md hover:text-white"
                  >
                    Tender results
                  </Link>

                  {/* {auth ? (
                    <>
                      <button
                        onClick={logout}
                        className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-red-700 rounded-md"
                      >
                        Logout
                      </button>

                      {auth.userRole == "admin" ? (
                        <button
                          onClick={dashboard}
                          className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-red-700 rounded-md"
                        >
                          Dashboard
                        </button>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-red-700 rounded-md"
                    >
                      Login
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-300 rounded-md hover:text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="flex justify-end">
            <div
              className="w-full p-2 bg-red-700 sm:hidden overflow text-gray-50"
              onMouseLeave={toggleMenu}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Home
                </Link>
                <Link
                  to="/tenders"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Tenders
                </Link>
                <Link
                  to="/projects"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Projects
                </Link>
                <Link
                  to="/gems"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Gems
                </Link>
                <Link
                  to="/forms"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Apply for Tenders
                </Link>
                {/* <Link
                  to="/contact"
                  onClick={toggleMenu}
                  className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                >
                  Contact
                </Link> */}
                <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(true)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      // onMouseLeave={() => setDropdownOpen(false)}

                      className="block px-3 py-1 text-lg font-medium text-white transition-colors duration-300 rounded-md hover:text-red-100"
                      >
                      Services
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`ml-1 h-4 w-4 inline-block transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute right-0 mt-2  bg-gray-50 border border-gray-200 rounded-md shadow-lg w-[290px] z-10"
                        // onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <Link
                          to="/careerandmanpower"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Career & Man Power
                        </Link>

                        <Link
                          to="/regandcert"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Registration/Certificate
                        </Link>

                        <Link
                          to="/contact"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />{" "}
                          </svg>
                          License
                        </Link>

                        <Link
                          to="/auctionmaterial"
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                          onClick={toggleMenu}                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Auction Material
                        </Link>

                        <Link
                          to="/jointventure"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Joint Venture
                        </Link>

                        <Link
                          to="/tenderfilling"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Tender Filling
                        </Link>
                        <Link
                          to="/gemregistration"
                          onClick={toggleMenu}
                          className="block px-4 py-2 text-lg text-gray-800 hover:text-white hover:bg-red-700"
                        >
                          <svg
                            xmlns="https://www.svgrepo.com/show/498932/settings.svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`ml-1 h-4 w-4 inline-block transform -rotate-90`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Gem Registration
                        </Link>
                      </div>
                    )}
                    
                  </div>
              </div>
              <div>
                {auth ? (
                  <>
                    <div className="flex flex-col">
                      <button
                        onClick={logout}
                        className="px-3 py-2 mb-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                      >
                        Logout
                      </button>

                      {auth.userRole == "admin" ? (
                        <button
                          onClick={dashboard}
                          className="px-3 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                        >
                          Dashboard
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-2 mx-4 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-md"
                    >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
