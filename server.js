const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// configure aws accessKeyId and secretAccessKey
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// configure aws to use bluebird for promises
AWS.config.setPromisesDependency(bluebird);

// create s3 instance
const s3 = new AWS.S3();

// helper function for Image Upload post route
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


// API routes
  app.post('/image', (request, response) => {
    const form = new multiparty.Form();
    form.parse(
      request,
      async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const filename = `images/${timestamp}`;
          const data = await uploadFile(buffer, filename, type);
          return response.status(200).send(data);
        } catch (error) {
          return response.status(400).send(error);
        }
      }
    );
  });

// Catch-all API route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', index.html));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});