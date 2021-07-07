module.exports = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json(err)
  }
};