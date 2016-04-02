const express = require('express');

const server = express();

require('./lib/conf/engine')(server);
require('./lib/conf/routes')(server);
require('./lib/conf/db')(server);

module.exports = server;
