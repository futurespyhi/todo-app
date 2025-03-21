const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load .env
dotenv.config();


//Create Express app
const app = express();

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Export Express app
module.exports = app