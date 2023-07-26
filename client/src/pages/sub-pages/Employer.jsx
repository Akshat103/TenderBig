import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiBuilding2Line, RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { locations } from "../../constants/countriesData";
import axios from "axios";
import payment from "../../components/payment";
import uploadFileToS3 from "../file-uploading/FileUpload";
import { NavLink } from "react-router-dom";
import { sideNavigationButtons } from "../../components/Forms";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { Country, State, City } from 'country-state-city';

const Employer = () => {
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [GST, setGST] = useState("");
  const [cwork, setCwork] = useState("");
  const [jobpost, setJobpost] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [curl, setCurl] = useState("");
  const [companyprofile, setCompanyprofile] = useState("");
  const [contactpnumber, setContactpnumber] = useState("");
  const [regno, setRegno] = useState("");
  const [PAN, setPAN] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [officetiming, setOfficetiming] = useState("");
  const [holidays, setHolidays] = useState("");
  const [workingdays, setWorkingdays] = useState("");
  const [seekerpost, setSeekerpost] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const countryData = Country.getAllCountries();
  const countryNames = Object.values(countryData).map((country) => country.name);

  let stateNames = [];
  if (country) {
    let selectedCountry = country;
    const countryCode = countryData.find((country) => country.name === selectedCountry)?.isoCode;
    const stateData = State.getStatesOfCountry(countryCode);
    stateNames = Array.from(new Set(Object.values(stateData).map((state) => state.name)));
  }

  let cityNames = [];
  if (country) {
    let selectedCountry = country;
    const countryCode = countryData.find((country) => country.name === selectedCountry)?.isoCode;
    const cityData = City.getCitiesOfCountry(countryCode);
    cityNames = Array.from(new Set(Object.values(cityData).map((city) => city.name)));
  }

  const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const clearInputs = () => {
    setCompany("");
    setMobile("");
    setEmail("");
    setCwork("");
    setJobpost("");
    setGST("");
    setExperience("");
    setSalary("");
    setCurl("");
    setCompanyprofile("");
    setContactpnumber("");
    setRegno("");
    setPAN("");
    setAddressline1("");
    setAddressline2("");
    setCity("");
    setZipcode("");
    setState("");
    setCountry("");
    setOfficetiming("");
    setHolidays("");
    setWorkingdays("");
    setSeekerpost("");
  };

  const getAmount = async () => {
    const {
      data: { price },
    } = await axios.get(
      `${BASE_URL}/formprice/Employer/price`, { headers }
    );
    return price;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const price = await getAmount();
    const receipt = "Employer Form";
    payment(price, receipt)
      .then(async (success) => {
        console.log("Payment success:", success);
        const resume = e.target.resume.files[0];
        const other = e.target.other.files[0];

        const getresumeUrl = await uploadFileToS3(resume,"pdf");
        const getotherUrl = await uploadFileToS3(other,"pdf");

        const formData = {
          company,
          mobile,
          email,
          cwork,
          jobpost,
          experience,
          salary,
          curl,
          GST,
          companyprofile,
          contactpnumber,
          regno,
          PAN,
          address: addressline1 + " " + addressline2,
          city,
          zipcode,
          state,
          country,
          officetiming,
          holidays,
          workingdays,
          seekerpost,
          resumeUrl: getresumeUrl,
          otherUrl: getotherUrl,
        };
        StoreAtDB(formData);
      })
      .catch((error) => {
        console.error("Payment error:", error);
        // Handle the error if the payment fails
      });
  };

  const StoreAtDB = (requestBody) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/services/employer/submit-form`,
        requestBody,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        alert("We will contact you soon!!!");
        clearInputs();
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        alert("Oops something went wrong!!!");
      });
  };

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
    <>
      <div className="container py-8 mx-auto max-w-[1244px]">
        <div
          className={`max-w-[1244px] ${
            !isSmallScreen ? "w-full" : "grid grid-cols-12 gap-16"
          } mt-5`}
        >
          <div className="col-span-4 px-2 mt-6 mb-6">
            {isSmallScreen ? (
              <div className="w-full mt-2 ">
                <ul className="">
                  <h1 className="text-2xl font-bold text-gray-700 ">
                    Our Services
                  </h1>
                  <div className="col-span-4 px-2 mt-6 mb-6">
                    {sideNavigationButtons.map((button) => (
                      <NavLink to={button.link}>
                        <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">
                          {button.name}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </ul>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="col-span-8 p-8 mx-auto border-2 shadow-md rounded-xl"
          >
            <h1 className="mb-4 text-3xl font-bold text-center">
              Employer Space
            </h1>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="company" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  id="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="mobile" className="flex items-center">
                  <AiOutlinePhone className="mr-2" />
                  Contact Number
                </label>
                <input
                  required
                  type="number"
                  id="mobile"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="email" className="flex items-center">
                  <AiOutlineMail className="mr-2" />
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="cwork" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Company Work
                </label>
                <input
                  required
                  type="text"
                  id="cwork"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={cwork}
                  onChange={(e) => setCwork(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="jobpost" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Job Post
                </label>
                <input
                  required
                  type="text"
                  id="jobpost"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={jobpost}
                  onChange={(e) => setJobpost(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="experience" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Experience
                </label>
                <input
                  required
                  type="number"
                  id="experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="salary" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Salary
                </label>
                <input
                  required
                  type="number"
                  id="salary"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex">
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="curl" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Company Website
                </label>
                <input
                  required
                  type="URL"
                  id="curl"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={curl}
                  onChange={(e) => setCurl(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="companyprofile" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Company Profile
                </label>
                <input
                  required
                  type="text"
                  id="companyprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={companyprofile}
                  onChange={(e) => setCompanyprofile(e.target.value)}
                />
              </div>
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="contactpnumber" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Contact Person Number
                </label>
                <input
                  required
                  type="number"
                  id="contactpnumber"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={contactpnumber}
                  onChange={(e) => setContactpnumber(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex">
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="regno" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Registration Number
                </label>
                <input
                  required
                  type="text"
                  id="regno"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={regno}
                  onChange={(e) => setRegno(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="PAN" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  PAN Number
                </label>
                <input
                  required
                  type="text"
                  id="PAN"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={PAN}
                  onChange={(e) => setPAN(e.target.value)}
                />
              </div>
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="PAN" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  GST Number
                </label>
                <input
                  required
                  type="text"
                  id="GST"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={GST}
                  onChange={(e) => setGST(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="addressline1" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Address Line 1
                </label>
                <input
                  required
                  type="text"
                  id="addressline1"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={addressline1}
                  onChange={(e) => setAddressline1(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="addressline2" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Address Line 2
                </label>
                <input
                  required
                  type="text"
                  id="addressline2"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={addressline2}
                  onChange={(e) => setAddressline2(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex">
              <div className="md:flex">
              <div className="flex">
                <div className="mx-1 mb-4 basis-1/2">
                <label className="block font-semibold">
                      City

                      <input
                        required
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                </div>
                <div className="mx-1 mb-4 basis-1/2">
                  <label htmlFor="zipcode" className="flex items-center">
                    <AiOutlineUser className="mr-2" />
                    Zip Code
                  </label>
                  <input
                    required
                    type="text"
                    id="zipcode"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                </div>
                <div className="flex">
                <div className="mx-1 mb-4 basis-1/2">
                <label className="block font-semibold">
                      State
                      <span className="relative top-0 right-0 text-red-700">
                        *
                      </span>
                      <select
                        required
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                </div>
                <div className="mx-1 mb-4 basis-1/2">
                  <label className="block mb-2 font-semibold">
                    Country
                    <span className="relative top-0 right-0 text-red-700">
                      *
                    </span>
                  </label>
                  <select
                    required
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  >
                    {countryNames.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
              </div>
            </div>
            <div className="md:flex">
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="officetiming" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Office Timing
                </label>
                <input
                  required
                  type="number"
                  id="officetiming"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={officetiming}
                  onChange={(e) => setOfficetiming(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="holidays" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Holidays
                </label>
                <input
                  required
                  type="number"
                  id="holidays"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={holidays}
                  onChange={(e) => setHolidays(e.target.value)}
                />
              </div>
              </div>
              <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="workingdays" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Working Days
                </label>
                <input
                  required
                  type="number"
                  id="workingdays"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={workingdays}
                  onChange={(e) => setWorkingdays(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="seekerpost" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Employer Post
                </label>
                <input
                  required
                  type="text"
                  id="seekerpost"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={seekerpost}
                  onChange={(e) => setSeekerpost(e.target.value)}
                />
              </div>
            </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="file-input"
                  className="block mb-2 font-semibold"
                >
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
                <label
                  htmlFor="file-input"
                  className="block mb-2 font-semibold"
                >
                  Other File
                  <span className="relative top-0 right-0 text-red-700">*</span>
                </label>
                <input
                  type="file"
                  name="other"
                  accept=".pdf"
                  id="other"
                  className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition-colors duration-300 bg-red-700 rounded"
            >
              Submit
            </button>
          </form>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            className="flex flex-col items-center justify-center p-8 text-center bg-white border-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlinePhone className="mb-2 text-3xl text-red-700" />
            <span className="font-semibold">Phone</span>
            <p className="mt-2">Sales: 8875515555 </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center p-8 text-center bg-white border-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiMapPin2Line className="mb-2 text-3xl text-red-700" />
            <span className="font-semibold">Address</span>
            <p className="mt-2">
              S-3, Vinayak Jaipur, fwefsdfrgh, loream dndnvnuidnvuwzxm,njd n
              sjvbvsbdj vvjhbwejk as, 300000
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center p-8 text-center bg-white border-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineMail className="mb-2 text-3xl text-red-700" />
            <span className="font-semibold">E-Mail</span>
            <p className="mt-2">Info@tender.com</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Employer;
