const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const ImageManager = require('_helpers/ImageManager');
const path = require('path');
const fs = require('fs');
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

        cnd.$or = [{ "first_name": new RegExp(keyword, 'i') }, { "last_name": new RegExp(keyword, 'i') },
         {"age": new RegExp(keyword, 'i')}, {"nationality": new RegExp(keyword, 'i')} , {"address": new RegExp(keyword, 'i')}]
    }
   
    return await Author.find(cnd).populate("createdBy");
}

async function getById(id) {
    return await Author.findById(id);
}

async function create(param) {

	if (param.picture) {
		let uploadResult = await ImageManager.uploadImage(param.picture,"authors/");
		const file_name = uploadResult.fileName;
        console.log(file_name);
        param.picture = file_name;
		
    

    }
    const author = new Author(param);
    await author.save();

    
}

async function update(id, authorParam) {
    const author = await Author.findById(id);
    try {
        const author = await Author.findById(id);
        if (!author) throw 'Author not found';
        if (author.picture){
            await ImageManager.deleteImage(author.picture);
        }
        
        let uploadResult = await ImageManager.uploadImage(authorParam.picture,"authors/");
        const file_name = uploadResult.fileName;
        authorParam.picture = file_name;
        Object.assign(author, authorParam);
        await author.save();
    }
    catch (error) {
        console.error('Error deleting author:', error);
    }
    // validate
    
    // copy authorParam properties to author
    
}

async function _delete(id) {
    try {
        const author = await Author.findById(id);
        if (!author) {
            throw 'Author not found'
        }
        if (author.picture){
            await ImageManager.deleteImage(author.picture);
        }
        
        await Author.findByIdAndRemove(id);
    }
    catch (error) {
        console.error('Error deleting author:', error);
    }
}