import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiBuilding2Line, RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI(selectedService);
    setName("");
    setCompany("");
    setMobile("");
    setEmail("");
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
      selectedService,
    };
    const token = localStorage.getItem('token');
    axios
      .post("http://localhost:5000/apitender/post-contactform", formData, {
        headers: {
          'auth': token
        }
      })
      .then((response) => {
        alert("We will contact you soon!!!")
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        alert("Oops something went wrong!!!")
      });
  };

  return (
    <>
      <div className="m-10">

            <h2 className="text-2xl font-bold mb-4 text-center ">Seek Our Support</h2>
        <div className="flex flex-wrap pr-10 pl-10">

          <div className="w-full md:w-1/2">
          <img
              src={`${import.meta.env.BASE_URL}illustartion/contact.jpg`}
              alt="Illustration"
            />
          </div>

          <div className="w-full md:w-1/2 pr-17 pl-17">

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Name
                  <span className="text-red-700 relative top-0 right-0">*</span>
                  <input required
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Name" />
                </label>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Company
                  <input
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                <label className="block mb-2 font-semibold">
                  Email
                  <input
                    className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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
                  Select Services
                </label>
                <select required
                  id="services"
                  className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  value={selectedService || selectedServiceFromNavbar}
                  onChange={handleServiceChange}
                >
                  <option value="">Select Service</option>
                  <option value="Career&ManPower">Career & Man Power</option>
                  <option value="Registration/Certificate">Registration/Certificate</option>
                  <option value="Joint Venture">License</option>
                  <option value="Auction Material">Auction Material</option>
                  <option value="Joint Venture">Joint Venture</option>
                  <option value="Tender Result">Online Bidding</option>
                  <option value="Tender Result">Tender Result</option>
                </select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="submit"
                >
                  Get In Touch
                </button>
              </div>
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

export default ContactUsPage;