const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Middleware sederhana untuk autentikasi (bisa dikembangkan)
const authMiddleware = (req, res, next) => {
  // Implementasi JWT verify di sini (untuk contoh dilewati)
  next();
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
