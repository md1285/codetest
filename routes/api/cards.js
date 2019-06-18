const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/cards');

router.get('/', cardsCtrl.index);
router.post('/', cardsCtrl.new);
router.delete('/:id', cardsCtrl.delete);

module.exports = router;