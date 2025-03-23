const express = require("express");
const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

// 📂 Upload a File (Image/Song) to Cloudinary
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "✅ File uploaded successfully",
      fileUrl: req.file.path || req.file.url, // Cloudinary file URL
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

module.exports = router;
