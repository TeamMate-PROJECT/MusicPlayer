const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const Song = require('../models/song');

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store files locally before uploading
const upload = multer({ dest: 'temp/' });

router.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.audio) {
      return res.status(400).json({ message: 'Both image and audio files are required.' });
    }

    const imagePath = req.files.image[0].path;
    const audioPath = req.files.audio[0].path;

    const imageUpload = await cloudinary.uploader.upload(imagePath, {
      folder: 'song-covers',
    });

    const audioUpload = await cloudinary.uploader.upload(audioPath, {
      folder: 'songs',
      resource_type: 'video',
    });

    // Clean up local temp files
    fs.unlinkSync(imagePath);
    fs.unlinkSync(audioPath);

    const newSong = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      emotion: req.body.emotion,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      isFeatured: req.body.isFeatured === 'true',
      imageUrl: imageUpload.secure_url, // ✅ correct
      songUrl: audioUpload.secure_url,  // ✅ correct
    });
    
    await newSong.save();
    res.status(201).json({ message: '✅ Song uploaded successfully!' });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: '❌ Upload failed', error });
  }
});

module.exports = router;
