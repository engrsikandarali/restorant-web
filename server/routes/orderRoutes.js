const express = require('express');
const router = express.Router();
const db = require('../db'); // Use your existing MySQL connection

// POST /api/orders – Save a new order
router.post('/', (req, res) => {
  console.log("📥 API /api/orders POST called");
  const { name, contact, address, items, total } = req.body;

  console.log('📦 Incoming Order:', req.body);

  // Basic validation
  if (!name || !contact || !address || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'All fields are required with at least one item.' });
  }

  // Step 1: Insert into main orders table
  const orderSql = `INSERT INTO orders (name, contact, address, total) VALUES (?, ?, ?, ?)`;
  const orderValues = [name, contact, address, total];

  db.query(orderSql, orderValues, (err, result) => {
    if (err) {
      console.error('❌ Failed to insert order:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Server error while saving order.' });
    }

    const orderId = result.insertId; // Get auto-generated order ID

    // Step 2: Insert all order items
    const itemSql = `INSERT INTO order_items (order_id, item_name, qty, unit_price, subtotal) VALUES ?`;
    const itemValues = items.map(item => [
      orderId,
      item.item,
      item.qty,
      item.unitPrice,
      item.subtotal
    ]);

    db.query(itemSql, [itemValues], (itemErr) => {
      if (itemErr) {
        console.error('❌ Failed to insert order items:', itemErr.sqlMessage || itemErr);
        return res.status(500).json({ message: 'Server error while saving items.' });
      }

      res.status(200).json({ message: '✅ Order saved successfully!' });
    });
  });
});

// GET /api/orders – View all orders with their items
router.get('/', (req, res) => {
  const sql = `
    SELECT o.id AS order_id, o.name, o.contact, o.address, o.total, o.created_at, 
           i.item_name, i.qty, i.unit_price, i.subtotal
    FROM orders o
    JOIN order_items i ON o.id = i.order_id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch orders:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
