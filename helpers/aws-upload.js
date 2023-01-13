const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { aws } = require("../secret/aws-keys");

AWS.config.update({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.region,
});

const S0 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "udemy-chat-bucket-1" },
});

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
