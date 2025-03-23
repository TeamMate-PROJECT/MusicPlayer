const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, trim: true },
    genre: { type: String, trim: true }, // Example: "Melody", "Pop", "Rock"
    emotion: { 
      type: String, 
      required: true, 
      enum: ["Happy", "Sad", "Relaxed", "Energetic", "Romantic", "Angry", "Chill"] 
    }, // Categorized by emotion

    description: { type: String, required: true, trim: true }, // Short song description

    songUrl: { type: String, required: true }, // Cloudinary song URL
    imageUrl: { type: String, required: true }, // Cloudinary cover image URL

    duration: { type: Number, required: true }, // Duration in seconds

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user who uploaded

    isFeatured: { type: Boolean, default: false }, // Featured song flag
    releaseDate: { type: Date }, // Release date

    createdAt: { type: Date, default: Date.now } // Timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
