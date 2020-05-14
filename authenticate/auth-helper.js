const db = require("../database/dbConfig");

module.exports = {
  findUserById,
  findUserBy
};

function findUserBy(filter) {
  return db('users')
    .where(filter)
    .first()
}

function findUserById(id) {
  return db("users")
    .select("id", "email")
    .where({ id })
    .first();
}
