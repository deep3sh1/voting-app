const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const FURL = process.env.FURL

// ✅ Built-in middleware (no need for body-parser)
app.use(express.json());

app.use(cors({
  origin: `${FURL}`, // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


const {jwtauth } = require("./midlleware/jwt");

// ✅ Routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoute");
app.use("/user", userRoutes);
app.use("/candidate",  candidateRoutes);


// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});