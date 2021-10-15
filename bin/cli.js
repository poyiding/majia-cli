#! /usr/bin/env node

const { version } = require('../package.json');
const program = require('commander');
const create = require('./create');

program
.command('create <project-name>')
.description('create a new project')
// .option('-f, --force', 'overwrite target directory if it exist' )
.action((name) => { 
  create(name); 
})
program
  .version(version)
  .usage('<command> [option]')

program.parse()
