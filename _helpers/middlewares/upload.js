const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'authors/author-profile-picture/'); // Specify the destination folder for storing uploaded pictures
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file (you can customize this as per your requirements)
    //const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${file.originalname}`;
    cb(null, filename);
  }, 
});

// Create the multer middleware
const upload = multer({ storage });

module.exports = upload;
