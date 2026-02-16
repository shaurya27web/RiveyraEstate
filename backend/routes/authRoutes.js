const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register route working' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login route working' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Get user profile route working' });
});

module.exports = router;