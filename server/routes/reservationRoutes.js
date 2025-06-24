const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/reservations
router.post('/', (req, res) => {
  const { name, contact, email, date, time, partysize } = req.body;

  console.log('📥 Incoming reservation:', req.body);

  if (!name || !contact || !email || !date || !time || !partysize) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO reservations (name, contact, email, date, time, partysize) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, contact, email, date, time, partysize];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Database error:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ message: '✅ Reservation saved successfully' });
  });
});

// ✅ GET /api/reservations – for admin to view orders
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM reservations';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching reservations:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
