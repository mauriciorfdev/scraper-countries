const mongoose = require('mongoose');

const connString = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(connString, {});
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
