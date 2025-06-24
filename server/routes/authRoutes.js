const express = require('express');
const router = express.Router();

// For demo: static admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12345';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
