const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const {
  getCountries,
  getSingleCountry,
  setCountry,
  setScrapedCountries,
  clearDB,
} = require('./controllers/countryController');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();

//Body Parser Middleware
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  console.log('GET ROUTE!');
  res.send();
});

app.get('/api/countries', getCountries);
app.get('/api/countries/:id', getSingleCountry);
app.post('/api/countries', setCountry);
app.post('/scrape', setScrapedCountries);
app.delete('/clear', clearDB);

connectDB();

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT} !`);
});
