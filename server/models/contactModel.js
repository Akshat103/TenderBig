const mongoose = require("mongoose");
const userModel = require("./userModel");

const contactFormSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: userModel
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    selectedService: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true });

const ContactForm = mongoose.model("Contact-Form", contactFormSchema);

module.exports = ContactForm;
