#!/usr/bin/env node
'use strict';
const path = require('path');
const meow = require('meow');
const updateNotifier = require('update-notifier');

const usage = require(path.join('..', '.docs', 'usage'));
const cli = meow([usage]);
const Conf = require('dotless-conf');
const logging = require('./logging.js');
const o = require('./');

const conf = new Conf();

updateNotifier({pkg: cli.pkg}).notify();

const alias = cli.input[0];
const rest = cli.input.slice(1);

if (typeof alias === 'undefined') {
  // user entered no commands, nor aliases
  console.log(o.ls());
} else if (alias in o) {
  // valid o command
  if (alias === 'new') {
    o.new(rest[0], rest[1])
    .then(resp => {
      logging.logSuccess(`Created new alias ${resp}`);
    });
  } else if (alias === 'clear') {
    o.clear().then(response => {
      logging.logSuccess(response);
    });
  } else if (alias === 'rm') {
    logging.logSuccess(`Deleted ${o.rm(rest[0])}`);
  } else {
    logging.log(o[alias](rest));
  }
} else if (conf.has(alias)) {
  o.open(alias, rest)
    .then(resp => {
      logging.log(`opening ${resp}`);
    });
    // TODO: handle errors here. For some reason unfound file errors are quietly swallowed
} else {
  logging.logError('input arg(s) not recognized.');
  console.log(cli.help);
}
