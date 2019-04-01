const db = require('../../data/dbConfig.js');

const getUser = username =>
  db('users')
    .where('username', username)
    .first()

const insertUser = user =>
  db('users')
    .insert(user);

const returnUser = id =>
  db('users')
    .where('id', id)
    .select('username')
    .first()


module.exports = {
  getUser,
  insertUser,
  returnUser

}