'use strict';
const Conf = require('dotless-conf');
const arrify = require('arrify');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const opn = require('opn');

const defaultConf = {
  o: 'https://github.com/dawsonbotsford/o-o',
  so: 'https://stackoverflow.com/search?q={{o0}}',
  g: 'https://github.com/{{o0}}/{{o1}}'
};
const conf = new Conf({
  default: defaultConf
});
const opnOptions = {
  wait: false
};

const questions = require('./questions');

function setNewO(conf, path, alias) {
  const reservedAliases = ['open', 'clear', 'ls', 'path', 'rm', 'new'];
  if (reservedAliases.indexOf(alias) > -1) {
    throw new Error(`Invalid alias. "${alias}" is reserved`);
  }
  conf.set(alias, path);
  return alias;
}

function clear() {
  return inquirer.prompt(questions.clearOQuestion).then(answers => {
    if (answers.clear) {
      conf.clear();
      return 'All bookmarks cleared';
    }
    return 'Nothing was cleared';
  });
}

function ls() {
  return JSON.stringify(conf.store, null, 2);
}

function path() {
  return conf.path;
}

function rm(alias) {
  if (Array.isArray(alias)) {
    alias = alias[0];
  }
  if (conf.has(alias)) {
    const path = conf.get(alias);
    conf.delete(alias);
    return path;
  }
  const errMessage = `alias "${alias}" not found`;
  throw new Error(errMessage);
}

function newO(path, alias) {
  return new Promise(resolve => {
    if (typeof alias !== 'undefined' && typeof path !== 'undefined') {
      resolve(setNewO(conf, path, alias));
    } else {
      // user entered neither a command nor an alias.
      // thus, prompt & save new alias
      inquirer.prompt(questions.newOQuestions).then(answers => {
        resolve(setNewO(conf, answers.path, answers.alias));
      });
    }
  });
}

function open(alias, rest) {
  rest = arrify(rest);
  // user-entered alias that exists in saved conf
  const path = conf.get(alias);
  const templateCount = (path.match(/{{{?/g) || []).length;
  const restLength = rest.length;

  if (templateCount === 0) {
    // a template-less alias
    return new Promise((resolve, reject) => {
      opn(path, opnOptions)
      .then(() => {
        resolve(path);
      })
      .catch(err => {
        reject(new Error(err));
      });
    });
  } else if (templateCount <= restLength) {
    // an alias with dynamic template strings and valid arg length
    let aliasObj = {};
    for (let i = 0; i < restLength; i++) {
      aliasObj[`o${i}`] = rest[i];
    }
    const renderedUrl = handlebars.compile(path)(aliasObj);
    return new Promise(resolve => {
      opn(renderedUrl, opnOptions)
      .then(() => {
        resolve(renderedUrl);
      })
      .catch(err => {
        throw new Error(err);
      });
    });
  }

  // an alias with dynamic teplate strings and invalid arg length
  throw new Error(`${alias} expects ${templateCount} arg${(templateCount > 1) ? 's' : ''}, found ${restLength}.`);
}

module.exports = {
  open,
  clear,
  ls,
  path,
  rm,
  new: newO
};
