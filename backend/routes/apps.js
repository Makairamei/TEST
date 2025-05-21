const express = require('express');
const App = require('../models/App');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newApp = new App(req.body);
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
