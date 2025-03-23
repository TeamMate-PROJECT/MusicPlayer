const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "musicplayer",
      public_id: file.originalname.split(".")[0], // Unique file name
      resource_type: "auto", // Detect file type (image/audio)
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
