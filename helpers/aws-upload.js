const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.loadFromPath("./secret/aws-config.json");

const S0 = new AWS.S3({});

const upload = multer({
  storage: multerS3({
    s3: S0,
    bucket: "udemy-chat-bucket-1",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
    rename: function (fieldName, fileName) {
      return fileName.replace(/\W+/g, "-").toLowerCase();
    },
  }),
});

exports.Upload = upload;
