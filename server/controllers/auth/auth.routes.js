const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth.model');
const jwt = require('jsonwebtoken');
const restricted = require('../mw/auth.mw.js');

router.post('/register', async (req, res) => {
  // Username and Password required
  req.body.password = bcrypt.hashSync(req.body.password, 4);
  try {
    const id = await db.insertUser(req.body);

    const token = jwt.sign({ data: id[0] }, 'secret', { expiresIn: 60 * 60000 });
    req.session.user = id[0];

    res.status(201).json({ payload: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Username and Password required
  let { username, password } = req.body;
  try {
    const user = await db.getUser(username);
    const result = bcrypt.compareSync(password, user.password);
    
    if (result) {
      const { id } = user;

      const token = jwt.sign({ data: id }, 'secret', { expiresIn: 60 * 60000 });
      req.session.userId = id;
      
      res.status(200).json({ payload: token });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', async (req, res) => {
  console.log(req.headers.authorization);
  console.log(req.session);
  const token = req.headers.Authorization
});

module.exports = router