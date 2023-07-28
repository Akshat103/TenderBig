import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiMapPin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import uploadFileToS3 from "../file-uploading/FileUpload";
import axios from "axios";
import { getCountries, getStatesByCountry, getCitiesByCountryAndState } from '../../utils/CountryData';
import payment from "../../components/payment";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

function CompanyForm({ onSubmit, licenses }) {
    const [companyName, setCompanyName] = useState('');
    const [companyProfile, setCompanyProfile] = useState('');
    const [cinReg, setCinReg] = useState('');
    const [workingField, setWorkingField] = useState('');
    const [gst, setGst] = useState('');
    const [pan, setPan] = useState('');
    const [website, setWebsite] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [requestLicense, setRequestLicense] = useState('');
    const [selectedPositions, setSelectedPositions] = useState('');
    const [contractPName, setContractPName] = useState('');
    const [others, setOthers] = useState("");

    const getAmount=async()=>{
        const {data:{price}} = await axios.get(`${BASE_URL}/formprice/Company%20Certification/price`, { headers });
        return price;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = await getAmount();
        const receipt = "Company Certification";
        payment(price,receipt)
            .then(async success => {
                console.log('Payment success:', success);
                const doc = e.target.doc.files[0];
                const cgst = e.target.cgst.files[0];
                const cpan = e.target.cpan.files[0];

                const getdocUrl = await uploadFileToS3(doc,"pdf");
                const getgstUrl = await uploadFileToS3(cgst,"pdf");
                const getpanUrl = await uploadFileToS3(cpan,"pdf");

                const data = {
                    companyName,
                    companyProfile,
                    cinReg,
                    others,
                    workingField,
                    gst,
                    pan,
                    website,
                    email,
                    contactNumber,
                    requestLicense,
                    selectedPositions,
                    contractPName,
                    docUrl: getdocUrl,
                    gstUrl: getgstUrl,
                    panUrl: getpanUrl
                };

                onSubmit(data);
            })
            .catch(error => {
                console.error('Payment error:', error);
                // Handle the error if the payment fails
            });


    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-2 md:gap-2">
                <div className=" p-2 rounded-lg">
                    <label className="block font-semibold">
                        Company Name
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input required
                            type="text"
                            name="companyName"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Enter Company Name"
                        />
                    </label>
                    <label className="block font-semibold mt-2">
                        Company Profile
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="companyProfile"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={companyProfile} onChange={(e) => setCompanyProfile(e.target.value)}
                            placeholder="Enter Company Profile"
                        />
                    </label>
                    <label className="block font-semibold mt-2">
                        CIN/REG
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input required
                            type="text"
                            name="cinReg"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={cinReg} onChange={(e) => setCinReg(e.target.value)}
                            placeholder="Enter CIN/REG"
                        />
                    </label>
                    <label className="block mb-2 font-semibold mt-2">
                        Working Field
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="workingField"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={workingField} onChange={(e) => setWorkingField(e.target.value)}
                            placeholder="Enter Working Field"
                        />
                    </label>
                    <label className="block mb-2 font-semibold mt-2">
                        GST
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="gst"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={gst} onChange={(e) => setGst(e.target.value)}
                            placeholder="Enter GST"
                        />
                    </label>
                    <label className="block mb-2 font-semibold mt-2">
                        PAN
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="pan"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={pan} onChange={(e) => setPan(e.target.value)}
                            placeholder="Enter PAN"
                        />
                    </label>
                </div>

                <div className="p-2 rounded-lg">
                    <label className="block mb-2 font-semibold">
                        Website
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="website"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={website} onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Enter Website"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Email
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="email"
                            name="email"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Contact Number
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            id="contactNumber"
                            name="contactNumber"
                            value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Enter Contact Number"
                            required
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Request License
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <select
                            name="requestLicense"
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={requestLicense}
                            onChange={(e) => setRequestLicense(e.target.value)}
                        >
                            <option value="">Select</option>
                            {licenses.map((license) => (
                                <option key={license} value={license}>
                                    {license}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2 font-semibold">
                        Selected Positions
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="selectedPositions"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={selectedPositions} onChange={(e) => setSelectedPositions(e.target.value)}
                            placeholder="Enter Position"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Contract Person Name
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="contractPName"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={contractPName} onChange={(e) => setContractPName(e.target.value)}
                            placeholder="Enter Name"
                        />
                    </label>
                    <label className="block mb-2 font-semibold mt-2">
                        Others
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <input
                            type="text"
                            name="others"
                            className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            value={others} onChange={(e) => setOthers(e.target.value)}
                        />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">

                <div>
                    <label htmlFor="file-input" className="block mb-2 font-semibold">
                        Upload Document
                        <span className="text-red-700 relative top-0 right-0">*</span>
                    </label>
                    <input
                        type="file" name="doc" accept=".pdf" required
                        className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="file-input" className="block mb-2 font-semibold">
                        GST
                        <span className="text-red-700 relative top-0 right-0">*</span>
                    </label>
                    <input
                        type="file" name="cgst" accept=".pdf" required
                        className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="file-input" className="block mb-2 font-semibold">
                        PAN
                        <span className="text-red-700 relative top-0 right-0">*</span>
                    </label>
                    <input
                        type="file" name="cpan" accept=".pdf" required
                        className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                    />
                </div>

            </div>

            <div className="flex items-center justify-between mb-4">
                <button
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

function IndividualForm({ onSubmit, licenses }) {
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [dob, setDob] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [workingField, setWorkingField] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [companyaddress1, setAddressline1] = useState('');
    const [companyaddress2, setAddressline2] = useState('');
    const [companycity, setCity] = useState('');
    const [companystate, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [companycountry, setCountry] = useState('');
    const [others, setOthers] = useState("");
    const [email, setEmail] = useState('');
    const [requestLicense, setRequestLicense] = useState('');

    const countryNames = getCountries();

    let stateNames = [];
    if (companycountry) {
      stateNames = getStatesByCountry(companycountry);
    }
  
    let cityNames = [];
    if (companycountry && companystate) {
      cityNames = getCitiesByCountryAndState(companycountry , companystate);
    }

    const getAmount=async()=>{
        const {data:{price}} = await axios.get(`${BASE_URL}/formprice/Individual%20Certification/price`, { headers });
        return price;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = await getAmount();
        const receipt = "Individual Certification";
        payment(price,receipt)
            .then(async success => {
                console.log('Payment success:', success);
                const photo = e.target.photo.files[0];
                const aadhar = e.target.aadhar.files[0];
                const pan = e.target.pan.files[0];
                const signature = e.target.signature.files[0];

                const getphotoUrl = await uploadFileToS3(photo,"image");
                const getaadharUrl = await uploadFileToS3(aadhar,"pdf");
                const getpanUrl = await uploadFileToS3(pan,"pdf");
                const getsignatureUrl = await uploadFileToS3(signature,"image");

                const data = {
                    name,
                    fatherName,
                    dob,
                    aadharNumber,
                    panNumber,
                    workingField,
                    companyaddress1,
                    companyaddress2,
                    companycity,
                    companystate,
                    zipcode,
                    companycountry,
                    others,
                    mobileNumber,
                    email,
                    requestLicense,
                    photoUrl: getphotoUrl,
                    aadharUrl: getaadharUrl,
                    panUrl: getpanUrl,
                    signatureUrl: getsignatureUrl
                };

                onSubmit(data);
            })
            .catch(error => {
                console.error('Payment error:', error);
                // Handle the error if the payment fails
            });

    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 md:gap-4">
            <div className=" p-2 rounded-lg">
                <label className="block font-semibold">
                    Name
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input required
                        type="text"
                        name="name"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </label>
                <label className="block font-semibold mt-2">
                    Father Name
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        type="text"
                        name="fatherName"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={fatherName} onChange={(e) => setFatherName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </label>
                <label className="block font-semibold mt-2">
                    DOB
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input required
                        type="date"
                        name="dob"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={dob} onChange={(e) => setDob(e.target.value)}
                        placeholder="Enter DOB"
                    />
                </label>
                <label className="block mb-2 font-semibold mt-2">
                    Working Field
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        type="text"
                        name="workingField"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={workingField} onChange={(e) => setWorkingField(e.target.value)}
                        placeholder="Enter Working Field"
                    />
                </label>
                <label className="block mb-2 font-semibold mt-2">
                    Address Line 1
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        required
                        type="text"
                        name="companyaddress1"
                        value={companyaddress1}
                        onChange={(e) => setAddressline1(e.target.value)}
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter Address Line 1"
                    />
                </label>

                <label className="block mb-2 font-semibold">
                    Address Line 2
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        required
                        type="text"
                        name="companyaddress2"
                        value={companyaddress2}
                        onChange={(e) => setAddressline2(e.target.value)}
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter Address Line 2"
                    />
                </label>


                <label className="block mb-2 font-semibold">
                    Country
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <select
                        required
                        name="companycountry"
                        value={companycountry}
                        onChange={(e) => setCountry(e.target.value)}
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                        <option value="">Select a country</option>
                        {countryNames.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="md:flex">
                    <label className="block mb-2 font-semibold basis-1/2">
                        State
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <select
                            required
                            name="companystate"
                            value={companystate}
                            onChange={(e) => setState(e.target.value)}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        >
                            <option value="">Select State</option>
                            {stateNames.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block mb-2 float-right font-semibold basis-1/2 mx-1">
                        City
                        <span className="text-red-700 relative top-0 right-0">*</span>
                        <select
                            required
                            name="companycity"
                            value={companycity}
                            onChange={(e) => setCity(e.target.value)}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        >
                            <option value="">Select City</option>
                            {cityNames.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </label>

                </div>
            </div>

            <div className="p-2 rounded-lg">
                <label className="block mb-2 font-semibold">
                    Email
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        type="email"
                        name="email"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                </label>
                <label className="block mb-2 font-semibold">
                    Contact Number
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter Contact Number"
                        required
                    />
                </label>
                <label className="block mb-2 font-semibold">
                    Aadhar Number
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        id="aadharNumber"
                        name="aadharNumber"
                        value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)}
                        placeholder="Enter Aadhar Number"
                        required
                    />
                </label>
                <label className="block mb-2 font-semibold mt-2">
                    PAN
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        type="text"
                        name="panNumber"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={panNumber} onChange={(e) => setPanNumber(e.target.value)}
                        placeholder="Enter PAN"
                    />
                </label>

                <label className="block mb-2 font-semibold mt-2">
                    Others
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        type="text"
                        name="others"
                        className="border rounded-sm  px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={others} onChange={(e) => setOthers(e.target.value)}
                    />
                </label>

                <label className="block mb-2 font-semibold">
                    Request License
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <select
                        name="requestLicense"
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        value={requestLicense}
                        onChange={(e) => setRequestLicense(e.target.value)}
                    >
                        <option value="">Select</option>
                        {licenses.map((license) => (
                            <option key={license} value={license}>
                                {license}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-2 font-semibold basis-1/2">
                    ZipCode
                    <span className="text-red-700 relative top-0 right-0">*</span>
                    <input
                        required
                        type="text"
                        name="companystate"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        placeholder="Enter State"
                    />
                </label>

            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">

            <div>
                <label htmlFor="file-input" className="block mb-2 font-semibold">
                    Upload Photo
                    <span className="text-red-700 relative top-0 right-0">*</span>
                </label>
                <input
                    type="file" name="photo" accept=".jpg,.png,.jpeg" required
                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
            </div>

            <div>
                <label htmlFor="file-input" className="block mb-2 font-semibold">
                    Upload Aadhar Card
                    <span className="text-red-700 relative top-0 right-0">*</span>
                </label>
                <input
                    type="file" name="aadhar" accept=".pdf" required
                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
            </div>

            <div>
                <label htmlFor="file-input" className="block mb-2 mt-6 md:mt-0 font-semibold">
                    Upload PAN
                    <span className="text-red-700 relative top-0 right-0">*</span>
                </label>
                <input
                    type="file" name="pan" accept=".pdf" required
                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
            </div>

            <div>
                <label htmlFor="file-input" className="block mb-2 font-semibold">
                    Upload Digital Signature
                    <span className="text-red-700 relative top-0 right-0">*</span>
                </label>
                <input
                    type="file" name="signature" accept=".jpg,.png,.jpeg" required
                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                />
            </div>

        </div>

        <div className="flex items-center justify-between mb-4">
            <button
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                type="submit"
            >
                Submit
            </button>
        </div>
    </form>
    );
}

const Certification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [licenses, setLicenses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        fetchLicenses();
    }, []);


    const fetchLicenses = async () => {
        const response = await axios.get(`${BASE_URL}/options/alloptions?array=licenses`, { headers });
        setLicenses(response.data[0].licenses);
    }

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

    const [selectedOption, setSelectedOption] = useState('company');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCompanyFormSubmit = (data) => {

        const token = localStorage.getItem('token');
        axios
            .post(`${BASE_URL}/services/ccert/certification`, data, {
                headers: {
                    'auth': token
                }
            })
            .then((response) => {
                if(response.data.success){
                    console.log("Form data sent successfully");
                    alert(response.data.message);
                    navigate('/regandcert');
                }
            })
            .catch((error) => {
                console.error("Error sending form data:", error);
                alert("Oops something went wrong!!!");
            });
    };

    const handleIndividualFormSubmit = (data) => {

        const token = localStorage.getItem('token');
        console.log(data)
        axios
            .post(`${BASE_URL}/services/icert/certification`, data, {
                headers: {
                    'auth': token
                }
            })
            .then((response) => {
                if(response.data.success){
                    console.log("Form data sent successfully");
                    console.log(response)
                    alert(response.data.message);
                    navigate('/regandcert');
                }
            })
            .catch((error) => {
                console.error("Error sending form data:", error);
                alert("Oops something went wrong!!!");
            });

    };

    return (
        <>
            <div className="container mx-auto py-8 md:max-w-7xl">
                <div className="space-y-8">
                    <div className="mx-auto mt-6 px-4 py-8 shadow-2xl p-6 bg-white rounded-lg flex flex-col md:flex-row">

                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <img
                                src={`${import.meta.env.BASE_URL}illustartion/cert.svg`}
                                alt="Illustration"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4 text-center">Certification</h2>

                            <div className="flex">
                                <div className="w-full">
                                    <div className="mb-4">
                                        <input
                                            type="radio"
                                            id="company"
                                            name="option"
                                            value="company"
                                            checked={selectedOption === 'company'}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor="company" className="ml-2 mr-4">Company</label>

                                        <input
                                            type="radio"
                                            id="individual"
                                            name="option"
                                            value="individual"
                                            checked={selectedOption === 'individual'}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor="individual" className="ml-2">Individual</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-full">
                                    {/* Render the selected form */}
                                    {selectedOption === 'company' && <CompanyForm onSubmit={handleCompanyFormSubmit} licenses={licenses} />}
                                    {selectedOption === 'individual' && <IndividualForm onSubmit={handleIndividualFormSubmit} licenses={licenses} />}
                                </div>
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
            </div>
        </>
    );
};

export default Certification;
