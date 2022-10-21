const { Server } = require('./models/server.js');

require('dotenv').config();
require('./models/server.js')

const server = new Server();
server.listen();
