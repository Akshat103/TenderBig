import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { locations } from "../constants/countriesData";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";

const OtherInformationAndPurchaserDetail = ({
  formData,
  handleChange,
  previousPage,
}) => {
  OtherInformationAndPurchaserDetail.propTypes = {
    formData: PropTypes.shape({
      // Include all the properties from the formData object
      noticeType: PropTypes.string.isRequired,
      totNo: PropTypes.string.isRequired,
      documentNo: PropTypes.string.isRequired,
      competition: PropTypes.string.isRequired,
      financier: PropTypes.string.isRequired,
      ownership: PropTypes.string.isRequired,
      tenderValue: PropTypes.string.isRequired,
      purchaser: PropTypes.string.isRequired,
      paddress: PropTypes.string.isRequired,
      pcity: PropTypes.string.isRequired,
      pdistrict: PropTypes.string.isRequired,
      pstate: PropTypes.string.isRequired,
      ppin: PropTypes.string.isRequired,
      ptelfax: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-center">
        Submit Tender Request
      </h2>
      <p className="font-serif text-sm font-thin text-red-700">
        Fields marked with an asterisk (*) are mandatory.
      </p>
      {/* otherInformation and purchaserDetail Sections */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* otherInformation Section */}
        <div className="p-2 mt-2 rounded-lg">
          <h2 className="mb-4 text-2xl font-bold ">Other Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="relative block mb-2 font-semibold">
              Notice Type
              <input
                type="text"
                name="noticeType"
                value={formData.noticeType}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Notice Type"
              />
            </label>

            <label className="block mb-2 font-semibold">
              TOT No
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="totNo"
                value={formData.totNo}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter TOT No"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Document No
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="documentNo"
                value={formData.documentNo}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Document No"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Competition
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Competition"
              />
            </label>
          </div>
          <label className="block mb-4 font-semibold">
            Financier
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="financier"
              value={formData.financier}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Financier"
            />
          </label>
          <label className="block mb-4 font-semibold">
            Ownership
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Ownership"
            />
          </label>
          <label className="block mb-2 font-semibold">
            Tender Value
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="number"
              name="tenderValue"
              value={formData.tenderValue}
              onChange={handleChange}
              className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter Tender Value"
            />
          </label>
        </div>

        {/* purchaserDetail Section */}
        <div className="p-2 mt-2 rounded-lg">
          <h2 className="mb-4 text-2xl font-bold">Purchaser Detail</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="block mb-2 font-semibold">
              Purchaser
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="purchaser"
                value={formData.purchaser}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Purchaser"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Address
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="paddress"
                value={formData.paddress}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Address"
              />
            </label>
            <label className="block mb-2 font-semibold">
              City
              <input
                type="text"
                name="pcity"
                value={formData.pcity}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter City"
              />
            </label>
            <label className="block mb-2 font-semibold">
              District
              <input
                type="text"
                name="pdistrict"
                value={formData.pdistrict}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter District"
              />
            </label>
            <label className="block mb-2 font-semibold">
              State
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="pstate"
                value={formData.pstate}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter State"
              />
            </label>
            <label className="block mb-2 font-semibold">
              PIN
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="ppin"
                value={formData.ppin}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter PIN"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Phone/Fax
              <input
                type="text"
                name="ptelfax"
                value={formData.ptelfax}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Phone/Fax"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Email
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Email"
              />
            </label>
          </div>
          <label className="block mb-2 font-semibold">
            URL
            <span className="relative top-0 right-0 text-red-700">*</span>
            <input
              required
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter URL"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center center">
        <div className="flex justify-between w-full">
          <div className="w-1/4">
            <button
              type="button"
              onClick={previousPage}
              className="px-4 py-2 mt-8 text-white bg-red-700 rounded hover:bg-red-800 align-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>

          <div className="w-3/4">
            <button
              type="submit"
              className="w-2/4 px-4 py-2 mx-6 mt-8 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const sideNavigationButtons = [
  { name: "Seeker Form", link: "/seeker" },
  { name: "Employer Form", link: "/employer" },
  { name: "Registration", link: "/registration" },
  { name: "Certification", link: "/certification" },
  { name: "License Form", link: "/contact" },
  { name: "Auction Material", link: "/auctionmaterial" },
  { name: "Joint Venture", link: "/jointventure" },
  { name: "Online Tender", link: "/tenderfillingonline" },
  { name: "Offline Tender", link: "/tenderfillingoffline" },
  { name: "Gem Registration", link: "/gemregistration" },
];

const TenderForm = () => {
  const [formData, setFormData] = useState({
    summary: "",
    sector: "",
    cpvNo: "",
    userCategory: "",
    product: "",
    country: "",
    state: "",
    city: "",
    procurementSummarySummary: "",
    procurementSummaryDeadline: "",
    noticeType: "",
    totNo: "",
    documentNo: "",
    competition: "",
    financier: "",
    ownership: "",
    tenderValue: "",
    purchaser: "",
    paddress: "",
    pcity: "",
    pdistrict: "",
    pstate: "",
    ppin: "",
    ptelfax: "",
    email: "",
    url: "",
    description: "",
    organization: "",
    tenderDetailNoticeType: "",
  });

  const clearInputs = () => {
    setFormData({
      summary: "",
      sector: "",
      cpvNo: "",
      userCategory: "",
      product: "",
      country: "",
      state: "",
      city: "",
      procurementSummarySummary: "",
      procurementSummaryDeadline: "",
      noticeType: "",
      totNo: "",
      documentNo: "",
      competition: "",
      financier: "",
      ownership: "",
      tenderValue: "",
      purchaser: "",
      paddress: "",
      pcity: "",
      pdistrict: "",
      pstate: "",
      ppin: "",
      ptelfax: "",
      email: "",
      url: "",
      description: "",
      organization: "",
      tenderDetailNoticeType: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch all sectors
    fetchSectors();
    fetchProducts();
  }, []);

  const [sectors, setSectors] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSectors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/apiTender/options/alloptions?array=sectors"
      );
      console.log(response.data[0].sectors);
      setSectors(response.data[0].sectors);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/apiTender/options/alloptions?array=products"
      );
      console.log(response.data[0].products);
      setProducts(response.data[0].products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const token = localStorage.getItem("token");

    const requestBody = JSON.stringify(formData);

    fetch("http://localhost:5000/apiTender/tenderdetails/add-tender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Submitted");
        clearInputs();
        window.location.href = "/forms";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
        clearInputs();
        window.location.href = "/forms";
      });
  };

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

  const [isSmallScreen, setIsSmallScreen] = useState(true);

  const isMobile = window.innerWidth <= 768;

  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => {
    setCurrentPage(2);
  };

  const previousPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid max-w-[1244px] grid-cols-12 gap-16 mt-5">
        <div className="col-span-4 px-2 mt-6 mb-6">
        <div
            className={isMobile ? "hidden" : "block"}
          >
            {sideNavigationButtons.map((button) => (
              <NavLink to={button.link} key={button.name}>
                <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">
                  {button.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="col-span-8 px-8 py-8 mx-auto mt-6 mb-6 rounded-lg shadow-lg border-[2px] border-black/20">
          {currentPage === 1 && (
            <form onSubmit={handleSubmit}>
              {/* Global Section */}
              <h2 className="mb-4 text-2xl font-bold text-center ">
                Submit Tender Request
              </h2>
              <p className="font-serif text-sm font-thin text-red-700">
                Fields marked with an asterisk (*) are mandatory.
              </p>
              <div className="rounded-lg">
                <label className="relative block mb-2 font-semibold">
                  Summary
                  <span className="relative top-0 right-0 text-red-700">*</span>
                  <input
                    required
                    type="text"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Summary"
                  />
                </label>
                <div className="grid grid-cols-2 gap-8 ">
                  <div className="relative">
                    <label className="block font-semibold">
                      Sector
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                    </label>
                    <select
                      required
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                      <option value="">Select Sector</option>
                      {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="block font-semibold">
                    CPV No
                    <input
                      type="text"
                      name="cpvNo"
                      value={formData.cpvNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter CPV No"
                    />
                  </label>

                  <label className="block mb-2 font-semibold">
                    User Category
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <select
                      required
                      name="userCategory"
                      value={formData.userCategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                      <option value="">Select User Category</option>
                      <option value="contractor">Contractor</option>
                      <option value="subcontractor">Sub Contractor</option>
                    </select>
                  </label>
                  <label className="block mb-2 font-semibold">
                    Product
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <select
                      required
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {/* procurementSummary and tenderDetail Sections */}
              <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2">
                {/* Procurement Summary Section */}
                <div className="mt-2 rounded-lg ">
                  <h2 className="mb-4 text-2xl font-bold ">
                    Procurement Summary
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block font-semibold">
                      Country
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                      <select
                        required
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      >
                        {locations.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block font-semibold">
                      State
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                      <input
                        required
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter State"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-1.5 mb-1.5">
                    <label className="block font-semibold">
                      City
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter City"
                      />
                    </label>
                    <label className="block font-semibold">
                      Deadline
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                      <input
                        required
                        type="date"
                        name="procurementSummaryDeadline"
                        value={formData.procurementSummaryDeadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter Deadline"
                      />
                    </label>
                  </div>
                  <label className="block mb-2 font-semibold">
                    Summary
                    <input
                      type="text"
                      name="procurementSummarySummary"
                      value={formData.procurementSummarySummary}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Summary"
                    />
                  </label>
                </div>

                {/* tenderDetail Section */}
                <div className="mt-2 rounded-lg">
                  <h2 className="mb-4 text-2xl font-bold ">Tender Detail</h2>
                  <label className="block mb-2 font-semibold">
                    Description
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Description"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
                    Organization
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Organization"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
                    Notice Type
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="tenderDetailNoticeType"
                      value={formData.tenderDetailNoticeType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Notice Type"
                    />
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={nextPage}
                className="px-4 py-2 mt-8 text-white duration-300 bg-black rounded cursor-pointer hover:bg-white hover:border hover:border-black linear hover:text-white "
              >
                Next
              </button>
            </form>
          )}

          {currentPage === 2 && (
            <form onSubmit={handleSubmit}>
              <OtherInformationAndPurchaserDetail
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                previousPage={previousPage}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderForm;
