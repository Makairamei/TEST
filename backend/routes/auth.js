const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Password salah' });

  if (user.activeSessions >= 3) {
    return res.status(403).json({ message: 'Maksimal login device tercapai' });
  }

  user.activeSessions += 1;
  await user.save();

  const token = jwt.sign({
    id: user._id,
    username: user.username,
    role: user.role
  }, process.env.JWT_SECRET, { expiresIn: '8h' });

  await Log.create({
    userId: user._id,
    username: user.username,
    ip: req.ip,
    device: req.headers['user-agent'],
    action: 'login'
  });

  res.json({ token, user: { username: user.username, role: user.role } });
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'Username sudah terdaftar' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, passwordHash, role });
  await user.save();
  res.status(201).json({ message: 'User berhasil dibuat' });
});

module.exports = router;
