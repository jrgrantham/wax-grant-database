const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex("users")
  //   .truncate()
  //   .then(function () {
  // Inserts seed entries
  return knex("users").insert([
    {
      email: "james.r.grantham@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      company: "Company",
      admin: true,
      useTemplates: true,
      exportSpreadsheet: false,

      nature: "nature 3",
      type: "projectType 4",
      project: "Reacher",
      application: "",
      selected: "managerial", // project risk

      ai: true, // admin
      dlt: false, // admin
      man: true, // admin
      flavour: "flavour 3", // admin
      appendixRef: "reference", // admin
      maxCharacters: 350, // admin

      manDisplay: true, // admin
      manDisplayChangeable: false,
      manDefaultOwner: "JG",
      manColor: "orange",
      manMaxLength: 100, // admin
      manMaxRisks: 5, // admin

      tecDisplay: true, // admin
      tecDisplayChangeable: false,
      tecDefaultOwner: "JG",
      tecColor: "red",
      tecMaxLength: 100, // admin
      tecMaxRisks: 5, // admin

      comDisplay: true, // admin
      comDisplayChangeable: false,
      comDefaultOwner: "JG",
      comColor: "green",
      comMaxLength: 100, // admin
      comMaxRisks: 5, // admin

      legDisplay: true, // admin
      legDisplayChangeable: true,
      legDefaultOwner: "JG",
      legColor: "blue",
      legMaxLength: 100, // admin
      legMaxRisks: 5, // admin

      envDisplay: true, // admin
      envDisplayChangeable: true,
      envDefaultOwner: "JG",
      envColor: "yellow",
      envMaxLength: 100, // admin
      envMaxRisks: 5, // admin
    },
    {
      email: "admin@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      company: "Company",
      admin: true,
      useTemplates: true,
      exportSpreadsheet: false,

      nature: "nature 3",
      type: "projectType 4",
      project: "Reacher",
      application: "",
      selected: "managerial", // project risk

      ai: true, // admin
      dlt: false, // admin
      man: true, // admin
      flavour: "flavour 3", // admin
      appendixRef: "reference", // admin
      maxCharacters: 350, // admin

      manDisplay: true, // admin
      manDisplayChangeable: false,
      manDefaultOwner: "JG",
      manColor: "orange",
      manMaxLength: 100, // admin
      manMaxRisks: 5, // admin

      tecDisplay: true, // admin
      tecDisplayChangeable: false,
      tecDefaultOwner: "JG",
      tecColor: "red",
      tecMaxLength: 100, // admin
      tecMaxRisks: 5, // admin

      comDisplay: true, // admin
      comDisplayChangeable: false,
      comDefaultOwner: "JG",
      comColor: "green",
      comMaxLength: 100, // admin
      comMaxRisks: 5, // admin

      legDisplay: true, // admin
      legDisplayChangeable: true,
      legDefaultOwner: "JG",
      legColor: "blue",
      legMaxLength: 100, // admin
      legMaxRisks: 5, // admin

      envDisplay: true, // admin
      envDisplayChangeable: true,
      envDefaultOwner: "JG",
      envColor: "yellow",
      envMaxLength: 100, // admin
      envMaxRisks: 5, // admin
    },
    {
      email: "example1@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      company: "Company",
      admin: false,
      useTemplates: false,
      exportSpreadsheet: false,

      nature: "nature 3",
      type: "projectType 4",
      project: "Reacher",
      application: "",
      selected: "managerial", // project risk

      ai: true, // admin
      dlt: false, // admin
      man: true, // admin
      flavour: "flavour 3", // admin
      appendixRef: "reference", // admin
      maxCharacters: 350, // admin

      manDisplay: true, // admin
      manDisplayChangeable: false,
      manDefaultOwner: "JG",
      manColor: "orange",
      manMaxLength: 100, // admin
      manMaxRisks: 5, // admin

      tecDisplay: true, // admin
      tecDisplayChangeable: false,
      tecDefaultOwner: "JG",
      tecColor: "red",
      tecMaxLength: 100, // admin
      tecMaxRisks: 5, // admin

      comDisplay: true, // admin
      comDisplayChangeable: false,
      comDefaultOwner: "JG",
      comColor: "green",
      comMaxLength: 100, // admin
      comMaxRisks: 5, // admin

      legDisplay: true, // admin
      legDisplayChangeable: true,
      legDefaultOwner: "JG",
      legColor: "blue",
      legMaxLength: 100, // admin
      legMaxRisks: 5, // admin

      envDisplay: true, // admin
      envDisplayChangeable: true,
      envDefaultOwner: "JG",
      envColor: "yellow",
      envMaxLength: 100, // admin
      envMaxRisks: 5, // admin
    },
  ]);
  // });
};
