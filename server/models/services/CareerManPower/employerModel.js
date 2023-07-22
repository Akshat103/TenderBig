const mongoose = require("mongoose");
const userModel = require("../../userModel");

const employerModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        company: {
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        cwork: {
            type: String
        },
        jobpost: {
            type: String
        },
        experience: {
            type: String
        },
        salary: {
            type: String
        },
        curl: {
            type: String
        },
        GST: {
            type: String
        },
        companyprofile: {
            type: String
        },
        contactpnumber: {
            type: String
        },
        regno: {
            type: String
        },
        PAN: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        zipcode: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        officetiming: {
            type: String
        },
        holidays: {
            type: String
        },
        workingdays: {
            type: String
        },
        seekerpost: {
            type: String
        },
        resumeUrl: {
            type: String
        },
        otherUrl: {
            type: String
        },
    },
    { timestamps: true }
);

const EmployerForm = mongoose.model("Employer-Form", employerModelSchema);

module.exports = EmployerForm;
