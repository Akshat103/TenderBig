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
        set: (value) => {
            // Convert to sentence case
            if (typeof value !== 'string' || value.length === 0) return value;
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        },
    },
    company: {
        type: String,
        required: true,
        set: (value) => {
            // Convert to sentence case
            if (typeof value !== 'string' || value.length === 0) return value;
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        },
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
},
    { timestamps: true });

const ContactForm = mongoose.model("Contact-Form", contactFormSchema);

module.exports = ContactForm;
