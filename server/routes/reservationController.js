const db = require('../db');

const createReservation = (req, res) => {
  const { name, contact, email, date, time, partySize } = req.body;

  const sql = `INSERT INTO reservations (name, contact, email, date, time, party_size)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, contact, email, date, time, partySize], (err, result) => {
    if (err) {
      console.error('❌ Failed to insert:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: '✅ Reservation saved successfully' });
  });
};

module.exports = { createReservation };
