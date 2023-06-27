import { useState } from "react";
import Navbar from "./Navbar";
import { locations } from "../constants/countriesData"
import Footer from "./Footer";
import { GrFormPrevious } from 'react-icons/gr';

const OtherInformationAndPurchaserDetail = ({ formData, handleChange, handleSubmit, previousPage }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Tender Request</h2>
      <p className="text-red-700 font-thin font-serif text-sm">
        Fields marked with an asterisk (*) are mandatory.
      </p>
      {/* otherInformation and purchaserDetail Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* otherInformation Section */}
        <div className="p-2 rounded-lg mt-2">
          <h2 className="text-2xl font-bold mb-4 ">Other Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block mb-2 font-semibold relative">
              Notice Type
              <input
                type="text"
                name="noticeType"
                value={formData.noticeType}
                onChange={handleChange}
                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Notice Type"
              />
            </label>

            <label className="block mb-2 font-semibold">
              TOT No
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="totNo"
                value={formData.totNo}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter TOT No" />
            </label>
            <label className="block mb-2 font-semibold">
              Document No
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="documentNo"
                value={formData.documentNo}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Document No" />
            </label>
            <label className="block mb-2 font-semibold">
              Competition
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Competition" />
            </label>
          </div>
          <label className="block mb-4 font-semibold">
            Financier
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input required
              type="text"
              name="financier"
              value={formData.financier}
              onChange={handleChange}
              className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Financier" />
          </label>
          <label className="block mb-4 font-semibold">
            Ownership
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input required
              type="text"
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter Ownership" />
          </label>
          <label className="block mb-2 font-semibold">
            Tender Value
            <span className="text-red-700 relative top-0 right-0">*</span>
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
        <div className="p-2 rounded-lg mt-2">
          <h2 className="text-2xl font-bold mb-4">Purchaser Detail</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="block mb-2 font-semibold">
              Purchaser
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="purchaser"
                value={formData.purchaser}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Purchaser" />
            </label>
            <label className="block mb-2 font-semibold">
              Address
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="paddress"
                value={formData.paddress}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Address" />
            </label>
            <label className="block mb-2 font-semibold">
              City
              <input
                type="text"
                name="pcity"
                value={formData.pcity}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter City" />
            </label>
            <label className="block mb-2 font-semibold">
              District
              <input
                type="text"
                name="pdistrict"
                value={formData.pdistrict}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter District" />
            </label>
            <label className="block mb-2 font-semibold">
              State
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="pstate"
                value={formData.pstate}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter State" />
            </label>
            <label className="block mb-2 font-semibold">
              PIN
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="ppin"
                value={formData.ppin}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter PIN" />
            </label>
            <label className="block mb-2 font-semibold">
              Phone/Fax
              <input
                type="text"
                name="ptelfax"
                value={formData.ptelfax}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Phone/Fax" />
            </label>
            <label className="block mb-2 font-semibold">
              Email
              <span className="text-red-700 relative top-0 right-0">*</span>
              <input required
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Enter Email" />
            </label>
          </div>
          <label className="block mb-2 font-semibold">
            URL
            <span className="text-red-700 relative top-0 right-0">*</span>
            <input required
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              placeholder="Enter URL" />
          </label>
        </div>
      </div>

      <div className="center flex flex-col items-center">

        <div className="flex justify-between w-full">

          <div className="w-1/4">
            <button
              type="button"
              onClick={previousPage}
              className="bg-red-700 text-white px-4 py-2 mt-8 rounded hover:bg-red-800 align-center"
            >
              <span style={{ color: 'white' }}>
                <GrFormPrevious />
              </span>
            </button>

          </div>

          <div className="w-3/4">

            <button
              type="submit"
              className="bg-red-700 mx-6 text-white px-4 py-2 mt-8 rounded-lg font-semibold hover:bg-red-800 w-2/4"
            >
              Submit
            </button>

          </div>
        </div>


      </div>



    </>
  );
};

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
  }

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        alert("Submitted")
        clearInputs();
        window.location.href = '/forms';
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
        clearInputs();
        window.location.href = '/forms';
      });
  };


  const nextPage = () => {
    setCurrentPage(2);
  };

  const previousPage = () => {
    setCurrentPage(1);
  };


  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-6 px-4 py-8 mb-6 shadow-2xl rounded-lg">
        {currentPage === 1 && (
          <form onSubmit={handleSubmit}>
            {/* Global Section */}
            <h2 className="text-2xl font-bold mb-4 text-center ">Submit Tender Request</h2>
            <p className="text-red-700 font-thin font-serif text-sm">
              Fields marked with an asterisk (*) are mandatory.
            </p>
            <div className="p-2 rounded-lg">
              <label className="block mb-2 font-semibold relative">
                Summary
                <span className="text-red-700 relative top-0 right-0">*</span>
                <input
                  required
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  placeholder="Enter Summary"
                />
              </label>
              <div className=" grid grid-cols-2 gap-4 ">
                <div className="relative">
                  <label className="block mb-2 font-semibold">
                    Sector
                    <span className="text-red-700 relative top-0 right-0">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Sector"
                  />
                </div>

                <label className="block mb-2 font-semibold">
                  CPV No
                  <input
                    type="text"
                    name="cpvNo"
                    value={formData.cpvNo}
                    onChange={handleChange}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter CPV No"
                  />
                </label>
                <label className="block mb-2 font-semibold">
                  User Category
                  <span className="text-red-700 relative top-0 right-0">*</span>
                  <select required
                    name="userCategory"
                    value={formData.userCategory}
                    onChange={handleChange}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  >
                    <option value="">Select User Category</option>
                    <option value="contractor">Contractor</option>
                    <option value="subcontractor">Sub Contractor</option>
                  </select>
                </label>
                <label className="block mb-2 font-semibold">
                  Product
                  <span className="text-red-700 relative top-0 right-0">*</span>
                  <input required
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Product"
                  />
                </label>
              </div>
            </div>

            {/* procurementSummary and tenderDetail Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Procurement Summary Section */}
              <div className=" p-2 rounded-lg mt-2">
                <h2 className="text-2xl font-bold mb-4 ">Procurement Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block font-semibold">
                    Country
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <select required
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                      className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter City"
                    />
                  </label>
                  <label className="block font-semibold">
                    Deadline
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input required
                      type="date"
                      name="procurementSummaryDeadline"
                      value={formData.procurementSummaryDeadline}
                      onChange={handleChange}
                      className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Summary"
                  />
                </label>
              </div>

              {/* tenderDetail Section */}
              <div className="p-2 rounded-lg mt-2">
                <h2 className="text-2xl font-bold mb-4 ">Tender Detail</h2>
                <label className="block mb-2 font-semibold">
                  Description
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Description"
                  />
                </label>
                <label className="block mb-2 font-semibold">
                  Organization
                  <span className="text-red-700 relative top-0 right-0">*</span>
                  <input required
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Organization"
                  />
                </label>
                <label className="block mb-2 font-semibold">
                  Notice Type
                  <span className="text-red-700 relative top-0 right-0">*</span>
                  <input required
                    type="text"
                    name="tenderDetailNoticeType"
                    value={formData.tenderDetailNoticeType}
                    onChange={handleChange}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Notice Type"
                  />
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={nextPage}
              className="bg-red-700 text-white px-4 py-2 mt-8 rounded hover:bg-red-800"
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
      <Footer />
    </>
  );
};

export default TenderForm;
