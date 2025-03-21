const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// User Registration
router.post(
  '/register',
  [
    // Validate input
    body('username').notEmpty().withMessage('Username cannot be empty'),
    body('email').isEmail().withMessage('Incorrect email format'),
    body('password').isLength({ min: 6 }).withMessage('The password must be at least 6 characters'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user already exists
      const { username, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // create new users
      user = new User({ username, email, password });

      // save user
      await user.save();

      // generate JWT
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// User login
router.post(
  '/login',
  [
    // Validate the input
    body('email').isEmail().withMessage('Incorrect email format'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user exists
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      //debugging
      console.log('Input Password:', password);
      console.log('Stored Password:', user.password);

      // Verify user's password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Is Match:', isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      


      // Generate JWT
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;