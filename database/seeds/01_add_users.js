const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "james.r.grantham@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: true,
          useTemplates: true,
          exportSpreadsheet: false
        },
        {
          email: "admin@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: true,
          useTemplates: true,
          exportSpreadsheet: false
        },
        {
          email: "example1@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: false,
          useTemplates: false,
          exportSpreadsheet: false
        },
        {
          email: "example2@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: false,
          useTemplates: false,
          exportSpreadsheet: false
        },
        {
          email: "example3@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: false,
          useTemplates: false,
          exportSpreadsheet: false
        },
        {
          email: "example4@gmail.com",
          password: bcrypt.hashSync("1234", 10),
          admin: false,
          useTemplates: false,
          exportSpreadsheet: false
        },
      ]);
    });
};
