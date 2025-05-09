require("dotenv").config();  // Ensure dotenv is required at the top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

// Log DB URI to debug
console.log("Mongo URI:", DB_URI);

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Could not connect to MongoDB:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, Expressss!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


const userRoutes = require('./routes/userRoutes');


app.use('/api/users', userRoutes);