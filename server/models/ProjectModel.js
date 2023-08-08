const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    pnr: {
        type: String,
    },
    companyname: {
        type: String,
    },
    detail: {
        type: String,
    },
    value: {
        type: Number,
    },
    status: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    sector: {
        type: String,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
