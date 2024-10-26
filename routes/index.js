var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:tournament', function (req, res, next) {
    const { tournament } = req.params;
    const { date, timeZone } = req.query;
    res.render('index', { tournament: tournament, date: date, timeZone: timeZone });
});

module.exports = router;
