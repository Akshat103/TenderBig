const mongoose = require('mongoose');
const { sentenceCase } = require('../../../config/functions');

// Define the schema for the director details
const directorSchema = new mongoose.Schema({
  directorName: {
    type: String,
    set: sentenceCase
  },
  directorAadhar: {
    type: Number,
  },
  directorPan: {
    type: String,
    set: (value) => value.toUpperCase()
  },
  directorDob: {
    type: Date,
  },
  directorFatherName: {
    type: String,
    set: sentenceCase
  },
});

// Define the schema for the form data
const auctionmaterialsModelSchema = new mongoose.Schema({
  userId: String,
  tenderNumber: {
    type: String,
    set: (value) => value.toUpperCase()
  },
  tenderLink: String,
  companyName: {
    type: String,
    set: sentenceCase
  },
  cinReg: {
    type: String,
    set: (value) => value.toUpperCase()
  },
  gst: String,
  pan: String,
  workExperience: [
    {
      workExperience: [String],
      workOrderSamples: [String],
      workProfiles: [String],
    },
  ],
  directors: [directorSchema],
  address: String,
  country: String,
  state: String,
  city: String,
  zipCode: String,
  website: String,
  projectMailId: String,
  contactPersonName: String,
  contactPersonNumber: String,
  auctionMaterial: [String],
  otherDescription: String,
},
  { timestamps: true });

// Create the FormData model
const AuctionMaterialForm = mongoose.model('auction-material-form', auctionmaterialsModelSchema);

module.exports = AuctionMaterialForm;
