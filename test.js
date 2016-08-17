import test from 'ava';
import Conf from 'dotless-conf';
import execa from 'execa';
import o from './lib';

const conf = new Conf();
const cliPath = './lib/cli.js';

test('api rm', t => {
  const aliasName = 'testAliasRmApi';
  const aliasPath = 'http://exampleRmApi.com';
  conf.set(aliasName, aliasPath);
  t.is(o.rm(aliasName), aliasPath);
  t.is(conf.has(aliasName), false);

  t.throws(() => {
    o.rm('randomAliasThatDoesNotExistInYourConfig');
  });
  conf.delete(aliasName);
});

test('cli rm', async t => {
  const aliasName = 'testAliasRmCli';
  const aliasPath = 'http://exampleRmCli.com';
  conf.set(aliasName, aliasPath);
  await execa(cliPath, ['rm', aliasName]);
  t.is(conf.has(aliasName), false);
  conf.delete(aliasName);
});

test('api ls', t => {
  const aliasName = 'testAliasApiLs';
  const aliasPath = 'http://exampleApiLs.com';
  conf.set(aliasName, aliasPath);
  t.is(typeof o.ls(), 'string');
  t.regex(o.ls(), new RegExp(aliasPath));
  conf.delete(aliasName);
});

// "cli ls" not worth mocking

test('api new', t => {
  const aliasName = 'testAliasNewApi';
  const aliasPath = 'http://exampleNewApi.com';
  o.new(aliasPath, aliasName)
  .then(resp => {
    t.is(resp, aliasName);
    t.is(conf.get(aliasName), aliasPath);
    conf.delete(aliasName);
  });
});

test('cli new', async t => {
  const aliasName = 'testAliasNewCli';
  const aliasPath = 'http://exampleNewCli.com';
  await execa(cliPath, ['new', aliasPath, aliasName]);
  t.is(conf.get(aliasName), aliasPath);
  conf.delete(aliasName);
});

test('api o one arg', t => {
  const aliasName = 'testAliasOApi';
  const aliasPath = 'http://exampleO.com/{{o0}}';
  const oArg1 = 'oArg1';
  conf.set(aliasName, aliasPath);
  o.open(aliasName, oArg1)
  .then(resp => {
    t.is(resp, 'http://exampleO.com/oArg1');
  });
  conf.delete(aliasName);
});

test('api o two args', t => {
  const aliasName = 'testAliasOCli';
  const aliasPath = 'http://exampleO.com/{{o0}}/{{o1}}';
  const oArg1 = 'oArg1';
  const oArg2 = 'oArg2';
  conf.set(aliasName, aliasPath);
  o.open(aliasName, [oArg1, oArg2])
  .then(resp => {
    t.is(resp, 'http://exampleO.com/oArg1/oArg2');
  });
  conf.delete(aliasName);
});
