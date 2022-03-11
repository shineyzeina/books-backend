const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const Author = db.Author;

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
    if (keyword != "" && keyword != "undefined" && keyword != undefined) {

        cnd.$or = [{ "first_name": new RegExp(keyword, 'i') }, { "last_name": new RegExp(keyword, 'i') }]
    }
   
    return await Author.find(cnd).populate("createdBy");
}

async function getById(id) {
    return await Author.findById(id);
}

async function create(param) {

    const author = new Author(param);
   // save author
    await author.save();
}

async function update(id, authorParam) {
    const author = await Author.findById(id);
    // validate
    if (!author) throw 'Author not found';
    // copy authorParam properties to author
    Object.assign(author, authorParam);
    await author.save();
}

async function _delete(id) {
    await Author.findByIdAndRemove(id);
}