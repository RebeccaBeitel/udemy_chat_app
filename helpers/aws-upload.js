const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const myConfig = new AWS.Config();

myConfig.update({
  accessKey: "AKIAUPQO6RQLEONHJOM2",
  secretAccessKey: "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",
  region: "us-west-1",
});

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
      return fileName.replace(/\W+/g, "-");
    },
  }),
});

exports.Upload = upload;
