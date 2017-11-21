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
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {

  var rollValue = rollDice();

    // Only post on this channel.

    if(channelID !== '381877135104671755') {
      return false;
    }


        // Our bot needs to know if it will execute a command
        // It will listen for messages that will start with ```
    if (message.substring(0, 1) == '`') {
        var args = message.substring(1).split(' '),
            cmd = args[0],
            errorMessage = '',
            timer = null,
            timerString = "Timer set for " + args[1] + " " + args[2] + ".",
            checkArgs = [];

        if(cmd.includes('timer')) {
          //format timer here
          cmd = 'timer';

          errorMessage = args.length !== 3 ? 'Please format as such: `timer 20 minutes' : '';

          var increment = 0;

          if(errorMessage === ''){
            timer = formatTime(args, errorMessage);
          }

        }

        args = args.splice(1);
        switch(cmd) {
            //Next case
            case 'hello':
                bot.sendMessage({
                    to: channelID,
                    message: 'Fuck off jason!'
                });
            break;
            //Next case
            case 'roll':
                bot.sendMessage({
                    to: channelID,
                    message: "Looks like you rolled a " + rollValue + "."
                });
            break;
            //Next case
            case 'timer':
                if(errorMessage !== '') {
                  bot.sendMessage({
                      to: channelID,
                      message: errorMessage
                  });
                } else if (errorMessage === '' && timer !== null) {

                    bot.sendMessage({
                        to: channelID,
                        message: timerString
                    });
                    setTimeout(function() {
                      bot.sendMessage({
                          to: channelID,
                          message: "Ding! " + user + "'s timer is done."
                      });
                    }, timer);
                } else {
                  bot.sendMessage({
                      to: channelID,
                      message: "Error setting timer. Here are your variables : timer: " + timer + ', errorMessage: ' + errorMessage + '.'
                  });
                }

            break;
            //Next case
            case 'userName':
                bot.sendMessage({
                    to: channelID,
                    message: user
                });
            break;
            //Next case
            case 'userID':
                bot.sendMessage({
                    to: channelID,
                    message: userID
                });
            break;
            //Next case
            case 'channelID':
                bot.sendMessage({
                    to: channelID,
                    message: channelID
                });
            break;
            //Next case
            case 'commands':
                bot.sendMessage({
                    to: channelID,
                    message: "Current commands are: \n `hello`,\n `roll`,\n `timer[number][increment(hour, min, or sec)]`,\n `userName`,\n `userID`,\n `channelID`,\n `and obviously.... fucking commands`"
                });
            break;

            // Just add any case commands if you want to..
         }
     }
});

function formatTime(args, errorMessage) {
  if(args[2].toLowerCase() === 'minutes' || args[2].toLowerCase() === 'minute'|| args[2].toLowerCase() === 'min' ) {
    increment = 60000;
  } else if(args[2].toLowerCase() === 'sec' || args[2].toLowerCase() === 'second' || args[2].toLowerCase() === 'seconds') {
    increment = 1000;
  } else if(args[2].toLowerCase() === 'hour' || args[2].toLowerCase() === 'hours' || args[2].toLowerCase() === 'hr') {
    increment = 60000 * 60;
  }

  timer = errorMessage === '' ? args[1] * increment : null;

  return timer;
}

function rollDice() {
  var numbersArray = [1,2,3,4,5,6,7];

  var roll = numbersArray[Math.floor(Math.random() * numbersArray.length)];

  return roll;

}
