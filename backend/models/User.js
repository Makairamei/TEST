const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  lastLogin: { type: Date },
  activeDevices: { type: Number, default: 0 },
  loginLocation: { type: String }
});

module.exports = mongoose.model('User', userSchema);
