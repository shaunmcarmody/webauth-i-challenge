const db = require('../../data/dbConfig.js');

const getUser = username =>
  db('users')
    .where('username', username)
    .first()

const getUsers = () =>
  db('users')
    .select('username')

const insertUser = user =>
  db('users')
    .insert(user);

module.exports = {
  getUser,
  getUsers,
  insertUser
}