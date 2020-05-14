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
      ]);
    });
};
