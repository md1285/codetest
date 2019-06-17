const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const bluebird = require('bluebird');
// const multiparty = require('multiparty');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// configure aws accessKeyId and secretAccessKey
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// configure aws to use bluebird for promises
// AWS.config.setPromisesDependency(bluebird);

// create s3 instance
// const s3 = new AWS.S3();



// API routes

app.use('/cards', require('./routes/api/cards'));

// Catch-all API route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', index.html));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});