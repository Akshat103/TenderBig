const mongoose = require("mongoose");
const userModel = require("../../userModel");

const offlineTenderModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel',
        },
        name: {
            type: String
        },
        userId: {
            type: String
        },
        company: {
            type: String
        },
        mobile: {
            type: Number
        },
        email: {
            type: String
        },
        aadhar: {
            type: String
        },
        role: {
            type: String
        }
    },
    { timestamps: true }
);

const TenderOfflineForm = mongoose.model("Tender-Offline-Form", offlineTenderModelSchema);

module.exports = TenderOfflineForm;
