import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiBuilding2Line, RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import payment from "../../components/payment";
import uploadFileToS3 from "../file-uploading/FileUpload";
import { sideNavigationButtons } from "../../components/Forms";
import { NavLink } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Registration = () => {
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [wmobile, setWMobile] = useState("");
  const [cprofile, setCprofile] = useState("");
  const [cwebsite, setCwebsite] = useState("");
  const [companyEstd, setCompanyEstd] = useState("");
  const [CIN, setCIN] = useState("");
  const [companyaddress1, setCompanyaddress1] = useState("");
  const [companyaddress2, setCompanyaddress2] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [companycity, setCompanycity] = useState("");
  const [companystate, setCompanystate] = useState("");
  const [companycountry, setCompanycountry] = useState("");
  const [secMobile, setSecMobile] = useState("");
  const [Gem, setGem] = useState("");
  const [liscence, setLiscence] = useState("");
  const [cpname, setCpname] = useState("");
  const [fname, setFname] = useState("");
  const [companypost, setCompanypost] = useState("");
  const [GST, setGST] = useState("");
  const [PAN, setPAN] = useState("");
  const [category, setCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setIsVisible(true);
    fetchCategories(); // Fetch categories when component mounts
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
    setGem("");
    setCompany("");
    setMobile("");
    setCwebsite("");
    setSecMobile("");
    setEmail("");
    setCIN("");
    setWMobile("");
    setOtherDetails("");
    setCprofile("");
    setCategory("");
    setCompanyEstd("");
    setCompanypost("");
    setLiscence("");
    setCpname("");
    setFname("");
    setGST("");
    setPAN("");
  };

  const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

  const getAmount = async () => {
    const {
      data: { price },
    } = await axios.get(
      `${BASE_URL}/formprice/Registration/price`, { headers }
    );
    return price;
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/options/alloptions?array=categories`, { headers }
      );
      setCategories(response.data[0].categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const price = await getAmount();
    const receipt = "Registration Form";
    payment(price, receipt)
      .then(async (success) => {
        console.log("Payment success:", success);
        const reg = e.target.reg.files[0];
        const gst = e.target.gst.files[0];
        const pan = e.target.pan.files[0];

        const getRegUrl = await uploadFileToS3(reg,"pdf");
        const getGstUrl = await uploadFileToS3(gst,"pdf");
        const getPanUrl = await uploadFileToS3(pan,"pdf");

        const formData = {
          Gem,
          company,
          mobile,
          secMobile,
          email,
          cwebsite,
          CIN,
          wmobile,
          cprofile,
          companyEstd,
          otherDetails,
          companypost,
          liscence,
          cpname,
          category,
          fname,
          GST,
          PAN,
          address: companyaddress1 + " " + companyaddress2,
          companycountry,
          companycity,
          companystate,
          regUrl: getRegUrl,
          gstUrl: getGstUrl,
          panUrl: getPanUrl,
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
        `${BASE_URL}/services/register/registration`,
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

  const countryData = Country.getAllCountries();
  const countryNames = Object.values(countryData).map(
    (country) => country.name
  );

  let stateNames = [];
  if (companycountry) {
    const countryCode = countryData.find(
      (country) => country.name === companycountry
    )?.isoCode;
    const stateData = State.getStatesOfCountry(countryCode);
    stateNames = Array.from(
      new Set(Object.values(stateData).map((state) => state.name))
    );
  }

  let cityNames = [];
  if (companycountry) {
    const countryCode = countryData.find(
      (country) => country.name === companycountry
    )?.isoCode;
    const cityData = City.getCitiesOfCountry(countryCode);
    cityNames = Array.from(
      new Set(Object.values(cityData).map((city) => city.name))
    );
  }


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
              Registration
            </h1>
            <div className="mb-4">
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

            <div className="flex">
              <div className="mx-1 mb-4 mt-6 md:mt-0 basis-1/2">
                <label htmlFor="mobile" className="flex items-center">
                  <AiOutlinePhone className="mr-2" />
                  WhatsApp no.
                </label>
                <input
                  required
                  type="number"
                  id="wmobile"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={wmobile}
                  onChange={(e) => setWMobile(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-2 basis-1/2">
                <label htmlFor="email" className="flex items-center">
                  <AiOutlineMail className="mr-2" />
                  Secondary Number
                </label>
                <input
                  required
                  type="number"
                  id="secMobile"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={secMobile}
                  onChange={(e) => setSecMobile(e.target.value)}
                />
              </div>
            </div>

            <div className="flex">
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
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="cprofile" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Company Profile
                </label>
                <input
                  required
                  type="text"
                  id="cprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={cprofile}
                  onChange={(e) => setCprofile(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="cwebsite" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Company Website
                </label>
                <input
                  required
                  type="text"
                  id="cwebsite"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={cwebsite}
                  onChange={(e) => setCwebsite(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="companyEstd" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Company Estd. Year
                </label>
                <input
                  required
                  type="number"
                  id="companyEstd"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={companyEstd}
                  onChange={(e) => setCompanyEstd(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="CIN" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  CIN / Reg Number
                </label>
                <input
                  required
                  type="text"
                  id="CIN"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={CIN}
                  onChange={(e) => setCIN(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="liscence" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Lisence Name
                </label>
                <input
                  required
                  type="text"
                  id="liscence"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={liscence}
                  onChange={(e) => setLiscence(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
        <label className="block mb-2 font-semibold">
          Category
          <span className="relative top-0 right-0 text-red-700">*</span>
          <select
            name="requestLicense"
            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="liscence" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Gem reg No.
                </label>
                <input
                  required
                  type="number"
                  id="Gem"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={Gem}
                  onChange={(e) => setGem(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="cpname" className="flex items-center">
                <RiBuilding2Line className="mr-2" />
                Director / Name of the contacting Person
              </label>
              <input
                required
                type="text"
                id="cpname"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={cpname}
                onChange={(e) => setCpname(e.target.value)}
              />
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="fname" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Father Name
                </label>
                <input
                  required
                  type="text"
                  id="fname"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="companypost" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Post Of Company
                </label>
                <input
                  required
                  type="text"
                  id="companypost"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={companypost}
                  onChange={(e) => setCompanypost(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-1 mb-4 basis-1/2">
                <label htmlFor="GST" className="flex items-center">
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

            <label className="block mb-2 font-semibold">
              Address Line 1
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="companyaddress1"
                value={companyaddress1}
                onChange={(e) => setCompanyaddress1(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              />
            </label>
            <label className="block mb-2 font-semibold">
              Address Line 2
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="companyaddress2"
                value={companyaddress2}
                onChange={(e) => setCompanyaddress2(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              />
            </label>
            <div className="flex">
              <label className="block mx-1 mb-2 font-semibold basis-1/2">
                City
                <span className="relative top-0 right-0 text-red-700">*</span>
                <input
                  required
                  type="text"
                  name="companycity"
                  value={companycity}
                  onChange={(e) => setCompanycity(e.target.value)}
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
              <label className="block mb-2 font-semibold basis-1/2">
                State
                <span className="relative top-0 right-0 text-red-700">*</span>
                <select
                  required
                  type="text"
                  name="companystate"
                  value={companystate}
                  onChange={(e) => setCompanystate(e.target.value)}
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

            <label className="block mb-2 font-semibold">
              Country
              <span className="relative top-0 right-0 text-red-700">*</span>
              <select
                required
                name="country"
                value={companycountry}
                onChange={(e) => setCompanycountry(e.target.value)}
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
              Other Details (if required)
              <textarea
                name="otherDetails"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                placeholder="Enter Other Details"
                className="w-full h-24 px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
              ></textarea>
            </label>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label
                  htmlFor="file-input"
                  className="block mb-2 font-semibold"
                >
                  Registraion
                  <span className="relative top-0 right-0 text-red-700">*</span>
                </label>
                <input
                  type="file"
                  name="reg"
                  accept=".pdf"
                  required
                  id="reg"
                  className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="file-input"
                  className="block mb-2 font-semibold"
                >
                  GST
                  <span className="relative top-0 right-0 text-red-700">*</span>
                </label>
                <input
                  type="file"
                  name="gst"
                  accept=".pdf"
                  id="gst"
                  className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="file-input"
                  className="block mb-2 font-semibold"
                >
                  PAN
                  <span className="relative top-0 right-0 text-red-700">*</span>
                </label>
                <input
                  type="file"
                  name="pan"
                  accept=".pdf"
                  id="pan"
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

export default Registration;
