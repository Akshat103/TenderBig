const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
    directorName: { type: String, required: true },
    directorAadhar: { type: String, required: true },
    directorPan: { type: String, required: true },
    directorDob: { type: String, required: true },
    directorFatherName: { type: String, required: true },
    uploads: [{ type: mongoose.Schema.Types.Mixed }],
});

const companyUploadsSchema = new mongoose.Schema({
    cinUpload: [{ type: String }],
    gstUpload: [{ type: String }],
    panUpload: [{ type: String }],
});

const jointventureSchema = new mongoose.Schema(
    {
        userId: String,
        cin: { type: String, required: true },
        city: { type: String, required: true },
        companyAddress: { type: String, required: true },
        companyContactNo: { type: String, required: true },
        companyEmail: { type: String, required: true },
        companyName: { type: String, required: true },
        companyProfile: { type: String, required: true },
        companyRegNo: { type: String, required: true },
        companyUploads: { type: companyUploadsSchema },
        country: { type: String, required: true },
        directors: [directorSchema],
        endDate: { type: String, required: true },
        gst: { type: String, required: true },
        otherDescription: { type: String, required: true },
        pan: { type: String, required: true },
        partnershipProjectTender: { type: String, required: true },
        partnershipRatio: { type: String, required: true },
        projectTenderName: { type: String, required: true },
        requirement: {
            manpower: { type: String },
            finance: { type: String },
        },
        startDate: { type: String, required: true },
        state: { type: String, required: true },
        tenderName: { type: String, required: true },
        volume: { type: String, required: true },
        website: { type: String, required: true },
        workRatio: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    { timestamps: true }
);

const jointventureForm = mongoose.model('Joint-Venture-Form', jointventureSchema);

module.exports = jointventureForm;
