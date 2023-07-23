import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setKeywords } from "../../Redux/store";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SimpleSlider from "../../components/Carousel";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const hasDialogShownBefore = localStorage.getItem("dialogShown");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log("isOpen",isOpen);
    console.log("handleClose", handleClose);
  }, [])

  setTimeout(() => {
    setIsOpen(true);
  }, 50000);

  const handleOpen = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleSearch = () => {
    const keywordsArray = searchKeywords
      .split(" ")
      .map((keyword) => keyword.trim());
    dispatch(setKeywords(keywordsArray));
    // Clear the search input
    setSearchKeywords("");
    navigate("/advance-search");
  };

  const handleClose = (e) => {
    // if (!e.target.closest(".dialog") ) {
    setIsOpen(false);
    // }
  };
  ``;

  const navigationButtons = [
    { name: "Career & ManPower", link: "/careerandmanpower" },
    { name: "Registration /Certification", link: "/regandcert" },
    { name: "License", link: "/contact" },
    { name: "Auction Material", link: "/auctionmaterial" },
    { name: "Joint Venture", link: "/jointventure" },
    { name: "Tender Filing", link: "/tenderfilling" },
    { name: "Gem Registration", link: "/gemregistration" },
  ];

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth > 480); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    checkScreenSize(); // Call the function to set the initial screen size

    window.addEventListener("resize", checkScreenSize); // Add event listener

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Clean up the event listener
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI(selectedService);
    setName("");
    setCompany("");
    setMobile("");
    setEmail("");
    setSelectedService("");
    setIsOpen(false);
  };

  const sendDataToAPI = (selectedService) => {
    const formData = {
      name,
      company,
      mobile,
      email,
      selectedService,
    };
    const token = localStorage.getItem("token");
    axios
      .post(`${BASE_URL}/post-contactform`, formData, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        alert("We will contact you soon!!!");
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        alert("Oops something went wrong!!!");
      });
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedServiceFromNavbar = queryParams.get("service");

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  return (
    <>
      <div className="relative px-3 md:p-4">
        <div className="flex flex-col justify-center max-w-[78rem] mx-auto md:flex-row ">
          {isSmallScreen ? (
            <div className="w-full mt-2 md:w-1/4 sm:grid">
              <ul className="">
                <h1 className="text-2xl font-bold text-gray-700 ">
                  Our Services
                </h1>
                <div className="col-span-4 px-2 mt-6 mb-6">
                  {navigationButtons.map((button) => (
                    <NavLink to={button.link}>
                      <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold  border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">
                        {button.name}
                      </div>
                    </NavLink>
                  ))}
                </div>
              </ul>
            </div>
          ) : null}
          <div className="w-full px-4 md:w-3/4">
            <div className="py-3 md:py-12 sm:px-6 lg:px-8 ">
              <h1 className="text-2xl font-extrabold md:text-4xl md:leading-normal">
                <span className="border-b-4 border-red-700">Best eTender</span>{" "}
                Procurement Portal for RFP, Bids and etendering Opps
              </h1>
              <h1 className="mt-2">
                Tenders Search Engine for e Tender Procurement Notices
              </h1>
              <div className="flex flex-col items-center justify-center md:flex-row ">
                <div className="flex items-center w-full py-4 bg-white rounded-lg max-w-ls ">
                  <input
                    type="text"
                    placeholder="Enter your keywords separated by commas"
                    value={searchKeywords}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                    className="w-full px-4 py-2 text-gray-800 placeholder-gray-400 bg-transparent border-2 border-red-700 rounded-l md:w-2/3 lg:w-full focus:outline-none focus:border-red-700"
                  />
                  <button
                    className="ml-0 md:mt-0 bg-red-700 hover:text-black text-white py-2 md:py-[8px] px-2 md:px-[50px] shadow-lg transition-colors border-[2px] border-red-700"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <NavLink to="/advance-search">
                  <button className="mb-2 ml-0 mr-3  md:ml-2 md:mt-0 text-red-700  hover:text-red-700 py-2 px-2 rounded-lg shadow-lg transition-colors border-[2px]">
                    Advance search
                  </button>
                </NavLink>
              </div>
              <div className="flex flex-wrap justify-center ">
                <div className="w-1/2 px-2 py-1 md:p-3 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <div className="bg-white rounded-lg py-1 md:py-4 border-[2px] px-4 text-center shadow-lg">
                    <p className="text-xl font-bold md:text-4xl">45,000+</p>
                    <p className="text-gray-700">New Tenders Per Day</p>
                  </div>
                </div>
                <div className="w-1/2 px-2 py-1 md:p-3 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <div className="bg-white rounded-lg py-1 md:py-4 border-[2px] px-4 text-center shadow-lg">
                    <p className="text-xl font-bold md:text-4xl">25+</p>
                    <p className="text-gray-700">Years Of Experience</p>
                  </div>
                </div>

                <div className="w-1/2 px-2 py-1 md:p-3 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <div className="bg-white rounded-lg py-4 md:py-4 border-[2px] px-4 text-center shadow-lg">
                    <p className="text-xl font-bold md:text-4xl">240</p>
                    <p className="text-gray-700">Countries</p>
                  </div>
                </div>
                <div className="w-1/2 px-2 py-1 md:p-3 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <div className="bg-white rounded-lg py-1 md:py-4 border-[2px] px-4 text-center shadow-lg">
                    <p className="text-xl font-bold md:text-4xl">10,000+</p>
                    <p className="text-gray-700">Registered Clients</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-5 md:mt-8">
                <Link to="/gemregistration">
                  <button className="px-8 py-3 text-white transition-colors bg-red-700 rounded-lg shadow-lg">
                    Gem Registration
                  </button>
                </Link>
                <Link to="/tenders">
                  <button className="px-8 py-3 ml-4 text-white transition-colors bg-red-700 rounded-lg shadow-lg">
                    Tenders Database
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="grid md:grid-cols-2 p-8 bg-white rounded gap-x-8">
            {isSmallScreen ? (
            <div class="md:col-span-1 invisible md:visible">
            <ul class="">
              <h1 class="mb-5 text-3xl font-bold text-black">
                Our Services
              </h1>
                <div className="col-span-4 px-2 mt-6 mb-6">
                  {navigationButtons.map((button) => (
                    <NavLink to={button.link}>
                      <div class="md:w-full lg:px-8 py-3 mb-4 text-18 md:text-center text-white font-bold border-black border-1px bg-red-700 focus:none hover:text-white linear duration-300 shadow-md rounded cursor-pointer">
                        {button.name}
                      </div>
                    </NavLink>
                  ))}
                </div>
              </ul>
            </div>
          ) : null}

              <div className="md:w-full">
                <div className="mb-5 text-3xl text-center font-bold text-black">
                  Enter Details
                </div>

                <form onSubmit={handleFormSubmit} className="w-full">
                  {/* Rest of the form elements */}
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">
                      Name
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter Name"
                      />
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">
                      Email
                      <input
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">
                      Company
                      <input
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        type="text"
                        id="company"
                        name="company"
                        value={company}
                        placeholder="Enter Company Name"
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">
                      Contact Number
                      <input
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        type="number"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        placeholder="Enter Number"
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">
                      Select Services
                    </label>
                    <select
                      required
                      id="services"
                      className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      value={selectedService || selectedServiceFromNavbar}
                      onChange={handleServiceChange}
                    >
                      <option value="">Select Service</option>
                      <option value="Career&ManPower">
                        Career & Man Power
                      </option>
                      <option value="Registration/Certificate">
                        Registration /Certificate
                      </option>
                      <option value="Joint Venture">License</option>
                      <option value="Auction Material">Auction Material</option>
                      <option value="Joint Venture">Joint Venture</option>
                      <option value="Tender Result">Online Bidding</option>
                      <option value="Tender Result">Tender Result</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="w-full px-4 py-3 font-bold text-white bg-red-700 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                      type="submit"
                    >
                      Get In Touch
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>

      
      <SimpleSlider/>
      <Home2 />
      <Home3 />
      <Home4 />
    </>
  );
};

export default HomePage;
