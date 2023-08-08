const mongoose = require("mongoose");
const userModel = require("../../userModel");

const gemregistrationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        contact: {
            type: Number
        },
        aadhar: {
            type: Number
        },
        companyName: {
            type: String
        },
        panNumber: {
            type: String
        },
        websiteAddress: {
            type: String
        },
        gst: {
            type: String
        },
        startDate: {
            type: Date
        },
        address: {
            type: String
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        zip: {
            type: Number
        }
    },
    { timestamps: true }
);

<<<<<<< HEAD
const gemregistrationForm = mongoose.model("Gem-Registration-Form", gemregistrationSchema);
=======
const gemregistrationForm = mongoose.model("Gem-Registration", gemregistrationSchema);
>>>>>>> 714f0838f679a43e8a3b4d00afb4f47ee5a74a3c

module.exports = gemregistrationForm;
