const mongoose = require("mongoose");
const userModel = require("../../userModel");

const companyCertificationModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        cinReg: {
            type: String
        },
        companyName: {
            type: String
        },
        companyProfile: {
            type: String
        },
        contactNumber: {
            type: Number
        },
        contractPName: {
            type: String
        },
        email: {
            type: String
        },
        gst: {
            type: String
        },
        pan: {
            type: String
        },
        requestLicense: {
            type: String
        },
        selectedPositions: {
            type: String
        },
        website: {
            type: String
        },
        workingField: {
            type: String
        },
        docUrl: {
            type: String
        },
        panUrl: {
            type: String
        },
        gstUrl: {
            type: String
        },
        others: {
            type: String
        }
    },
    { timestamps: true }
);

<<<<<<< HEAD
const CompanyForm = mongoose.model("Company-Certification-Form", companyCertificationModelSchema);
=======
const CompanyForm = mongoose.model("Company-Certification", companyCertificationModelSchema);
>>>>>>> 714f0838f679a43e8a3b4d00afb4f47ee5a74a3c

module.exports = CompanyForm;
