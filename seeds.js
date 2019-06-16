require('dotenv').config();
require('./config/database');

const Card = require('./models/card');
const data = require('./data');

Card.deleteMany({})
  .then(() => {
    return Card.create(data.cards);
  })
  .then(cards => {
    console.log(cards)
  })
  .then(() => {
    process.exit();
  });