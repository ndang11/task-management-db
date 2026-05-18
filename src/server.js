const express = require('express');
const pool = require('./config/db');

const app = express();
app.use(express.json());

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Database is working!", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query error");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});