const db = require("../database/dbConfig");

module.exports = {
  findRisksByUserId,
  addRisk,
  delRisk,
  getTemplates,
  getClients,
  findUserBy,
  findUserById,
};

function findUserBy(filter) {
  return db("users").where(filter).first();
}

function findUserById(id) {
  return db("users").where({ id }).first();
}

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

async function addRisk(risk) {
  await db('risks').insert(risk)
  const projectId = risk.projectId
  console.log(projectId);
  return findRisksByUserId(projectId)
}

function delRisk(id) {
  return db('risks')
    .where({id})
    .del()
}

function getTemplates() {
  return db("templates");
}
function editTemplates() {
  return db("templates");
}
function addTemplates() {
  return db("templates");
}
function delTemplates() {
  return db("templates");
}

function getClients() {
  return db("users").select("users.company", "users.email");
}
function editClients() {
  return db("users").select("users.company", "users.email");
}
function addClients() {
  return db("users").select("users.company", "users.email");
}
function delClients() {
  return db("users").select("users.company", "users.email");
}
