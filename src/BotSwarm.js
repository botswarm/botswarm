const SlackBot = require('slackbots');

class BotSwarm {
  constructor(botParameters) {
    const parsedParameters = this.parse(botParameters);
    this._bots = this.assignBots(parsedParameters);
  }
  parse(params) {
    return Object.keys(params).map((key) => {
        
      const botObject = Object.assign(params[key], {
        __botswarm__original__key: key
      });
      return botObject;
    });
  }
  assignBots(bots) {
    return bots.map((bot) => {
      return this.assignBot(bot);
    }).filter((bot) => {
      return typeof bot !== 'undefined';
    });
  }
  assignBot(bot) {
    let starter;
    switch(bot.type) {
      case 'SLACK':
        starter = () => { return new SlackBot(bot.config) }
        return Object.assign(bot, {
          __dangerous_raw: starter,
          start: starter
        });
    }
  }
  getBotsAsRawArray() {
    //console.log(this._bots);
    return this._bots;
  }
  getBots() {
    // immutably remove the original keys
    return this._bots.reduce((a,v) => {
      const cleanedBot = {};
      const strippedBot = Object.assign({}, v);
      delete strippedBot.__botswarm__original__key;
      cleanedBot[v.__botswarm__original__key] = Object.assign({}, strippedBot);
      return Object.assign(a, cleanedBot);
    }, {});
  }
  startAllBots() {
    const bots = this.getBots();
    let finalBots = {};
    
    
    Object.keys(bots).map((key) => {
      console.log('starting', bots[key]);
      finalBots[key] = Object.assign(bots[key], {bot: bots[key].start()});
    });
    console.log('finalbots', finalBots);
    return finalBots;
  }
  start() {
    console.log(this.botParameters);
  }
}

var _extends = function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }

  return target;
};

exports['default'] = BotSwarm;

module.exports = _extends(exports['default'], exports);
