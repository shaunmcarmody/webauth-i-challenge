const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./users.model');

router.post('/register', async (req, res, next) => {
  // Username and Password required
  req.body.password = bcrypt.hashSync(req.body.password, 4);
  try {
    const result = await db.insertUser(req.body);
    const { username } = await db.returnUser(result[0]);
    res.status(200).json({ message: `Welcome ${username}! You've registered successfully` })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', (req, res, next) => {
  // Username and Password required
});

router.get('/users', (req, res, next) => {
  // Return users if logged in
  // 'You shall not pass!' if not logged in
});



module.exports = router