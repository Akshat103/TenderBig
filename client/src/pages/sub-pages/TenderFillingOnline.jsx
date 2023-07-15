import { useState, useEffect } from "react";
import { locations } from "../../constants/countriesData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import uploadFileToS3 from "../../pages/file-uploading/FileUpload";
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Country, State, City } from 'country-state-city';
import payment from "../../components/payment";
import { sideNavigationButtons } from "../../components/Forms";
import { NavLink } from "react-router-dom";

const uploadMultipleFilesToS3 = async (files) => {
    const uploadPromises = files.map(async (file) => {
        const result = await uploadFileToS3(file);
        return result;
    });

    const results = await Promise.all(uploadPromises);
    return results;
};

const SecondPage = ({ formData, handleChange, previousPage }) => {

    return (
        <>
            <h2 className="mb-4 text-2xl font-bold text-center">Online Tender</h2>
            <p className="font-serif text-sm font-thin text-red-700">
                Fields marked with an asterisk (*) are mandatory.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* otherInformation Section */}
                <div className="p-2 mt-2 rounded-lg">
                    <h2 className="mb-4 text-2xl font-bold ">Individual Info</h2>
                    <label className="relative block mb-2 font-semibold">
                        Director Name
                        <input
                            type="text"
                            name="directorname"
                            value={formData.directorname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Father Name
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <label className="block mb-2 font-semibold">
                            DOB
                            <span className="relative top-0 right-0 text-red-700">*</span>
                            <input required
                                type="date"
                                name="iDOB"
                                value={formData.iDOB}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>

                    </div>
                    <label className="block mb-4 font-semibold">
                        Aadhar Card
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="number"
                            name="paadhar"
                            value={formData.paadhar}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <label className="block mb-4 font-semibold">
                        PAN card
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="text"
                            name="ppan"
                            value={formData.ppan}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Contact Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input
                            required
                            type="number"
                            name="pmobile"
                            value={formData.pmobile}
                            onChange={handleChange}
                            className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

                        />
                    </label>
                </div>

                {/* purchaserDetail Section */}
                <div className="p-2 mt-2 rounded-lg">
                    <h2 className="mb-4 text-2xl font-bold">Purchaser Detail</h2>
                    <label className="block mb-2 font-semibold">
                        Email
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="email"
                            name="pemail"
                            value={formData.pemail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <label className="block mx-1 mb-2 font-semibold basis-1/2">
                        Account Holder Name
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="text"
                            name="accholdername"
                            value={formData.accholdername}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <label className="block mb-2 font-semibold">
                        Account Number
                        <span className="relative top-0 right-0 text-red-700">*</span>
                        <input required
                            type="number"
                            name="accnumber"
                            value={formData.accnumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                    </label>
                    <div className="flex">
                        <label className="block mx-1 mb-2 font-semibold basis-1/2">
                            IFSC code
                            <span className="relative top-0 right-0 text-red-700">*</span>
                            <input required
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>
                        <label className="block mx-1 mb-2 font-semibold basis-1/2">
                            Branch Number
                            <span className="relative top-0 right-0 text-red-700">*</span>
                            <input required
                                type="number"
                                name="branchnum"
                                value={formData.branchnum}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Upload Photo
                            <span className="relative top-0 right-0 text-red-700">*</span>
                        </label>
                        <input
                            type="file" name="photo" accept=".png,.jpg,.jpeg" required
                            className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Upload Aadhar
                            <span className="relative top-0 right-0 text-red-700">*</span>
                        </label>
                        <input
                            type="file" name="aadhar" accept=".pdf" required
                            className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center center">
                <div className="flex justify-between w-full">

                    <div className="w-1/4">
                        <button
                            type="button"
                            onClick={previousPage}
                            className="px-4 py-2 mt-8 text-white bg-black rounded align-center"
                        >
                            Previous
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

const OnlineTenderForm = () => {
    const [formData, setFormData] = useState({
        cname: "",
        cPANnum: "",
        cGSTnum: "",
        des: "",
        vendor: "",
        mobile: "",
        accholdername: "",
        ifscCode: "",
        regno: "",
        knumber: "",
        companyaddress1: "",
        companyaddress2: "",
        companycity: "",
        companystate: "",
        branchnum: "",
        ITRone: "",
        ITRtwo: "",
        ITRthree: "",
        turnover: "",
        workexp: "",
        noofworkers: "",
        directorname: "",
        fname: "",
        iDOB: "",
        pemail: "",
        paadhar: "",
        ppan: "",
        pmobile: "",
        wmobile: "",
        website: "",
        accnumber: "",
        email: "",
        gemreg: "",
        refno: "",
        requestLicense: "",
        companycountry: "",
    });

    const countryData = Country.getAllCountries();
    const countryNames = Object.values(countryData).map((country) => country.name);

    let stateNames = [];
    if (formData.companycountry) {
        const countryCode = countryData.find((country) => country.name === formData.companycountry)?.isoCode;
        const stateData = State.getStatesOfCountry(countryCode);
        stateNames = Array.from(new Set(Object.values(stateData).map((state) => state.name)));
    }

    let cityNames = [];
    if (formData.companycountry) {
        const countryCode = countryData.find((country) => country.name === formData.companycountry)?.isoCode;
        const cityData = City.getCitiesOfCountry(countryCode);
        cityNames = Array.from(new Set(Object.values(cityData).map((city) => city.name)));
    }

    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        fetchLicenses();
    }, []);

    const fetchLicenses = async () => {
        const response = await axios.get("http://localhost:5000/apiTender/options/alloptions?array=licenses");
        setLicenses(response.data[0].licenses);
    }

    const clearInputs = () => {
        setFormData({
            cname: "",
            cPANnum: "",
            cGSTnum: "",
            des: "",
            vendor: "",
            mobile: "",
            accholdername: "",
            ifscCode: "",
            regno: "",
            knumber: "",
            companyaddress1: "",
            companyaddress2: "",
            companycity: "",
            companystate: "",
            branchnum: "",
            ITRone: "",
            ITRtwo: "",
            ITRthree: "",
            turnover: "",
            workexp: "",
            noofworkers: "",
            directorname: "",
            fname: "",
            iDOB: "",
            pemail: "",
            paadhar: "",
            ppan: "",
            pmobile: "",
            wmobile: "",
            website: "",
            accnumber: "",
            email: "",
            gemreg: "",
            refno: "",
            companycountry: "",
            requestLicense: ""
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getAmount = async () => {
        const { data: { price } } = await axios.get("http://localhost:5000/apiTender/formprice/Online%20Tender/price");
        return price;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = await getAmount();
        const token = localStorage.getItem("token");
        const receipt = "Tender filling Online";


        payment(price, receipt)
            .then(async success => {
                console.log('Payment success:', success);
                var requestBody = formData;

                const biddingDocs = requestBody.biddingDocs;
                const rent = requestBody.rent;
                const work = requestBody.work;
                const tenderDocs = requestBody.tenderDocs;

                const biddingDocsUrls = await uploadMultipleFilesToS3(biddingDocs);
                const rentUrls = await uploadMultipleFilesToS3(rent);
                const workUrls = await uploadMultipleFilesToS3(work);
                const tenderDocsUrls = await uploadMultipleFilesToS3(tenderDocs);

                requestBody.biddingDocs = biddingDocsUrls;
                requestBody.rent = rentUrls;
                requestBody.work = workUrls;
                requestBody.tenderDocs = tenderDocsUrls;
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:5000/apiTender/services/tender/online', requestBody, {
                    headers: {
                        'auth': token
                    }
                });
                if (response.data.success) {
                    alert('Submitted');
                    clearInputs();
                } else {
                    alert('Something went wrong. Try again.');
                }
            })
            .catch(error => {
                console.error('Payment error:', error);
                // Handle the error if the payment fails
            });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;

        const updatedFiles = Array.from(files);
        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedFiles,
        }));
    };

    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        setCurrentPage(1);
    };

    const previousPage = () => {
        setCurrentPage(0);
    };


    const stepNames = [
        '0',
        '1',
    ];

    const totalSteps = 2;
    const gaps = totalSteps - 1;
    const progress = Math.round((currentPage / gaps) * 100);

    return (
        <div className="flex items-center justify-center">
            <div className="grid max-w-[1244px] grid-cols-12 gap-16 mt-5">


                <div className="col-span-4 px-2 mt-6 mb-6">
                    {sideNavigationButtons.map(button => (
                        <NavLink to={button.link} >
                            <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold  border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">{button.name}</div>
                        </NavLink>
                    ))}
                </div>
                <div className="col-span-8 px-8 py-8 mx-auto mt-6 mb-6 rounded-lg shadow-lg border-[2px] border-black/20">

                    <ProgressBar
                        percent={progress}
                        filledBackground="linear-gradient(to right, #E97451, #D22B2B)"
                    >
                        {stepNames.map((_, index) => (
                            <Step key={index}>
                                {({ accomplished }) => (
                                    <div className={`step ${accomplished ? 'completed' : null}`} />
                                )}
                            </Step>
                        ))}
                    </ProgressBar>

                    {currentPage === 0 && (
                        <form onSubmit={handleSubmit} className="mt-2">
                            {/* Global Section */}
                            <h2 className="mb-4 text-2xl font-bold text-center ">Online Tender</h2>
                            <p className="font-serif text-sm font-thin text-red-700">
                                Fields marked with an asterisk (*) are mandatory.
                            </p>
                            <div className="p-2 rounded-lg">
                                <div className="flex">
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Company name
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="text"
                                            name="cname"
                                            value={formData.cname}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                    <label className="block mx-1 mb-2 font-semibold basis-1/2">
                                        Registration No.
                                        <input
                                            type="text"
                                            name="regno"
                                            value={formData.regno}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Company PAN
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="text"
                                            name="cPANnum"
                                            value={formData.cPANnum}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Company GST
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="text"
                                            name="cGSTnum"
                                            value={formData.cGSTnum}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Contact No.
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="number"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Email
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        WhatsApp No.
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="number"
                                            name="wmobile"
                                            value={formData.wmobile}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                    <label className="relative block mx-1 mb-2 font-semibold basis-1/2">
                                        Website URL
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="URL"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="p-2 mt-2 rounded-lg ">
                                    <div className="grid grid-cols-2 gap-4">

                                        <label className="block font-semibold">
                                            ITR (Year 1)
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input required
                                                type="number"
                                                name="ITRone"
                                                value={formData.ITRone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                        <label className="block font-semibold">
                                            ITR (Year 2)
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input required
                                                type="number"
                                                name="ITRtwo"
                                                value={formData.ITRtwo}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                        <label className="block font-semibold">
                                            ITR (Year 3)
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input required
                                                type="number"
                                                name="ITRthree"
                                                value={formData.ITRthree}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                        <label className="block font-semibold">
                                            Vendor Code
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input required
                                                type="text"
                                                name="vendor"
                                                value={formData.vendor}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-1.5 mb-1.5">
                                        <label className="block font-semibold">
                                            Company Turnover
                                            <input
                                                type="number"
                                                name="turnover"
                                                value={formData.turnover}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                        <label className="block font-semibold">
                                            No. of workers
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input required
                                                type="number"
                                                name="noofworkers"
                                                value={formData.noofworkers}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <label className="block mx-1 mb-2 font-semibold basis-1/2">
                                            Work Exp.
                                            <input
                                                type="number"
                                                name="workexp"
                                                value={formData.workexp}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                        <label className="block mx-1 mb-2 font-semibold basis-1/2">
                                            Gem Reg No.
                                            <input
                                                type="number"
                                                name="gemreg"
                                                value={formData.gemreg}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                            />
                                        </label>
                                    </div>
                                    <label className="block mb-2 font-semibold">
                                        Address Line 1
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input
                                            required
                                            type="text"
                                            name="companyaddress1"
                                            value={formData.companyaddress1}
                                            onChange={handleChange}
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
                                            value={formData.companyaddress2}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>

                                    <label className="block mb-2 font-semibold">
                                        Country
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <select required
                                            name="companycountry"
                                            value={formData.companycountry}
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
                                    <div className="flex">
                                        <label className="block mb-2 font-semibold basis-1/2">
                                            State
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <select
                                                required
                                                name="companystate"
                                                value={formData.companystate}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            >
                                                <option value="">Select State</option>
                                                {stateNames.map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="block mx-1 mb-2 font-semibold basis-1/2">
                                            City
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <select
                                                required
                                                name="companycity"
                                                value={formData.companycity}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
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

                                {/* tenderDetail Section */}
                                <div className="p-2 mt-2 rounded-lg">
                                    <label className="block mb-2 font-semibold">
                                        Reference No.
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input required
                                            type="number"
                                            name="refno"
                                            value={formData.refno}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"

                                        />
                                    </label>
                                    <label className="block mb-2 font-semibold">
                                        Others
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input required
                                            type="description"
                                            name="des"
                                            value={formData.des}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        />
                                    </label>
                                    <label className="block mb-2 font-semibold">
                                        K number
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <input required
                                            type="description"
                                            name="knumber"
                                            value={formData.knumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                        />
                                    </label>

                                    <div>

                                        <div>
                                            <label className="block mb-2 font-semibold">
                                                Rent Agreements
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="rent"
                                                accept=".pdf"
                                                required
                                                onChange={handleFileChange}
                                                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold">
                                                Old Work Sample
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="work"
                                                accept=".pdf"
                                                required
                                                onChange={handleFileChange}
                                                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold">
                                                Bidding Documents
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                multiple
                                                name="biddingDocs"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold">
                                                Tender Docs with Stamps
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                multiple
                                                name="tenderDocs"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-red-900 focus:ring-red-900 dark:bg-red-100 dark:border-red-700 dark:text-black file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-red-700 dark:file:text-white"
                                            />
                                        </div>

                                        <div>
                                            <div className="my-3 font-semibold dropdown">
                                                Required Licenses
                                                <select
                                                    name="requestLicense"
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    required
                                                    value={formData.requestLicense}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    {licenses.map((license) => (
                                                        <option key={license} value={license}>
                                                            {license}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={nextPage}
                                className="px-4 py-2 mt-8 text-white bg-black rounded"
                            >
                                Next
                            </button>
                        </form>
                    )}

                    {currentPage === 1 && (
                        <form onSubmit={handleSubmit}>
                            <SecondPage
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

export default OnlineTenderForm;
