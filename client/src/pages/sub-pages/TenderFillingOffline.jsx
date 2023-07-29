import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiBuilding2Line, RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TenderFillingOffline = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI(selectedService);
    setName("");
    setCompany("");
    setMobile("");
    setEmail("");
    setAadhar("");
    setSelectedService("");
  };

  const [isVisible, setIsVisible] = useState(false);

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedServiceFromNavbar = queryParams.get("service");

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const sendDataToAPI = (selectedService) => {
    const formData = {
      name,
      company,
      mobile,
      email,
      aadhar,
      role: selectedService
    };
    const token = localStorage.getItem('token');
    axios
      .post(`${BASE_URL}/services/tender/offline`, formData, {
        headers: {
          'auth': token
        }
      })
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        alert("We will contact you soon!!!")
        setIsVisible(false);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        alert("Oops something went wrong!!!")
      });
  };

  return (
    <>
      <div className="container mx-auto py-8 md:max-w-7xl">
        <div className="space-y-8">
          <div className="flex items-center justify-center flex-col md:flex-row">
            <img
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1687066253~exp=1687066853~hmac=42f23f007ad72bd2ca440a69684ce6508082c1182b3c54179addffc4163960af"
              className="w-4/5 md:w-1/2"
              alt="Contact illustration"
              loading="lazy"
            />
            <form
              onSubmit={handleFormSubmit}
              className="md:w-2/3 mx-auto border-2 p-8 rounded-xl shadow-md"
            >
              <h1 className="text-3xl font-bold text-center mb-4">
                Provide Your Details
              </h1>
              <div className="mb-4">
                <label htmlFor="name" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  Name
                </label>
                <input required
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="aadhar" className="flex items-center">
                  <AiOutlineUser className="mr-2" />
                  16-Digit aadhar Number
                </label>
                <input required
                  type="number"
                  id="aadhar"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="flex items-center">
                  <RiBuilding2Line className="mr-2" />
                  Company Name
                </label>
                <input required
                  type="text"
                  id="company"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="flex items-center">
                  <AiOutlinePhone className="mr-2" />
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="flex items-center">
                  <AiOutlineMail className="mr-2" />
                  Email Address
                </label>
                <input required
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="services" className="flex items-center">
                  You Are?
                </label>
                <select required
                  id="services"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={selectedService || selectedServiceFromNavbar}
                  onChange={handleServiceChange}
                >
                  <option value="">Select an option</option>
                  <option value="Organization">Organization</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-white p-8 border-2 rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlinePhone className="text-red-700 text-3xl mb-2" />
            <span className="font-semibold">Phone</span>
            <p className="mt-2">Sales: 8875515555 </p>
            {/*<p>Support: 8875515555 </p>*/}
          </motion.div>
          <motion.div
            className="bg-white p-8 border-2 rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiMapPin2Line className="text-red-700 text-3xl mb-2" />
            <span className="font-semibold">Address</span>
            <p className="mt-2">
              S-3, Vinayak Jaipur, fwefsdfrgh, loream dndnvnuidnvuwzxm,njd n
              sjvbvsbdj vvjhbwejk as, 300000
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 border-2 rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineMail className="text-red-700 text-3xl mb-2" />
            <span className="font-semibold">E-Mail</span>
            <p className="mt-2">Info@tender.com</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TenderFillingOffline;