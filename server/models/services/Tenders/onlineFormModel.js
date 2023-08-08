const mongoose = require('mongoose');
const userModel = require('../../userModel');

const TenderOnline = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'userModel'
    },
    cname: String,
    cPANnum: String,
    cGSTnum: String,
    des: String,
    vendor: String,
    mobile: String,
    accholdername: String,
    ifscCode: String,
    regno: String,
    knumber: String,
    companyaddress1: String,
    companyaddress2: String,
    companycity: String,
    companystate: String,
    country: String,
    branchnum: String,
    ITRone: String,
    ITRtwo: String,
    ITRthree: String,
    turnover: String,
    workexp: String,
    noofworkers: String,
    directorname: String,
    fname: String,
    iDOB: String,
    pemail: String,
    paadhar: String,
    ppan: String,
    pmobile: String,
    wmobile: String,
    website: String,
    accnumber: String,
    email: String,
    gemreg: String,
    refno: String,
    requestLicense: String,
    companycountry: String,
    rent: [String],
    work: [String],
    biddingDocs: [String],
    tenderDocs: [String],
    purchaserAadhar: String,
    purchaserPhoto: String
},
    { timestamps: true });

const TenderOnlineModel = mongoose.model('TenderOnline-Form', TenderOnline);

module.exports = TenderOnlineModel;
