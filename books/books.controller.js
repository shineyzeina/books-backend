const express = require('express');
const router = express.Router();
const bookService = require('./book.service');

// routes
router.post('/', saveNew);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.put('/favorite/:id', favorite);
router.delete('/:id', _delete);

module.exports = router;

function saveNew(req, res, next) {
    req.body.createdBy = req.user.sub;
    bookService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    bookService.getAll(req.query)
        .then(books => res.json(books))
        .catch(err => next(err));
}

function getById(req, res, next) {
    bookService.getById(req.params.id)
        .then(book => book ? res.json(book) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    bookService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
async function  favorite(req, res, next) {
    var action = req.body.action;
    let book = await bookService.getById(req.params.id);
    let fav = book.favorites;
    if (!fav){ fav = []}
    if (action == "add"){
        fav.push(req.user.sub);
    }
    else{
        var index = fav.indexOf(req.user.sub);
        fav.splice(index, 1);
       
    }
    book.favorites = fav; 
    book.save().then(() => res.json({}))
    .catch(err => next(err));
}


function _delete(req, res, next) {
    bookService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}