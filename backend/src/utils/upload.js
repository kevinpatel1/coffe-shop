const multer = require("multer");
const path = require("path");
const config = require("config");
const { file_path } = config.get("uploads");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file_path);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueFilename = file.fieldname + "-" + Date.now();
    const filenameWithExtension = `${uniqueFilename}.${fileExtension}`;
    cb(null, filenameWithExtension);
  },
});
// const maxSize = 800 * 1024 * 1024; // for 1MB
var upload = multer({
  storage: storage,

  // limits: { fileSize: maxSize },
});

module.exports = upload;
