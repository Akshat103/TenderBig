const mongoose = require("mongoose");
const userModel = require("../../userModel");


const seekerModelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'userModel'
        },
        name: String,
        fathername: String,
        aadhar: String,
        tenMarkType: String,
        tenMark: String,
        twelveMarkType: String,
        twelveMark: String,
        jobpost: String,
        jobexp: String,
        address: String,
        company: String,
        city: String,
        state: String,
        country: String,
        mobile: String,
        email: String,
        zip: String,
        pastSalary: String,
        expectedSalary: String,
        hobbies: String,
        pan: String,
        resumeUrl: {
            type: String
        },
        photoUrl: {
            type: String
        },
        aadharUrl: {
            type: String
        }
    },
    { timestamps: true }
);

const SeekerForm = mongoose.model("Seeker-Form", seekerModelSchema);

module.exports = SeekerForm;
