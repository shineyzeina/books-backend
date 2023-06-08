const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const Book = db.Book;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


// async function getAll(data) {
//     const keyword = data.keyword;
//     let condition = {};
  
//     if (keyword) {
//       condition.$or = [
//         { "ISBN": new RegExp(keyword, 'i') },
//         { "name": new RegExp(keyword, 'i') },
//         { "category": new RegExp(keyword, 'i') }
//       ];
//     }
  
//     if (data.authorId) {
//       condition.author = data.authorId;
//     }
  
//     return await Book.find(condition).populate("author createdBy");
//   }

  async function getAll(data, booksPerPage) {
    const keyword = data.keyword;
    const authorId = data.authorId;
  
    let condition = {};
  
    if (keyword) {
      condition.$or = [
        { "ISBN": new RegExp(keyword, 'i') },
        { "name": new RegExp(keyword, 'i') },
        { "category": new RegExp(keyword, 'i') }
      ];
    }
  
    if (authorId) {
      condition.author = authorId;
    }
  
    const books = await Book.find(condition)
      .populate("author createdBy")
      .limit(booksPerPage);
  
    return books;
  }
  
  


async function getById(id) {
    return await Book.findById(id);
}

async function create(bookParam) {
    // validate
    if (await Book.findOne({ ISBN: bookParam.ISBN })) {
        throw 'ISBN "' + bookParam.ISBN + '" is already taken';
    }

    const book = new Book(bookParam);

    // save book
    await book.save();
}

async function update(id, bookParam) {
    const book = await Book.findById(id);

    // validate
    if (!book) throw 'Book not found';
    if (book.ISBN !== bookParam.ISBN && await Book.findOne({ ISBN: bookParam.ISBN })) {
        throw 'ISBN "' + bookParam.ISBN + '" is already taken';
    }


    // copy bookParam properties to book
    Object.assign(book, bookParam);

    await book.save();
}

async function _delete(id) {
    await Book.findByIdAndRemove(id);
}