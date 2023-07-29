const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    pnr: {
        type: String,
        required: true,
        set: (value) => value.toUpperCase(),
    },
    companyname: {
        type: String,
        required: true,
        set: (value) => {
            // Convert to sentence case
            if (typeof value !== 'string' || value.length === 0) return value;
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          },
    },
    detail: {
        type: String,
        required: true,
        set: (value) => {
            // Convert to sentence case
            if (typeof value !== 'string' || value.length === 0) return value;
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          },
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
