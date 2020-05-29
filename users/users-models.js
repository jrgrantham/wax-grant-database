const db = require("../database/dbConfig");

module.exports = {
  findUserBy,
  findUserById,
  updateUserSettings,
  findRisksByUserId,
  addRisk,
  updateRisk,
  delRisk,
  getTemplates,
  addTemplate,
  updateTemplate,
  delTemplate,
  getClients,
  addClient,
  delClient,
};

// ----- USER ----- //

function findUserBy(filter) {
  return db("users").where(filter).first();
}

function findUserById(id) {
  return db("users").where({ id }).first();
}

function updateUserSettings(id, changes) {
  console.log(id, changes);
  return db("users").where({ id }).update(changes);
}

function getClients() {
  return db("users").select("users.id", "users.company", "users.email");
}
async function addClient(client) {
  // console.log(client);
  const [id] = await db("users").insert(client, "id");
  // console.log(id);
  return findUserById(id);
}
function delClient(id) {
  // console.log(id);
  return db("users").where({id}).del();
}

// ----- RISKS ----- //

function findRisksByUserId(id) {
  return db("risks as r")
    .join("users as u", "r.projectId", "u.id")
    .select(
      "u.id as userId",
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
  // console.log(risk);

  await db("risks").insert(risk);
  const projectId = risk.projectId;
  // console.log(projectId);
  return findRisksByUserId(projectId);
}

function updateRisk(id, changes) {
  return db("risks").where({ id }).update(changes);
}

function delRisk(id) {
  return db("risks").where({ id }).del();
}

// ----- TEMPLATES ----- //

function getTemplates() {
  return db("templates");
}
function updateTemplate(id, changes) {
  return db("templates").where({ id }).update(changes);
}
async function addTemplate(risk) {
  await db("templates").insert(risk);
  return getTemplates();
}
function delTemplate(id) {
  return db("templates").where({ id }).del();
}
