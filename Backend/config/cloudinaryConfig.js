const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "MusicPlayer/images",
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image",
  },
});

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "MusicPlayer/songs",
    allowed_formats: ["mp3", "wav"],
    resource_type: "video", // audio is treated as video by Cloudinary
  },
});

module.exports = { cloudinary, imageStorage, audioStorage };
