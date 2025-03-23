const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); // load task management routes

// load .env
dotenv.config();


// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parsing JSON request body
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Loading Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Use task management routing

// Detailed CORS configuration 
app.use(cors({
    origin: 'http://localhost:3000', // allowed frontend source
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP method
    allowedHeaders: ['Content-Type', 'x-auth-token'] // Allowed request headers
  }));
// Export Express app
module.exports = app