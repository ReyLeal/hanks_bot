const express = require('express')
const PORT = process.env.PORT || 5000
var bot = require('./bot.js');


express().listen(PORT, () => console.log(`Listening on ${ PORT }`));
