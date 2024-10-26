var express = require('express');
const BetmgmController = require('../controllers/BetmgmController');
var router = express.Router();

router.get('/:tournament', BetmgmController.index);

module.exports = router;
