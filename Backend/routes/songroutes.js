const express = require("express");
const Song = require("../models/song");

const router = express.Router();

// 🎵 **Add a Song**
router.post("/add", async (req, res) => {
  try {
    const { title, artist, album, genre, emotion, description, songUrl, imageUrl, duration, isFeatured, releaseDate } = req.body;

    // ✅ Validate required fields
    if (!title || !artist || !genre || !emotion || !songUrl || !imageUrl || !duration) {
      return res.status(400).json({ error: "⚠️ Missing required fields. Please provide all necessary details." });
    }

    // ✅ Create new song object
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      emotion,
      description,
      songUrl,
      imageUrl,
      duration,
      isFeatured,
      releaseDate
    });

    // ✅ Save song to MongoDB
    await newSong.save();
    res.status(201).json({ message: "✅ Song added successfully!", song: newSong });

  } catch (error) {
    console.error("❌ Error adding song:", error);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
});


// 🎵 **Get All Songs**
router.get("/all", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    console.error("❌ Error fetching songs:", error);
    res.status(500).json({ error: "Error fetching songs" });
  }
});

// 🎵 **Get Songs by Emotion**
router.get("/", async (req, res) => {
  const { emotion } = req.query;

  if (!emotion) {
    return res.status(400).json({ error: "Emotion query parameter is required" });
  }

  try {
    const songs = await Song.find({ emotion: emotion }); // Fetch songs based on emotion
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// 🎵 **Get a Song by Title**
router.get("/song", async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const song = await Song.findOne({ title });
    if (!song) return res.status(404).json({ error: "Song not found" });

    res.json(song);
  } catch (error) {
    console.error("❌ Error fetching song:", error);
    res.status(500).json({ error: "Error fetching song" });
  }
});

// 🎵 **Update a Song by ID**
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ message: "✅ Song updated successfully!", song: updatedSong });
  } catch (error) {
    console.error("❌ Error updating song:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🎵 **Delete a Song by ID**
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ message: "✅ Song deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting song:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update song details
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Data to update

  try {
    const updatedSong = await Song.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ message: "Song updated successfully", song: updatedSong });
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).json({ error: "Failed to update song" });
  }
});


module.exports = router;
