import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import uploadFileToS3 from "../file-uploading/FileUpload";
import { ProgressBar, Step } from "react-step-progress-bar";
import { getCountries, getStatesByCountry, getCitiesByCountryAndState } from '../../utils/CountryData';
import payment from "../../components/payment";
import axios from "axios";
import { sideNavigationButtons } from "../../components/Forms";
import { NavLink } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Secondpage = ({ formData, handleChange, previousPage }) => {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-center">Seeker Space</h2>
      <p className="font-serif text-sm font-thin text-red-700">
        Fields marked with an asterisk (*) are mandatory.
      </p>
      <div className="grid grid-cols-2 gap-4 ">
        <label className="block mb-2 font-semibold">
          Email
          <span className="relative top-0 right-0 text-red-700">*</span>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            placeholder="Enter Email"
          />
        </label>
        <label className="block mb-2 font-semibold">
          ZIP Code
          <span className="relative top-0 right-0 text-red-700">*</span>
          <input
            required
            type="number"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter ZIP Code"
          />
        </label>
        <label className="block mb-2 font-semibold">
          Past Salary
          <span className="relative top-0 right-0 text-red-700">*</span>
          <input
            required
            type="number"
            name="pastSalary"
            value={formData.pastSalary}
            onChange={handleChange}
            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter Salary"
          />
        </label>
        <label className="block mb-2 font-semibold">
          Expected Salary
          <span className="relative top-0 right-0 text-red-700">*</span>
          <input
            required
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter Salary"
          />
        </label>
        <label className="block mb-2 font-semibold">
          Hobbies
          <input
            required
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            placeholder="Enter Hobbies"
          />
        </label>
        <label className="block mb-2 font-semibold">
          PAN Number
          <span className="relative top-0 right-0 text-red-700">*</span>
          <input
            required
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            placeholder="Enter PAN"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="file-input" className="block mb-2 font-semibold">
            Upload Resume
            <span className="relative top-0 right-0 text-red-700">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            required
            id="resume"
            className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
          />
        </div>

        <div>
          <label htmlFor="file-input" className="block mb-2 font-semibold">
            Upload Profile Photo
            <span className="relative top-0 right-0 text-red-700">*</span>
          </label>
          <input
            type="file"
            name="profilePhoto"
            accept=".jpg,.jpeg,.png"
            required
            id="profilePhoto"
            className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
          />
        </div>

        <div>
          <label htmlFor="file-input" className="block mb-2 font-semibold">
            Upload Aadhar
            <span className="relative top-0 right-0 text-red-700">*</span>
          </label>
          <input
            type="file"
            name="aadhar"
            required
            accept=".pdf"
            title="Aadhar number must be 16 digits"
            id="aadhar"
            className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
          />
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

const Seeker = () => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fathername: "",
    aadhar: "",
    tenMarkType: "",
    tenMark: "",
    twelveMarkType: "",
    twelveMark: "",
    jobpost: "",
    jobexp: "",
    address: "",
    company: "",
    city: "",
    state: "",
    country: "",
    mobile: "",
    email: "",
    zip: "",
    pastSalary: "",
    expectedSalary: "",
    hobbies: "",
    pan: "",
    resumeUrl: "",
    photoUrl: "",
    aadharUrl: "",
  });

  const countryNames = getCountries();

  let stateNames = [];
  if (formData.country) {
    stateNames = getStatesByCountry(formData.country);
  }

  let cityNames = [];
  if (formData.country && formData.state) {
    cityNames = getCitiesByCountryAndState(formData.country, formData.state);
  }

  const clearInputs = () => {
    setFormData({
      name: "",
      fathername: "",
      aadhar: "",
      tenMark: "",
      twelveMark: "",
      jobpost: "",
      jobexp: "",
      address: "",
      company: "",
      city: "",
      state: "",
      country: "",
      mobile: "",
      email: "",
      zip: "",
      pastSalary: "",
      expectedSalary: "",
      hobbies: "",
      pan: "",
      resumeUrl: "",
      photoUrl: "",
      aadharUrl: "",
    });
    setCurrentPage(0);
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "fathername",
      "aadhar",
      "tenMark",
      "twelveMark",
      "jobpost",
      "jobexp",
      "address",
      "company",
      "city",
      "state",
      "country",
      "mobile",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsFormValid(validateForm());
  };

  const token = localStorage.getItem('token');

  const headers = {
    'auth': token
  };

  const getAmount = async () => {
    const {
      data: { price },
    } = await axios.get(
      `${BASE_URL}/formprice/Seeker/price`, { headers }
    );
    return price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = await getAmount();
    const receipt = "Seeker Form";
    payment(price, receipt)
      .then(async (success) => {
        console.log("Payment success:", success);
        const resume = e.target.resume.files[0];
        const profilePhoto = e.target.profilePhoto.files[0];
        const aadhar = e.target.aadhar.files[0];

        const resumeUrl = await uploadFileToS3(resume, "pdf");
        const photoUrl = await uploadFileToS3(profilePhoto, "image");
        const aadharUrl = await uploadFileToS3(aadhar, "pdf");

        const requestBody = formData;
        requestBody.resumeUrl = resumeUrl;
        requestBody.photoUrl = photoUrl;
        requestBody.aadharUrl = aadharUrl;
        StoreAtDB(requestBody);
      })
      .catch((error) => {
        console.error("Payment error:", error);
        // Handle the error if the payment fails
      });
  };

  const StoreAtDB = (requestBody) => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/services/seeker/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert("Submitted");
          clearInputs();
        } else {
          alert("Something went wrong. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops, something went wrong!!!");
      });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => {
    setCurrentPage(1);
  };

  const previousPage = () => {
    setCurrentPage(0);
  };

  const totalSteps = 2;
  const gaps = totalSteps - 1;
  const progress = Math.round((currentPage / gaps) * 100);

  const stepNames = ["0", "1"];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  return (
    <div className="flex items-center justify-center">
      <div className={`max-w-[1244px] ${!isSmallScreen ? "grid grid-cols-12 gap-16": "w-full" } mt-5`}>

        <div className={`col-span-4 px-2 mt-6 mb-6 ${isSmallScreen ? "hidden" : "block"}`}>
          {isSmallScreen ? (
            <div className="w-full mt-2 ">
              <ul className="">
                <h1 className="text-2xl font-bold text-gray-700 ">
                  Our Services
                </h1>
                <div className="col-span-4 px-2 mt-6 mb-6">
                  {sideNavigationButtons.map((button) => (
                    <NavLink to={button.link}>
                      <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">{button.name}</div>
                    </NavLink>
                  ))}
                </div>
              </ul>
            </div>
          ) : null}
        </div>
        <div className={!isSmallScreen ? "w-96 px-8 py-8 mx-auto" : "col-span-8 px-8 py-8 mx-auto"}>

          <ProgressBar
            percent={progress}
            filledBackground="linear-gradient(to right, #E97451, #D22B2B)"
          >
            {stepNames.map((_, index) => (
              <Step key={index}>
                {({ accomplished }) => (
                  <div
                    className={`step ${accomplished ? "completed" : null}`}
                  />
                )}
              </Step>
            ))}
          </ProgressBar>

          {currentPage === 0 && (
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="mt-1"
            >
              {/* Global Section */}
              <h2 className="mb-4 text-2xl font-bold text-center ">
                Seeker Space
              </h2>
              <p className="font-serif text-sm font-thin text-red-700">
                Fields marked with an asterisk (*) are mandatory.
              </p>
              <div className="p-2 rounded-lg">
                <label className="relative block mb-2 font-semibold">
                  Name
                  <span className="relative top-0 right-0 text-red-700">*</span>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Your Name"
                  />
                </label>
                <label className="relative block mb-2 font-semibold">
                  Father Name
                  <span className="relative top-0 right-0 text-red-700">*</span>
                  <input
                    required
                    type="text"
                    name="fathername"
                    value={formData.fathername}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Name"
                  />
                </label>
                <label className="relative block mb-2 font-semibold">
                  Aadhar Number
                  <span className="relative top-0 right-0 text-red-700">*</span>
                  <input
                    required
                    type="number"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter Aadhar Number"
                    maxLength={16}
                    minLength={16}
                  />
                </label>

                <div className="grid grid-cols-2 gap-4 ">
                  <div className="relative">
                    <label className="block mb-2 font-semibold">
                      10th Score
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                    </label>
                    <div className="md:flex">
                      <select
                        required
                        name="tenMarkType"
                        value={formData.tenMarkType}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                      </select>
                      <input
                        required
                        type="number"
                        name="tenMark"
                        value={formData.tenMark}
                        onChange={handleChange}
                        className={`border ${!isSmallScreen ? "w-36" : "flex-grow"} rounded-sm px-3 py-2 mt-1 flex-grow text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        placeholder={
                          formData.tenMarkType === "fixed"
                            ? "Enter Fixed Score"
                            : "Enter Percentage"
                        }
                        maxLength={2}
                        minLength={2}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block mb-2 font-semibold">
                      12th Score
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                    </label>
                    <div className="md:flex">
                      <select
                        required
                        name="twelveMarkType"
                        value={formData.twelveMarkType}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                      </select>
                      <input
                        required
                        type="number"
                        name="twelveMark"
                        value={formData.twelveMark}
                        onChange={handleChange}
                        className={`border ${!isSmallScreen ? "w-36" : "flex-grow"} rounded-sm px-3 py-2 mt-1 flex-grow text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        placeholder={
                          formData.tenMarkType === "fixed"
                            ? "Enter Fixed Score"
                            : "Enter Percentage"
                        }
                        maxLength={2}
                        minLength={2}
                      />
                    </div>
                  </div>

                  <label className="block mb-2 font-semibold">
                    Jop Post
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="jobpost"
                      value={formData.jobpost}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Post"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
                    Jop Experience
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="number"
                      name="jobexp"
                      value={formData.jobexp}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Experience"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
                    Company
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Company"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
                    Address
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Address"
                    />
                  </label>
                  <label className="block mb-2 font-semibold">
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
                      <option value="">Select a country</option>
                      {countryNames.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block mb-2 font-semibold">
                    State
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <select
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                      <option value="">Select a state</option>
                      {stateNames.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block mb-2 font-semibold">
                    City
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter a city"
                      autoComplete="off"
                      list="cityNamesList"
                    />
                    <datalist id="cityNamesList">
                      {cityNames.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </label>
                  <label className="block mb-2 font-semibold">
                    Mobile Number
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                    <input
                      required
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter Mobile Number"
                    />
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={nextPage}
                className="px-4 py-2 mt-8 text-white bg-black rounded hover:bg-red-800"
                disabled={!isFormValid} // Disable the button if the form is not valid
              >
                Next
              </button>
            </form>
          )}

          {currentPage === 1 && (
            <form onSubmit={handleSubmit}>
              <Secondpage
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

export default Seeker;
