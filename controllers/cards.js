const Card = require('../models/card');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const bluebird = require('bluebird');
const axios = require('axios');
const parseString = require('xml2js').parseString;

const index = async (req, res) => {
  try {
    const allCards = await Card.find({}).sort([['updatedAt', 1], ['rank', 1]]).select('-__v');
    res.status(200).json(allCards);
  } catch (err) {
    res.status(404).json(err)
  }
};

const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    index(req, res);
  } catch (err) {
    res.status(404).json(err)
  }
};

// config for uploadFile
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();

// helper function for getImageUrl
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

// getImageUrl helper function for newCard
const getImageUrl = async files => {
  const path = files.file[0].path;
  const buffer = fs.readFileSync(path);
  const type = fileType(buffer);
  const timestamp = Date.now().toString();
  const filename = `images/${timestamp}`;
  const uploadData = await uploadFile(buffer, filename, type);
  return uploadData.Location;
};

const newCard = (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const image = await getImageUrl(files);
      const newCard = {
        name: fields.name[0],
        description: fields.description[0],
        factoid: fields.factoid[0],
        image,
      };
      const cardExistsInDb = await Card.exists({ name: newCard.name })
      if (!cardExistsInDb) {
        await Card.create(newCard);
        index(req, res);
      } else {
        throw new Error('game exists in db')
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  );
};

const reSeed = async (req, res) => {
  const seedData = [];
  try {
    const apiResult = await axios.get('https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame');
    parseString(apiResult.data, (err, result) => {
      result.items.item.length = 15;
      result.items.item.forEach(item => {
        seedData.push({
          name: item.name[0]['$'].value,
          image: item.thumbnail[0]['$'].value,
          description: `An original board game first published in ${item.yearpublished[0]['$'].value}.`,
          factoid: `Currently ranked number ${item['$'].rank} on Board Game Geek's list of hottest board games.`,
          rank: parseInt(item['$'].rank)
        });
      });
    });
    await Card.deleteMany({});
    await Card.create(seedData);
    index(req, res);
  } catch (err) {
    res.status(404).json(err)
  }
};

module.exports = {
  index,
  delete: deleteCard,
  new: newCard,
  reSeed
};