const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Contact form submission route working' });
});

module.exports = router;