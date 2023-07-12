const mongoose = require("mongoose");

const tenderResultModel = new mongoose.Schema(
    {
        TenderId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        BRR: {
            type: String,
            required: true,
        },
        Authority: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required: true
        },
        TendorNo: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        userCategory: {
            type: String,
            required: true
        },
        tenderValue: {
            type: String,
            required: true
        },
        contractValue: {
            type: String,
            required: true
        }
    }

);

module.exports = mongoose.model("tenderResult", tenderResultModel);