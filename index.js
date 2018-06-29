#!/usr/bin/env node

const package = require('./package.json');
const program = require('commander');

program
    .version(package.version, '-v, --version')
    .option('-t, --theme <theme>', 'set theme')
    .option('--verbose', 'provide additional logging information')
    .parse(process.argv);


const sequences = require('./sequences');
const log = require('console-emoji');
log(`:sparkles: Starting Biotope Build (v${package.version}) with :sparkling_heart:for Frontend Developers around the world :sparkles:\n`, 'green');

for(let sequence of sequences['build']) {
    const package = require(`biotope-build-${sequence}`);

    // TODO return object and always log from here with clear structure
    package.log();

    // TODO add local config here
    package.init({});
}


// TODO move to repo: biotope-build-connect-livereload
const connect  = require('connect');
const serveStatic = require('serve-static');
const connectLivereload = require('connect-livereload');
const server = connect();

server.use(connectLivereload({ port: 35729 }));
server.use(serveStatic(__dirname + '/livereload'));

server.listen(3000);

const livereload = require('livereload');
const reloadServer = livereload.createServer({
    port: 35729
});
reloadServer.watch(__dirname + '/livereload');
