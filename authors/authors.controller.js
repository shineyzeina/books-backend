const express = require('express');
const router = express.Router();
const authorService = require('./author.service');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'authors/pictures'); // Specify the destination folder where the images will be saved
    },
    filename: (req, file, cb) => {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //   const extension = path.extname(file.originalname);
    //   cb(null, uniqueSuffix + extension); // Set the file name to a unique value
    const filename = `${file.originalname}`;
    cb(null, filename)
    }
  });
  
  // Multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;
// routes
router.post('/', saveNew);
router.post('/upload-picture', upload.single('picture'), uploadPicture);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function uploadPicture(req, res) {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No profile picture provided' });
        return;
      }
  
      const profilePicturePath = path.join(__dirname, '../authors/pictures/');
      console.log("PP path: ", profilePicturePath)
      const profilePictureUrl = `${req.file.filename}`;
      const abs_path = profilePicturePath + profilePictureUrl;
      console.log("abs path ", abs_path)
  
      // Move the uploaded file to the author-profile-pictures folder
      fs.renameSync(req.file.path, `${profilePicturePath}/${req.file.filename}`);
      
      const needed_path = 'authors/pictures/' + `${req.file.filename}`;

      res.status(200).json({ url: abs_path });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ message: 'Error uploading profile picture' });
    }
  };

function saveNew(req, res, next) {
    req.body.createdBy = req.user.sub;
    authorService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next("Error: " +err));
}

function getAll(req, res, next) {
    authorService.getAll(req.query)
        .then(authors => res.json(authors))
        .catch(err => next(err));
}


function getById(req, res, next) {
    authorService.getById(req.params.id)
        .then(author => author ? res.json(author) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    
    authorService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    authorService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}