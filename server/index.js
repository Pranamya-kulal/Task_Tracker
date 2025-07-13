const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/db'); // Connects to MySQL

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Task Tracker API is running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
