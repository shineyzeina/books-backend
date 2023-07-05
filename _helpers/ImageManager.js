const multer = require("multer");
let fs = require("fs");
const path = require("path");

module.exports = {
  deleteImage: async function (fileName) {
    const path = "./uploads/" + fileName;
    const path2 = "./uploads/institutions/" + fileName;
    try {
      console.log("removing file " + path);
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      } else if (fs.existsSync(path2)) {
        fs.unlinkSync(path2);
      } else {
        console.log("file not found!");
      }

      //file removed
    } catch (err) {
      console.error(err);
    }
  },

  uploadImage: async function (imgData, subfolder = "") {
    let destination = "./uploads/" + subfolder;
    try {
      if (imgData) {
        var base64Data = imgData.split(",")[1]; // split with `,`

        var imgArr = imgData.split(";");
        var fileName = imgArr[1].split("=")[1];
        fileName = Date.now() + "_" + fileName;

        fs.writeFile(
          destination + fileName,
          base64Data,
          "base64",
          function (err, data) {
            if (err) {
              console.log("Error!!!!", err);
              return { fileName: "" };
            }

            return { fileName: "" };
          }
        );
        return { fileName: fileName };
      } else {
        console.log("Image is not defined");
        return { fileName: "" };
      }
    } catch (err) {
      return { fileName: "" };
      console.error(err);
    }
  },
};
