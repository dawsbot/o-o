const chalk = require('chalk');
const logSymbols = require('log-symbols');

function log(msg) {
  return console.log(chalk.white(msg));
}

function logError(msg) {
  return console.log(chalk.red(msg));
}
function logSuccess(msg) {
  console.log(`${logSymbols.success} ${msg}`);
}

module.exports = {
  log,
  logError,
  logSuccess
};
