const path = require('path');

const env = require('../env.js').ensure([
  'SLACK_API_KEY'
]);

const BotSwarm = require(path.resolve(__dirname, '../BotSwarm.js'));

const minnesotaBotSwarmConfig = {
  slackHandRaiseBot1: {
    type: 'SLACK',
    config: {
      token: env.SLACK_API_KEY,
      name: 'Hand raiser'
    }
  },
  reactNativeHandRaiseBot1: {
    type: 'WEBSOCKET',
    config: {
      
    }
  }
};

var minnesotaBotSwarm = new BotSwarm(minnesotaBotSwarmConfig);



const {
  slackHandRaiseBot1: handraiser
} = minnesotaBotSwarm.startAllBots();

const bot = handraiser.bot;

bot
  .on('start', () => {
    const params = {
        icon_emoji: ':hand::skin-tone-4:'
    };
    bot.postMessageToChannel('testingchannel', 'I need help!', params).fail((e)=>console.error(e));
    // bot.postMessageToUser('jim.instructor', 'I need help!', params);
    
    console.log('started slack bot');
  }).on('message', (m) => {
    //console.log('slack msg:', msg);
    if (m.text && m.text.trim() === '@hand up') {
      console.log(m.user + ' raised hand!');
      bot.postMessageToUser('jim.instructor', 'You are now in the queue.', Object.assign(params, { slackbot: true }))
      
      // send the current queue to all users
    } else if (m.text && m.text.trim() === '@hand down') {
      console.log(m.user + ' put hand down');
    }
  });
