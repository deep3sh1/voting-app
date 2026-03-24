const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoute");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
