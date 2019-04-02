const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth.model');
const restricted = require('../mw/auth.mw.js');

router.post('/register', async (req, res) => {
  // Username and Password required
  req.body.password = bcrypt.hashSync(req.body.password, 4);
  try {
    await db.insertUser(req.body);
    const { username } = await db.getUser(req.body.username);
    req.session.user = username;
    res.status(201).json({ message: `Welcome ${username}! You've registered successfully` })
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
      req.session.user = user.username;
      res.status(200).json({ message: 'Logged In' });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', restricted, async (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ message: "You're now logged out" });
      }
    })
  }
});

module.exports = router