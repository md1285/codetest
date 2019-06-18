const axios = require('axios');
const parseString = require('xml2js').parseString;

require('dotenv').config();
require('./config/database');

const Card = require('./models/card');
const seedData = [];

(async () => {
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
})();


Card.deleteMany({})
  .then(() => {
    return Card.create(seedData);
  })
  .then(cards => {
    console.log(cards)
  })
  .then(() => {
    process.exit();
  });
