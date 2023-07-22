import { useState, useEffect } from "react";
import payment from "../components/payment";
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { sideNavigationButtons } from "../components/Forms";

const GemRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    aadhar: "",
    companyName: "",
    panNumber: "",
    websiteAddress: "",
    gst: "",
    startDate: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const clearInputs = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      aadhar: "",
      companyName: "",
      panNumber: "",
      websiteAddress: "",
      gst: "",
      startDate: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zip: "",
    });
  }

  const countryData = Country.getAllCountries();
  const countryNames = Object.values(countryData).map((country) => country.name);

  let stateNames = [];
  if (formData.country) {
    const countryCode = countryData.find((country) => country.name === formData.country)?.isoCode;
    const stateData = State.getStatesOfCountry(countryCode);
    stateNames = Array.from(new Set(Object.values(stateData).map((state) => state.name)));
  }

  let cityNames = [];
  if (formData.country) {
    const countryCode = countryData.find((country) => country.name === formData.country)?.isoCode;
    const cityData = City.getCitiesOfCountry(countryCode);
    cityNames = Array.from(new Set(Object.values(cityData).map((city) => city.name)));
  }

  // const [currentPage, setCurrentPage] = useState(1);
  const [checkbox, setCheckbox] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCheckbox(e) {
    setCheckbox(e.target.checked);
  }
  <input value="test" type="checkbox" onChange={handleChange} />
  const getAmount=async()=>{
    const {data:{price}} = await axios.get("http://localhost:5000/apiTender/formprice/Gem%20Registration/price");
    return price;
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const price = await getAmount();
    const receipt = "Gem Registration";
    
    const token = localStorage.getItem("token");
    payment(price,receipt)
      .then(async success => {
        console.log('Payment success:', success);
        const requestBody = JSON.stringify(formData);

        fetch("http://localhost:5000/apiTender/services/gem/submit", {
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
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Oops something went wrong!!!");
            clearInputs();
          });
      })
      .catch(error => {
        console.error('Payment error:', error);
        // Handle the error if the payment fails
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
      <div className="col-span-8 px-8 py-8 mx-auto mt-6 mb-6 rounded-lg shadow-lg border-[2px] border-black/20">
        <form onSubmit={handleSubmit}>
          {/* Global Section */}
          <h2 className="mb-4 text-2xl font-bold text-center">Gem Registration</h2>

          <div className="p-2 rounded-lg">
            <p className="font-serif text-sm font-thin text-red-700">
              Fields marked with an asterisk (*) are mandatory.
            </p>
            {/* Name */}
            <label className="relative block mb-2 font-semibold">
              Full Name
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Project"
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Email
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Email"
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Contact Number
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Mobile"
              />
            </label>
            <label className="relative block mb-2 font-semibold">
              Aadhar Number
              <span className="relative top-0 right-0 text-red-700">*</span>
              <input
                required
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                placeholder="Aadhar Number"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative">
                <label className="block mb-2 font-semibold">
                  Company Name
                  <span className="relative top-0 right-0 text-red-700">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  placeholder="Company Name"
                />
              </div>
              <div className="relative">
                <label className="block mb-2 font-semibold">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  placeholder="Enter PAN No"
                />
              </div>
              <div className="relative">
                <label className="block mb-2 font-semibold">
                  Website Address
                </label>
                <input
                  type="URL"
                  name="websiteAddress"
                  value={formData.websiteAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  placeholder="Website URL"
                />
              </div>
              <label className="block mb-2 font-semibold">
                GST Number
                <span className="relative top-0 right-0 text-red-700">*</span>
                <input
                  required
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  placeholder="GST number"
                />
              </label>
              <div className="grid gap-4 mt-1.5 mb-1.5">
                <label className="block font-semibold">
                  Bussiness Start Date
                  <span className="relative top-0 right-0 text-red-700">*</span>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    placeholder="Enter Start Date"
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="p-2 mt-2 rounded-lg ">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Business Office Building</h2>
                <label className="relative block mb-2 font-semibold">
                  Address
                  <span className="relative top-0 right-0 text-red-700">*</span>
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

                <div className="grid grid-cols-2 gap-4">
                  <label className="relative block mb-2 font-semibold">
                    Country
                    <span className="relative top-0 right-0 text-red-700">*</span>
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

                  <label className="relative block mb-2 font-semibold">
                    State
                    <span className="relative top-0 right-0 text-red-700">*</span>
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

                  <label className="relative block mb-2 font-semibold">
                    City
                    <span className="relative top-0 right-0 text-red-700">*</span>
                    <input
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

                  <label className="relative block mb-2 font-semibold">
                    ZIP Code
                    <span className="relative top-0 right-0 text-red-700">*</span>
                    <input
                      required
                      type="number"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter ZIP"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3 font-bold">
            <p>Cost of Registration : <span className="text-red-600">xyzw</span></p>
          </div>
          <div className="flex m-3">
            <input value="test" type="checkbox" onChange={handleCheckbox} />
            <p className="mx-2">Do you agree to the terms and conditions?</p>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-colors duration-300 bg-red-700 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default GemRegistration; 