require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ Import connectDB properly

const uploadRoutes = require("./routes/uploadRoutes");
const songRoutes = require("./routes/songroutes"); // ✅ Ensure correct case

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🎵 Music API is Running...");
});

// ✅ Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/songs", songRoutes);

// 🚀 **Start the Server**
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
