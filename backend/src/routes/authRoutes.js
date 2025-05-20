const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');
const authMiddleware = require('../../middleware/auth.js')

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user); // User data from JWT
});

module.exports = router;