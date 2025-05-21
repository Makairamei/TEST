const express = require('express');
const App = require('../models/App');
const { authMiddleware, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const apps = await App.find();
  res.json(apps);
});

router.post('/', authMiddleware, isAdmin, async (req, res) => {
  const { name, cookie } = req.body;
  const app = new App({ name, cookie });
  await app.save();
  res.status(201).json(app);
});

router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, cookie } = req.body;
  const app = await App.findByIdAndUpdate(id, { name, cookie }, { new: true });
  if (!app) return res.status(404).json({ message: 'Aplikasi tidak ditemukan' });
  res.json(app);
});

router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  const { id } = req.params;
  await App.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;
