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
router.get('/',getByPages);

router.get('/genres/counts', getGenreCounts);
router.get('/ratings/get-rating', getBookRatings);


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

function getByPages(req, res, next) {
    bookService.getByPages().then(book => book? res.json(book): res.sendStatus(404))
    .catch(err => next(err));
}

// function getAuthorBooks(req, res, next) {
//     bookService.getByAuthorId(req.params.id)
//     .then(books => res.json(books))
//     .catch(err => next(err))
// }

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

async function getGenreCounts(req, res, next) {
  try {
    const { books } = await bookService.getAll(req.query);
    // Here, we use destructuring to extract the 'books' array from the response
  
    const genreCounts = calculateGenreCounts(books);
    res.json(genreCounts);
  } catch (error) {
    next(error);
  }
}

  
  function calculateGenreCounts(books) {
    const genreCounts = {};
    books.forEach(book => {
      const { category } = book;
      if (genreCounts[category]) {
        genreCounts[category] += 1;
      } else {
        genreCounts[category] = 1;
      }
    });
    return genreCounts;
  }

  async function getBookRatings(req, res, next) {
    try {
      const { books } = await bookService.getAll(req.query);
      // Here, we use destructuring to extract the 'books' array from the response
    
      // Create an object with book names as keys and ratings as values
      const bookRatings = {};
      books.forEach((book) => {
        bookRatings[book.name] = book.rating;
      });
  
      res.json(bookRatings);
    } catch (error) {
      next(error);
    }
  }
  



