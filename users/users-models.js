const db = require("../database/dbConfig");

module.exports = {
  findRisksByUserId,
  getTemplates,
  getClients,
};

function findRisksByUserId(id) {
  return db("risks as r")
    .join("users as u", "r.projectId", "u.id")
    .select(
      "u.email",
      "r.type",
      "r.description",
      "r.probability",
      "r.consequence",
      "r.risk",
      "r.mitigation",
      "r.owner",
      "r.id"
    )
    .where("u.id", id);
}

function getTemplates() {
  return db("templates");
}

function getClients() {
  return db("users").select("users.company", "users.email");
}
