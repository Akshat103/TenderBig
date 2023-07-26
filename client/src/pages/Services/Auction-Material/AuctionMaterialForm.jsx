import React, { useEffect, useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import Step1 from './Steps/TenderDetails';
import Step2 from './Steps/WorkExperience';
import Step3 from './Steps/DirectorDetails';
import Step4 from './Steps/CompanyInfo';
import Step5 from './Steps/AuctionMaterial';
import axios from 'axios';
import uploadFileToS3 from '../../../pages/file-uploading/FileUpload';
import payment from '../../../components/payment';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const uploadMultipleFilesToS3 = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const result = await uploadFileToS3(file,"pdf");
    return result;
  });

  const results = await Promise.all(uploadPromises);
  return results;
};

const AuctionMaterialForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [auctionMaterials, setAuctionMaterials] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);
  const token = localStorage.getItem('token');

  const headers = {
        'auth': token
      };

  useEffect(() => {
    fetchAuctionMaterial();
  }, []);

  const fetchAuctionMaterial = async () => {
    const response = await axios.get(
      `${BASE_URL}/options/alloptions?array=AuctionMaterials`, { headers }
    );
    setAuctionMaterials(response.data[0].AuctionMaterials);
  };

  const totalSteps = 5;
  const gaps = totalSteps - 1;
  const progress = Math.round((currentStep / gaps) * 100);
  const [formData, setFormData] = useState({
    // 1. Tender Details
    tenderNumber: '',
    tenderLink: '',
    companyName: '',
    cinReg: '',
    gst: '',
    pan: '',
    // 2. Work Experience
    workExperience: [],
    // 3. Director Details
    directors: [
      {
        directorName: '',
        directorAadhar: '',
        directorPan: '',
        directorDob: '',
        directorFatherName: '',
      },
    ],
    // Company Information
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    website: '',
    projectMailId: '',
    contactPersonName: '',
    contactPersonNumber: '',
    // Auction Material
    auctionMaterial: [],
    otherDescription: '',
  });

  const stepNames = [
    'Tender Details',
    'Work Experience',
    'Director Details',
    'Company Information',
    'Auction Material',
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Clear form errors when a field value changes
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const handleNext = () => {

    setCurrentStep((prevStep) => prevStep + 1);

  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const updatedFiles = Array.from(files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedFiles,
    }));
  };

  const resetForm = () => {
    setFormData({
      tenderNumber: '',
      tenderLink: '',
      companyName: '',
      cinReg: '',
      gst: '',
      pan: '',
      workExperience: [],
      directors: [
        {
          directorName: '',
          directorAadhar: '',
          directorPan: '',
          directorDob: '',
          directorFatherName: '',
        },
      ],
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      website: '',
      projectMailId: '',
      contactPersonName: '',
      contactPersonNumber: '',
      auctionMaterial: [],
      otherDescription: '',
    });
    setCurrentStep(0);
    setFormErrors({});
    setIsFormIncomplete(false);
  };

  const getAmount = async () => {
    const {
      data: { price },
    } = await axios.get(
      `${BASE_URL}/formprice/Auction%20Material/price`, { headers }
    );
    return price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = await getAmount();
    const receipt = 'Auction Material';
    payment(price, receipt)
      .then(async (success) => {
        console.log('Payment success:', success);
        var requestBody = formData;

        const workExperienceFiles = requestBody.workExperience.workExperience;
        const workOrderSamplesFiles = requestBody.workExperience.workOrderSamples;
        const workProfilesFiles = requestBody.workExperience.workProfiles;

        const workExperienceUrls = await uploadMultipleFilesToS3(workExperienceFiles);
        const workOrderSamplesUrls = await uploadMultipleFilesToS3(workOrderSamplesFiles);
        const workProfilesUrls = await uploadMultipleFilesToS3(workProfilesFiles);

        requestBody.workExperience.workExperience = workExperienceUrls;
        requestBody.workExperience.workOrderSamples = workOrderSamplesUrls;
        requestBody.workExperience.workProfiles = workProfilesUrls;

        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${BASE_URL}/services/aumt/auction-material`,
          requestBody,
          {
            headers: {
              auth: token,
            },
          }
        );
        if (response.data.success) {
          alert('Submitted');
          resetForm();
        } else {
          alert('Something went wrong. Try again.');
        }
      })
      .catch((error) => {
        console.error('Payment error:', error);
        // Handle the error if the payment fails
      });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row max-w-[1244px] px-4 py-8 mx-auto mt-6 mb-6 border-2 border-gray-900 rounded-md">
        <img
          src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1687066253~exp=1687066853~hmac=42f23f007ad72bd2ca440a69684ce6508082c1182b3c54179addffc4163960af"
          className=" md:w-1/2"
          alt="Contact illustration"
        />
        <div className="m-10">
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

          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <Step1
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleNext={handleNext}
              />
            )}

            {currentStep === 1 && (
              <Step2
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFileChange={handleFileChange}
              />
            )}

            {currentStep === 2 && (
              <Step3
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                setFormData={setFormData}
              />
            )}

            {currentStep === 3 && (
              <Step4
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            )}

            {currentStep === 4 && (
              <Step5
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handlePrevious={handlePrevious}
                auctionMaterials={auctionMaterials}
              />
            )}

            {/* {isFormIncomplete && (
              <p className="text-red-500">Please fill in all the required fields.</p>
            )} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default AuctionMaterialForm;