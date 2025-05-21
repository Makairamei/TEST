const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  ip: String,
  device: String,
  time: { type: Date, default: Date.now },
  action: String
});

module.exports = mongoose.model('Log', LogSchema);

