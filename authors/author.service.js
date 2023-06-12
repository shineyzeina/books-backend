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

        cnd.$or = [{ "first_name": new RegExp(keyword, 'i') }, { "last_name": new RegExp(keyword, 'i') },
         {"age": new RegEx(keyword, 'i')}, {"nationality": new RegEx(keyword, 'i')} , {"address": new RegEx(keyword, 'i')}]
    }
   
    return await Author.find(cnd).populate("createdBy");
}

async function getById(id) {
    return await Author.findById(id);
}

async function create(param) {

    const author = new Author(param);
    author.pictureUrl = param.pictureUrl;
    if (param.image) {
        const image = param.image;
    
        // Create a unique filename for the image
        const filename = `${author.first_name}-${image.name}`;
    
        // Define the path where the image will be saved
        const imagePath = path.join(__dirname,'../authors/author-picture', filename);
        console.log("Image path", imagePath);
    
        // Read the image file
        const fileData = fs.readFileSync(image.path);
    
        // Save the image file
        fs.writeFileSync(imagePath, fileData);
    
        // Update the author's image field with the image URL
        author.image = `/images/${filename}`;
    }
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