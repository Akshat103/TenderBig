const mongoose = require("mongoose");
const userModel = require("../../userModel");

const registrationModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        company: String,
        mobile: String,
        secMobile: String,
        email: String,
        cwebsite: String,
        CIN: String,
        wmobile: String,
        cprofile: String,
        companyEstd: String,
        otherDetails: String,
        companypost: String,
        liscence: String,
        cpname: String,
        category: String,
        fname: String,
        GST: String,
        PAN: String,
        address: String,
        companycountry: String,
        companycity: String,
        companystate: String,
        regUrl: String,
        gstUrl: String,
        panUrl: String,
    },
    { timestamps: true }
);

const RegistrationForm = mongoose.model("Registration-Form", registrationModelSchema);

module.exports = RegistrationForm;
