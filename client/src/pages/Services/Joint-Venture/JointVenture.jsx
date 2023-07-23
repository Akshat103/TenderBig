import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import Step1 from "./Steps/CompanyDetails";
import Step2 from "./Steps/CompanyUploads";
import Step3 from "./Steps/PersonalDetails";
import Step4 from "./Steps/Partnership";
import axios from "axios";
import uploadFileToS3 from "../../../pages/file-uploading/FileUpload";
import payment from "../../../components/payment";
import { NavLink } from "react-router-dom";
import { sideNavigationButtons } from "../../../components/Forms";

const JointVenture = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const gaps = totalSteps - 1;
  const progress = Math.round((currentStep / gaps) * 100);
  const [formData, setFormData] = useState({
    // 1. Company Details
    projectTenderName: "",
    companyName: "",
    pan: "",
    gst: "",
    website: "",
    workRatio: "",
    companyEmail: "",
    companyContactNo: "",
    cin: "",
    companyRegNo: "",
    companyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    tenderName: "",
    // 2. Company Uploads
    companyUploads: [],
    // 3. Personal Details
    directors: [
      {
        directorName: "",
        directorAadhar: "",
        directorPan: "",
        directorDob: "",
        directorFatherName: "",
        companyPost: "",
        email: "",
        contactNumber: "",
        uploads: [],
      },
    ],
    // Partnership
    companyProfile: "",
    partnershipProjectTender: "",
    requirement: {
      finance: "",
      manPower: "",
    },
    partnershipRatio: "",
    startDate: "",
    endDate: "",
    volume: "",
    workerExperience: "",
    otherDescription: "",
  });

  const stepNames = [
    "Company Details",
    "Company Uploads",
    "Personal Details",
    "Partnership",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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

  const uploadFilesForDirectors = async (directors) => {
    const updatedDirectors = await Promise.all(
      directors.map(async (director) => {
        const uploads = await Promise.all(
          Object.entries(director.uploads).map(async ([fieldName, file]) => {
            console.log(fieldName, file)
            if(fieldName=="photo") {
              const fileUrl = await uploadFileToS3(file,"image");
              return { [fieldName]: { name: file.name, url: fileUrl } };
            }
            else{
              const fileUrl = await uploadFileToS3(file,"pdf");
              return { [fieldName]: { name: file.name, url: fileUrl } };
            }
          })
        );

        return {
          ...director,
          uploads,
        };
      })
    );

    return updatedDirectors;
  };

  const resetForm = () => {
    // Reset form data and current step
    setFormData({
      // 1. Company Details
      projectTenderName: "",
      companyName: "",
      pan: "",
      gst: "",
      website: "",
      workRatio: "",
      companyEmail: "",
      companyContactNo: "",
      cin: "",
      companyRegNo: "",
      companyAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      tenderName: "",
      // 2. Company Uploads
      companyUploads: [],
      // 3. Personal Details
      directors: [
        {
          directorName: "",
          directorAadhar: "",
          directorPan: "",
          directorDob: "",
          directorFatherName: "",
          companyPost: "",
          email: "",
          contactNumber: "",
          uploads: [],
        },
      ],
      // Partnership
      companyProfile: "",
      partnershipProjectTender: "",
      requirement: {
        finance: "",
        manPower: "",
      },
      partnershipRatio: "",
      startDate: "",
      endDate: "",
      volume: "",
      workerExperience: "",
      otherDescription: "",
    });
    setCurrentStep(0);
  };

  const getAmount = async () => {
    const {
      data: { price },
    } = await axios.get(
      "http://localhost:5000/apitender/formprice/Joint%20Venture/price"
    );
    return price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = await getAmount();
    const receipt = "Joint Venture";
    payment(price, receipt)
      .then(async (success) => {
        console.log("Payment success:", success);
        let requestBody = formData;

        requestBody.companyUploads.cinUpload[0] = await uploadFileToS3(
          requestBody.companyUploads.cinUpload[0], "pdf"
        );
        requestBody.companyUploads.gstUpload[0] = await uploadFileToS3(
          requestBody.companyUploads.gstUpload[0], "pdf"
        );
        requestBody.companyUploads.panUpload[0] = await uploadFileToS3(
          requestBody.companyUploads.panUpload[0], "pdf"
        );

        const updatedDirectors = await uploadFilesForDirectors(
          requestBody.directors
        );
        requestBody.directors = updatedDirectors;
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/apitender/services/jv/submitjv",
          requestBody,
          {
            headers: {
              auth: token,
            },
          }
        );
        if (response.data.success) {
          alert("Submitted");
          resetForm();
        } else {
          alert("Something went wrong. Try again.");
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        // Handle the error if the payment fails
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid max-w-[1244px] md:grid-cols-12 md:gap-16 mt-5">
        <div className="col-span-4 px-2 mt-6 mb-6 hidden md:block">
          {sideNavigationButtons.map((button) => (
            <NavLink to={button.link} key={button.link}>
              <div className="w-full px-8 py-3 mb-5 text-[18px] text-center text-black font-bold border-black border-[1px] hover:bg-black hover:text-white linear duration-300 shadow-md rounded cursor-pointer bg-white">
                {button.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="col-span-8 px-2 md:px-8 py-4 md:py-8 mx-auto mt-6 mb-6 rounded-lg shadow-lg border-[2px] border-black/20">
          <div className="m-1 md:m-10">
            <ProgressBar
              percent={progress}
              filledBackground="linear-gradient(to right, #E97451, #D22B2B)"
            >
              {stepNames.map((_, index) => (
                <Step key={index}>
                  {({ accomplished }) => (
                    <div className={`step ${accomplished ? "completed" : null}`} />
                  )}
                </Step>
              ))}
            </ProgressBar>
            <h2 className="mt-4 mb-4 text-2xl font-bold text-center">Joint Venture</h2>
            <p className="font-serif text-sm font-thin text-red-700">
              Fields marked with an asterisk (*) are mandatory.
            </p>
            <form onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <Step1
                  formData={formData}
                  handleChange={handleChange}
                  handleNext={handleNext}
                />
              )}
              {currentStep === 1 && (
                <Step2
                  formData={formData}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  handleFileChange={handleFileChange}
                />
              )}
              {currentStep === 2 && (
                <Step3
                  formData={formData}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 3 && (
                <Step4
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handlePrevious={handlePrevious}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JointVenture;