const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  image: {
    type: String,
    required: true,
    default: 'https://i.imgur.com/pI7VtFw.jpg'
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  factoid: {
    type: String,
    required: true,
    default: ''
  }
}, {timestamps: true});

module.exports = mongoose.model('Card', cardSchema);