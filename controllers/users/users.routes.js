const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./users.model');

const restricted = (req, res, next) => {
  const { auth } = req.headers;
  if (auth === 'true') {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
}

router.post('/register', async (req, res, next) => {
  // Username and Password required
  req.body.password = bcrypt.hashSync(req.body.password, 4);
  try {
    const result = await db.insertUser(req.body);
    const { username } = await db.returnUser(result[0]);
    res.status(201).json({ message: `Welcome ${username}! You've registered successfully` })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res, next) => {
  // Username and Password required
  let { username, password } = req.body; 
  try {
    const user = await db.getUser(username);
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      res.status(200).json({ message: 'Logged In' });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', restricted, async (req, res, next) => {
  try {
    const resource = await db.getUsers();
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json(err);    
  }
});

module.exports = router