const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); // load task management routes

// load .env
dotenv.config();


// Create Express app
const app = express();

// Parsing JSON request body
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Loading Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Use task management routing

// Export Express app
module.exports = app