const express = require('express');
const router = express.Router();
const authorService = require('./author.service');
let ImageManager = require('_helpers/ImageManager');

router.post('/', saveNew);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

async function saveNew(req, res, next) {
    
    req.body.createdBy = req.user.sub;
    console.log(req.body);
    if(req.body.picChanged == true){
        if(req.body.picture){
            let uploadResult = await ImageManager.uploadImage(req.body.picture);
            req.body.authorImage = uploadResult.fileName
            console.log("Ana hon");
        }else{
        
        }
    }
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