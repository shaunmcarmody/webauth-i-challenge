exports.up = knex =>
  knex.schema
    .createTable('users', tbl => {
      tbl.increments();

      tbl
        .string('username')
        .unique()
        .notNullable()

      tbl
        .string('password')
        .notNullable()
    })

exports.down = knex => knex.dropTableIfExists('users');