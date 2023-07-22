const mongoose = require("mongoose");

const tenderResultSchema = new mongoose.Schema(
  {
    TenderId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      set: (value) => {
        // Convert to sentence case
        if (typeof value !== 'string' || value.length === 0) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    country: {
      type: String,
      required: true,
      set: (value) => {
        // Convert to sentence case
        if (typeof value !== 'string' || value.length === 0) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    state: {
      type: String,
      required: true,
      set: (value) => {
        // Convert to sentence case
        if (typeof value !== 'string' || value.length === 0) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    BRR: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
    },
    Authority: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    deadline: {
      type: Date,
      required: true,
    },
    TendorNo: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
    },
    description: {
      type: String,
      required: false,
      set: (value) => {
        // Convert to sentence case
        if (typeof value !== 'string' || value.length === 0) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    userCategory: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    tenderValue: {
      type: String,
      required: true,
    },
    contractValue: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Tender-Result", tenderResultSchema);
