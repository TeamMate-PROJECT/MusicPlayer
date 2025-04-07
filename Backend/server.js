require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ Import connectDB properly

const uploadRoutes = require("./routes/uploadRoutes");
const songRoutes = require("./routes/songroutes");
const authRoutes = require("./routes/authRoutes"); // ✅ Ensure correct case
const playlistRoutes = require("./routes/playlistRoutes"); // ✅ match the others

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🎵 Music API is Running...");
});

// ✅ Routes
app.use("/api", uploadRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);
// 🚀 **Start the Server**
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
