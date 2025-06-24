const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Route imports
const reservationRoutes = require('./routes/reservationRoutes');
const orderRoutes = require('./routes/orderRoutes');  // ✅ orders route
const authRoutes = require('./routes/authRoutes');    // ✅ login route

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', authRoutes); // login route

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Unified server running at http://localhost:${PORT}`);
});
