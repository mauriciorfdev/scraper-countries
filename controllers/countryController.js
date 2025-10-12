const { default: mongoose } = require('mongoose');
const { CountryModel } = require('../models/countryModel');
const { scrapeSite } = require('../scraper');

//DESC      get all countries
//ROUTE     GET /api/countries
async function getCountries(req, res) {
  try {
    const countries = await CountryModel.find();
    return res.status(200).json(countries);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
}

//DESC      get country by id
//ROUTE     GET /api/countries/:id
async function getSingleCountry(req, res) {
  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ msg: 'Invalid Country ID' });
  }

  try {
    const country = await CountryModel.findById(id);
    if (!country) {
      return res.status(404).json({ msg: 'Country not found' });
    }
    //valid id
    return res.status(200).json({ country });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
}

//DESC      add a new country
//ROUTE     POST /api/countries
async function setCountry(req, res) {
  try {
    console.log(req.body);
    const { name, capital } = req.body;
    if (!name || !capital) {
      return res.status(400).json({ msg: 'Name or Email not found or empty' });
    }
    const newCountry = new CountryModel({ name, capital });
    const insertedCountry = await newCountry.save();
    return res.status(201).json({ inserted: insertedCountry });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
}

//DESC      scrape countries and save them into DB
//ROUTE     POST /scrape
async function setScrapedCountries(req, res) {
  try {
    const results = await scrapeSite();
    /* console.log(results); */
    await CountryModel.insertMany(results);
    return res.status(201).json({ success: true, inserted: results.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

//DESC      delete all countries from DB
//ROUTE     DELETE /clear
async function clearDB(req, res) {
  try {
    await CountryModel.deleteMany({});
    return res
      .status(200)
      .json({ success: true, msg: `Countries collection deleted!` });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  getCountries,
  getSingleCountry,
  setCountry,
  setScrapedCountries,
  clearDB,
};
