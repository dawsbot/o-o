const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const preReadme = fs.readFileSync(path.join('.docs', 'readme.md'), 'utf8');
const preCli = fs.readFileSync(path.join('.docs', 'cli.md'), 'utf8');

const config = {
  usage: require(path.join(__dirname, '.docs', 'usage.js')),
  packageJson: require(path.join(__dirname, 'package'))
};

config.cliMd = handlebars.compile(preCli)(config);

const postReadme = handlebars.compile(preReadme)(config);

fs.writeFileSync('readme.md', postReadme, 'utf8');
