const multer = require("multer");

// configure Multer

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   // specify the destination for the uploaded files
  //   cb(null, "uploads/");
  // },

  filename: (req, file, cb) => {
    // specify the file naming function
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    // accept the file
    cb(null, true);
  } else {
    // reject the file
    cb("Invalid file type. Only JPEG and PNG are allowed.");
  }
};

const upload = multer({ fileFilter, storage });

module.exports = upload;
