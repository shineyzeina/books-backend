const express = require('express');
const router = express.Router();
const authorService = require('./author.service');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'authors/pictures'); // Specify the destination folder where the images will be saved
//     },
//     filename: (req, file, cb) => {
//     const filename = `${file.originalname}`;
//     console.log(filename);
//     cb(null, filename)
//     }
//   });
  
//   // Multer upload instance
// const upload = multer({ storage: storage });

// module.exports = upload;
// routes
router.post('/', saveNew);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


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