// routes/index.js
const express = require("express");
const router = express.Router();

// Import other routes
const todos = require('./todos');

// Main route - Home Page
router.get("/", (req, res) => {
  res.send("main page!");
});

// Health Check route - Useful for monitoring and quick checks
router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Todo routes
router.use("/todos", todos);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
