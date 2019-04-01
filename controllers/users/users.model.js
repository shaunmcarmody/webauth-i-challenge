const db = require('../../data/dbConfig.js');

const returnUser = id =>
  db('users')
    .where('id', id)
    .select('username')
    .first()

const insertUser = user =>
  db('users')
    .insert(user);



module.exports = {
  returnUser,
  insertUser
}