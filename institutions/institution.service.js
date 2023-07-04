const config = require("config.json");
const jwt = require("jsonwebtoken");
const db = require("_helpers/db");
const ImageManager = require("_helpers/ImageManager");
const Institution = db.Institution;
const path = require("path");
const fs = require("fs");

module.exports = {
  getAll,
  getSome,
  getById,
  getCount,
  create,
  update,
  delete: _delete,
};

async function getAll(data) {
  // throw "Error while fetching institutions from db";
  var cnd = {};
  var keyword = data.keyword;
  if (keyword != "" && keyword != "undefined" && keyword != undefined) {
    cnd.$or = [{ name: new RegExp(keyword, "i") }];
  }

  return await Institution.find(cnd).populate("createdBy");
}

async function getSome(data) {
  console.log("t");
  var cnd = {};
  var keyword = data.searchKey;
  const page = parseInt(data.page) || 0; // Get the page number from the query parameter (default to 1 if not provided)
  const limit = parseInt(data.limit); // Set the number of institutions to fetch per page
  const skip = page * limit;

  if (keyword != "" && keyword != "undefined" && keyword != undefined) {
    cnd.$or = [{ name: new RegExp(keyword, "i") }];
  }

  return await Institution.find(cnd)
    .skip(skip)
    .limit(limit)
    .populate("createdBy");
}

function getCount(data) {
  const query = { name: { $regex: data.keyword, $options: "i" } };
  return Institution.countDocuments(query);
}
async function getById(id) {
  return await Institution.findById(id);
}

async function create(param) {
  if (param.institutionImage) {
    let uploadResult = await ImageManager.uploadImage(
      param.institutionImage,
      "institutions/"
    );
    const file_name = uploadResult.fileName;
    console.log(file_name);
    param.institutionImage = file_name;
  }
  const institution = new Institution(param);

  await institution.save();
}

async function update(id, institutionParam) {
  const institution = await Institution.findById(id);
  if (!institution) throw "Institution not found";
  // delete image only if triggers from front end
  if (institutionParam.picChanged) {
    await ImageManager.deleteImage(
      "institutions/" + institution.institutionImage
    );
  }
  // upload only if image is sent
  if (institutionParam.institutionImage) {
    let uploadResult = await ImageManager.uploadImage(
      institutionParam.institutionImage,
      "institutions/"
    );
    const file_name = uploadResult.fileName;
    // throw new Error(`file name is ${file_name}`);
    institutionParam.institutionImage = file_name;
  }

  Object.assign(institution, institutionParam);
  await institution.save();
}

async function _delete(id) {
  await Institution.findByIdAndRemove(id);
}
