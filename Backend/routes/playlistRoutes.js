const express = require("express");
const Playlist = require("../models/Playlist");
const Song = require("../models/song");
const auth = require("../middleware/auth");

const router = express.Router();

// Get songs
router.get("/songs", auth, async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Playlist
router.post("/create", auth, async (req, res) => {
  const { name } = req.body;
  try {
    const newPlaylist = new Playlist({
      name,
      user: req.user._id,
      songs: [],
    });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Song to Playlist
router.post("/add-song", auth, async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: playlistId, user: req.user._id });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user playlists
router.get("/my-playlists", auth, async (req, res) => {
  try {
    const userPlaylists = await Playlist.find({ user: req.user._id }).populate("songs");
    res.json(userPlaylists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
