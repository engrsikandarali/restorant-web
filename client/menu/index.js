const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ New import

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON data

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api', authRoutes); // ✅ Mount login route at /api/login

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
