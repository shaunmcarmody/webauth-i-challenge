const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const users = require('./controllers/users/users.routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/', users);

server.listen(5000, console.log('Listening on Port 5000'));