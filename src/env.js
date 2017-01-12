const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');
require('dotenv-safe').config(PROJECT_ROOT);

function ensure(environmentVars) {
  var env = {};
  environmentVars.map((environmentVar) => {
    if (!process.env[environmentVar] || process.env[environmentVar].length <= 0) {
      throw Error(
        `The ${environmentVar} environment variable is required. Ensure you have copied .env.example to .env in ${PROJECT_ROOT}`
      );
    }
    env[environmentVar] = process.env[environmentVar];
  });
  return env;
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

// non default export example:
exports.ensure = ensure;

module.exports = exports;
