const router = require('express').Router();
const restricted = require('../mw/auth.mw.js');

router.get('/', restricted, (req, res) => {
  res.status(201).json({ message: 'Yo! Your authenticated to see this page' });
});

router.get('/:sub', restricted, (req, res) => {
  res.status(201).json({ message: 'Yo! Your authenticated to see this page' });
});

module.exports = router;