const mongoose = require('mongoose');

const formPrice = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Price = mongoose.model('Form-Prices', formPrice);

module.exports = Price;
