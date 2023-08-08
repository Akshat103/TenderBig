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

const CompanyForm = mongoose.model("Company-Certification-Form", companyCertificationModelSchema);

module.exports = CompanyForm;
