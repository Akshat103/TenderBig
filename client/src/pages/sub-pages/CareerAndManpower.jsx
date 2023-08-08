import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

const CareerAndManpower = () => {

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

  return (
    <>
      <div className="container mx-auto py-8 md:max-w-7xl space-y-8">
        <div className="border-2 p-4 rounded-md shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4">Career and Man Power</h1>
          <div className="flex items-center justify-center flex-col md:flex-row">
            <img
              src={`${import.meta.env.BASE_URL}illustartion/c&m.svg`}
              className="w-3/5 md:w-1/2"
              alt="Contact illustration"
              loading="lazy"
            />
            <div className="md:w-2/3 mx-auto flex items-center justify-center flex-col space-y-3 md:space-y-0 md:space-x-3">
              <p className="text-2xl mb-4 font-semibold">Who is this?</p>
              <hr />
              <Link to="/seeker">
                <button className="bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Seeker
                </button>
              </Link>
              <p className="flex justify-center p-3">or</p>
              <Link to="/employer">
                <button className="bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                  Employer
                </button>
              </Link>
            </div>
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
          </motion.div>
          <motion.div
            className="bg-white p-8 border-2 rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiMapPin2Line className="text-red-700 text-3xl mb-2" />
            <span className="font-semibold">Address</span>
            <p className="mt-2">
             S-30, 2nd floor Dwarika tower

central spine, vidhyadhar nagar, jaipur, 302039
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 border-2 rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineMail className="text-red-700 text-3xl mb-2" />
            <span className="font-semibold">E-Mail</span>
            <p className="mt-2">Info@tenderbig.com</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CareerAndManpower;