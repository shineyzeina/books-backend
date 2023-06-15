const express = require('express');
const router = express.Router();
const authorService = require('./author.service');

let ImageManager = require("../_helpers/middlewares/ImageManager");
const path = require('path');
const fs = require('fs');

// routes
router.post('/', saveNew);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/upload-profile-picture', uploadProfilePicture);
router.delete('/delete-profile-picture', deleteProfilePicture); 

module.exports = router;

 async function uploadProfilePicture (req, res) {
  try {
    const { profilePictureUri } = req.body;

    // Upload picture
    const uploadResult = await ImageManager.uploadImage(profilePictureUri, "assets/upload/");
    const fileName = uploadResult.fileName;

    // Send the picture url as a response to the frontend
    const profilePictureUrl = path.join(fileName);
    
    res.status(200).json({ profilePictureUrl });
    // Send a response if needed
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
  };


  async function deleteProfilePicture(req, res, next) {
    try {
      const { profilePictureUri } = req.body;
  
      // Delete picture
      await ImageManager.deleteImage(profilePictureUri);
  
      // Update the author's profile picture with an empty value
      // Example: item.profilePicture = "";
  
      // Send a response if needed
      res.status(200).json({ message: "Profile picture deleted successfully" });
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      // Handle the error and send an appropriate response
      res.status(500).json({ error: "Failed to delete profile picture" });
    }
  }
  

  


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