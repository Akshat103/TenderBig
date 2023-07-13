import { useState } from "react";
import { useDispatch } from "react-redux";
import { setKeywords } from "../Redux/store";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState("");

  const handleSearch = () => {
    const keywordsArray = searchKeywords.split(" ").map((keyword) => keyword.trim());
    dispatch(setKeywords(keywordsArray));
    // Clear the search input
    setSearchKeywords("");
    navigate("/advance-search")
  };

  const navigationButtons = [
    {name: 'Career & ManPower', link: '/careerandmanpower'},
    {name: 'Registration/Certification', link: '/regandcert'},
    {name: 'License', link: '/contact'},
    {name: 'Auction Material', link: '/auctionmaterial'},
    {name: 'Joint Venture', link: '/jointventure'},
    {name: 'Tender Filing', link: '/tenderfilling'},
    {name: 'Gem Registration', link: '/gemregistration'}
  ]
  
  return (
    <>
      <div className="px-3 md:p-4 ">
        <div className="flex flex-col justify-center max-w-[78rem] mx-auto md:flex-row ">
          <div className="hidden w-full mt-2 md:w-1/4 sm:grid ">
            <ul className="">
              <h1 className="text-2xl font-bold text-gray-700 ">
                Our Services
              </h1>
              
              <div className="col-span-4 px-2 mt-6 mb-6">
                {navigationButtons.map(button => (
                  <NavLink to={button.link} >
                <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold  border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">{button.name}</div>
                  </NavLink>
                ))}
              </div>
              

              {/* <li className="pb-2 mt-6 border-2 border-white hover:border-red-700">
                <hr className="pb-3 border-gray-400 " />
                <NavLink
                  to="/careerandmanpower"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span className="px-1">Career & ManPower</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 hover:bg-blu">
                <NavLink
                  to="/regandcert"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>Registration/Certification</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 ">
                <NavLink
                  to="/contact"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>License</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 ">
                <NavLink
                  to="/auctionmaterial"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>Auction Material</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 ">
                <NavLink
                  to="/jointventure"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>Joint Venture</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 ">
                <NavLink
                  to="/tenderfilling"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>Tender Filling</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <li className="p-1 py-2 border-2 border-white hover:border-red-700 ">
                <NavLink
                  to="/gemregistration"
                  className="flex items-center justify-between text-gray-600"
                >
                  <span>Gem Registration</span>
                  <img
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg"
                    className="w-5 h-5"
                    alt="Right Arrow"
                  />
                </NavLink>
              </li>
              <hr className="border-gray-400" />
              <hr className="border-gray-100" /> */}
            </ul>
          </div>
          <div className="w-full px-4 md:w-3/4">
            <div className="py-3 md:py-12 sm:px-6 lg:px-8 ">
              <h1 className="text-2xl font-extrabold md:text-4xl md:leading-normal">
                {" "}
                <span className="border-b-4 border-red-700">
                  Best eTender
                </span>{" "}
                Procurement Portal for RFP, Bids and etendering Opps{" "}
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
      </div>
      <Home2 />
      <Home3 />
      <Home4 />
    </>
  );
};

export default HomePage;
