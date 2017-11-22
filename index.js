const express = require('express')
const PORT = process.env.PORT || 5000
var bot = require('./twitchActiveStreamers.js');

var router = express.Router()

router.get('/', function (req, res) {
  res.render(bot);
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`));
