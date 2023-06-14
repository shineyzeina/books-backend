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


async function getAll(data) {

    
    var cnd = {};
    var keyword = data.keyword;
    var authId = data.author;
    if (keyword != "" && keyword != "undefined" && keyword != undefined) {

        cnd.$or = [{ "ISBN": new RegExp(keyword, 'i') }, { "name": new RegExp(keyword, 'i')}, { "category": new RegExp(keyword, 'i') }]
    }
    if (authId != "" && authId != "undefined" && authId != undefined) {
        cnd.author = authId
    }

   
    return await Book.find(cnd).populate("author createdBy ");

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