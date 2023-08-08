const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionsModelSchema = new Schema({
  sectors: [{
    type: String,
    required: true
  }],
  products: [{
    type: String,
    required: true
  }],
  departments: [{
    type: String,
    required: true
  }],
  categories: [{
    type: String,
    required: true
  }],
  licenses: [{
    type: String,
    required: true
  }],
  AuctionMaterials: [{
    type: String,
    required: true
  }]
},
  { timestamps: true });

const optionsModel = mongoose.model('Options', optionsModelSchema);

module.exports = optionsModel;
