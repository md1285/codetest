const Card = require('../models/card');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const bluebird = require('bluebird');

// helper function and setup for newCard
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};


const newCard = (req, res) => {
  const form = new multiparty.Form();
  form.parse(
    req,
    async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const filename = `images/${timestamp}`;
        const uploadData = await uploadFile(buffer, filename, type);
        const newCard = {
          name: fields.name[0],
          description: fields.description[0],
          factoid: fields.factoid[0],
          image: uploadData.Location,
        };
        res.status(200).json(newCard);
      } catch (error) {
        res.status(400).json(error);
      }
    }
  );
};

const index = async (req, res) => {
  const allCards = await Card.find({}).sort([['updatedAt', 1], ['rank', 1]]);
  res.status(200).json(allCards);
};

const deleteCard = async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  index(req, res);
};

module.exports = {
  new: newCard,
  index,
  delete: deleteCard
};