const cloudinary = require("cloudinary");
CLOUD_NAME = "dza2t1htw";
API_KEY = "563859764347624";
API_SECRET = "ndBih7bre8-OHEII7XS6wS1uTyQ";
// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
