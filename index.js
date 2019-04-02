const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConfig = require('./data/dbConfig.js');
const auth = require('./controllers/auth/auth.routes.js');
const restricted = require('./controllers/restricted/restricted.model.js');

const server = express();

const sessionConfig = {
  name: 'user session id', // defaults to sid
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 10 * 6, // milliseconds
    secure: false, // use cookie over https
    httpOnly: true, // false means JS can access the cookie on the client
  },
  resave: false, // avoid recreating unchanged sessions
  saveUninitialized: false, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConfig,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // delete expired sessions
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api/auth/', auth);
server.use('/api/restricted', restricted);

server.listen(5000, console.log('Listening on Port 5000'));