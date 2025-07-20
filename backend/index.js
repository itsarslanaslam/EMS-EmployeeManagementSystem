// Import required packages
const express = require('express');      // Web framework for building APIs
const mongoose = require('mongoose');    // MongoDB ODM (Object Data Modeling)
const cors = require('cors');            // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Initialize express app
const app = express();

// Enable CORS so frontend (e.g., React) can call backend API without issues
app.use(cors());

// Parse incoming JSON requests automatically
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeMS', {
  useNewUrlParser: true,      // Use new MongoDB URL string parser
  useUnifiedTopology: true,   // Use new Server Discover and Monitoring engine
});

// Handle MongoDB connection events
const db = mongoose.connection;

// If there’s an error connecting, log it
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// When connected successfully
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Load routes for authentication (Signup/Login)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // All auth-related routes will start with /api/auth

// Test route to check if API is running
app.get('/api', (req, res) => {
  res.send('🎉 API is running');
});

// Start the server on port 5000 or environment PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
