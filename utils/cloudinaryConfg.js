const cloudinary = require("cloudinary");
CLOUD_NAME = "dza2t1htw";
API_KEY = "563859764347624";
API_SECRET = "ndBih7bre8-OHEII7XS6wS1uTyQ";
// configure Cloudinary
cloudinary.config({
  cloud_name: "dza2t1htw",
  api_key: "563859764347624",
  api_secret: "ndBih7bre8-OHEII7XS6wS1uTyQ",
});

module.exports = cloudinary;
