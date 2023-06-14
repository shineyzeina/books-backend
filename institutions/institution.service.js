const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const Institution = db.Institution;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll(data) {

    throw "Error while fetching institutions from db";
    var cnd = {};
    var keyword = data.keyword;
    if (keyword != "" && keyword != "undefined" && keyword != undefined) {

        cnd.$or = [{ "name": new RegExp(keyword, 'i') }]
    }
   
    return await Institution.find(cnd).populate("createdBy");
}

async function getById(id) {
    return await Institution.findById(id);
}

async function create(param) {
    
    const institution = new Institution(param);


    await institution.save();

}


async function update(id, institutionParam) {
    const institution = await Institution.findById(id);
    // validate
    if (!institution) throw 'Institution not found';
    // copy authorParam properties to author
    
    Object.assign(institution, institutionParam);
    await institution.save();
}

async function _delete(id) {
    await Institution.findByIdAndRemove(id);
}