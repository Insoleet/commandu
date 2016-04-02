const express = require('express');

const server = express();

require('./lib/conf/engine')(server);
require('./lib/conf/routes')(server);
server.db = require('./lib/conf/db')(server);
require('./lib/middlewares/passport')(server);

module.exports = server;
