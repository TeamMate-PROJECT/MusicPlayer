const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, trim: true },
    genre: { type: String, trim: true }, 
    emotion: { 
      type: String, 
      required: true, 
      enum: ["Happy", "Sad", "Relaxed", "Energetic", "Romantic", "Angry", "Chill"] 
    },
    description: { type: String, required: true, trim: true }, 
    songUrl: { type: String, required: true }, 
    imageUrl: { type: String, required: true }, 
    duration: { type: Number, required: true }, 
    isFeatured: { type: Boolean, default: false }, 
    releaseDate: { type: Date }, 
    createdAt: { type: Date, default: Date.now } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
