<p align="center">
  <img src="media/logo.png"/>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/o-o">
    <img src="https://img.shields.io/npm/v/o-o.svg" alt="npm version"/>
  </a>
  <a href="https://travis-ci.org/dawsonbotsford/o-o">
    <img src="https://travis-ci.org/dawsonbotsford/o-o.svg?branch=master" alt="build status"/>
  </a>
  <a href="https://github.com/sindresorhus/xo">
    <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="xo code style"/>
  </a>
</p>

> a cli for opening things like url's and files (pronounced "oh oh")

<br>

## Install

```sh
$ npm install --global o-o
```

## Usage

```sh
$ o <alias>
```

Opens the `path` associated with `<alias>`.

<br>

For example:

```sh
$ o o
# opens https://github.com/dawsonbotsford/o-o in your browser
```

<br>

Print saved aliases:

```sh
$ o ls
# {
#   "o": "https://github.com/dawsonbotsford/o-o",
#   "so": "https://stackoverflow.com/search?q={{o0}}",
#   "g": "https://github.com/{{o0}}/{{o1}}"
# }
```

<br>

`o` can also be used with dynamic `path`'s:

```sh
$ o so "that thing I can never remember how to do"
# opens https://stackoverflow.com/search?q=that%20thing%20I%20can%20never%20remember%20how%20to%20do in your browser
```

<br/>

Add your own:

```sh
$ o new
# spawns an informative prompt for you to save a new alias
```

The verbose way

```sh
$ o new https://facebook.com fb
```

<br/>

It's not just for url's:

```sh
$ o new /Users/dawsonbotsford/code/o-o/readme.md or

$ o or
# opens file with default application
```

<br>

Help:

```sh
$ o --help

  Usage
    $ o [alias|command] [, arguments]

  Examples
    $ o # create new alias
    $ o new # create or rename alias
    $ o ls # print list of saved aliases
    $ o rm <alias> # delete an alias
    $ o clear # delete all
    $ o path # print file path to alias file
```

<br>

## Dynamic Templating

Aliases can (optionally) have [handlebars](http://handlebarsjs.com/) templates. This allows arguments to be dynamically inserted into a `path`. If you have never used handlebars, don't fear. It's simple.

`o` handlebars templates are 0-indexed, just like an array. They begin at `o0` and continue to `o1`, `o2`, etc.

Here's another example:

```sh
$ o so "how to do something"
# o retrieves "https://stackoverflow.com/search?q={{o0}}" and
# replaces "{{o0}}" with url-encoded "how to do something"
```

Here's a fun example of making a sub-reddit alias

```sh
$ o new https://reddit.com/r/{{o0}} reddit
# ✔ Created new alias reddit

$ o reddit node
# opens https://www.reddit.com/r/node in browser
```

<br>

## Backup important aliases

Are you saving important aliases or a large amount of them? If so, back these up, it's always possible they get corrupted.

#### Backup to Dropbox

First find the path your config file is saved in:

```sh
$ o path
# /Users/dawsonbotsford/Library/Preferences/o-o-nodejs/config.json
```

This file needs to be moved into Dropbox and symlinked back to the original location

```sh
mv /Users/dawsonbotsford/Library/Preferences/o-o-nodejs/config.json ~/Dropbox/
ln -s ~/Dropbox/config.json /Users/dawsonbotsford/Library/Preferences/o-o-nodejs/config.json
```

#### Backup to git

Alternatively, use git to manually version control.

```sh
$ o path
# /Users/dawsonbotsford/Library/Preferences/o-o-nodejs/config.json
$ cd /Users/dawsonbotsford/Library/Preferences/o-o-nodejs/
$ git init
# add remote, and push!
```

<br>

## License

MIT © [Dawson Botsford](http://dawsonbotsford.com)
