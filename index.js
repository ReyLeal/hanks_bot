const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const ejs = require('ejs');
const myFileLoad = function (filePath) {
  return 'myFileLoad: ' + fs.readFileSync(filePath);
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('read engine', 'ejs')
  .get('/', (req, res) => ejs.fileLoader = myFileLoad('./bot.js'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
