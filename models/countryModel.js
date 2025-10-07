const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
  },
});

const CountryModel = mongoose.model('Country', CountrySchema);

module.exports = { CountryModel };
