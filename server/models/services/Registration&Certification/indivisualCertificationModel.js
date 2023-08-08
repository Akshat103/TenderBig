const mongoose = require("mongoose");
const userModel = require("../../userModel");

const individualCertificationModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        name: String,
        fatherName: String,
        dob: String,
        aadharNumber: String,
        panNumber: String,
        workingField: String,
        companyaddress1: String,
        companyaddress2: String,
        companycity: String,
        companystate: String,
        zipcode: String,
        companycountry: String,
        others: String,
        mobileNumber: String,
        email: String,
        requestLicense: String,
        photoUrl: String,
        aadharUrl: String,
        panUrl: String,
        signatureUrl: String
    },
    { timestamps: true }
);

const IndividualForm = mongoose.model("Individual-Certification-Form", individualCertificationModelSchema);

module.exports = IndividualForm;
