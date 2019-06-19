const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/cards');

router.get('/', cardsCtrl.index);
router.post('/', cardsCtrl.new);
router.delete('/', cardsCtrl.reSeed);
router.delete('/:id', cardsCtrl.delete);

module.exports = router;