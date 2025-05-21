const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cookie: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('App', AppSchema);

