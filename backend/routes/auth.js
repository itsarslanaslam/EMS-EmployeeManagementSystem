const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Get all employees route
router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ name, email, password: hashedPassword, role: role || 'employee' });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router; 