var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

const axios = require('axios')

var urls = ['https://api.twitch.tv/kraken/streams/yoda?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr',
'https://api.twitch.tv/kraken/streams/mcdeeker?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr','https://api.twitch.tv/kraken/streams/imaqtpie?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr','https://api.twitch.tv/kraken/streams/gosu?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr','https://api.twitch.tv/kraken/streams/doublelift?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr','https://api.twitch.tv/kraken/streams/tsm_bjergsen?client_id=bdr1vbjdfup8jxxg1hlzjnlagbjgqr'
];

for(var i = 0; i < urls.length; i++) {
  axios.get(urls[i])
    .then(function(response) {
        console.log();
        if(response.data !== undefined ){
          const stream = response.data['stream'];
          if(stream !== null) {
            setTimeout(function() {
              bot.sendMessage({
                  to: '381877135104671755',
                  message: stream['channel']['display_name'] + " is now steaming. Watch them here: " + stream['channel']['url']
              });
            },1000)
          }
        }
        console.log('done')
    });
}
