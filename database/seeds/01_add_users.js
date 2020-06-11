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
      company: "Developer",
      admin: true,
      exportSpreadsheet: true,
      useTemplates: true,
      fontSize: 8,

      nature: "nature 1",
      type: "projectType 1",
      project: "enter project...",
      application: "enter application...",
      selected: "managerial",

      ai: true,
      dlt: false,
      man: true,
      flavour: "flavour 3",
      appendixRef: "enter appendix ref",
      maxCharacters: 350,

      manDisplay: true,
      manDisplayChangeable: false,
      manDefaultOwner: "JG",
      manColor: "#659AD2",
      manMaxRisks: 5,

      tecDisplay: true,
      tecDisplayChangeable: false,
      tecDefaultOwner: "JG",
      tecColor: "#B3C78F",
      tecMaxRisks: 5,

      comDisplay: true,
      comDisplayChangeable: false,
      comDefaultOwner: "JG",
      comColor: "#C28B9A",
      comMaxRisks: 5,

      legDisplay: true,
      legDisplayChangeable: true,
      legDefaultOwner: "JG",
      legColor: "#9697CB",
      legMaxRisks: 5,

      envDisplay: true,
      envDisplayChangeable: true,
      envDefaultOwner: "JG",
      envColor: "#B6DEC2",
      envMaxRisks: 5,
    },
    {
      email: "damien@wax-rdc.com",
      password: bcrypt.hashSync("1234", 10),
      company: "Wax-RCD",
      admin: true,
      useTemplates: true,
      exportSpreadsheet: false,
      fontSize: 8,

      nature: "",
      type: "",
      project: "",
      application: "",
      selected: "managerial",

      ai: true,
      dlt: true,
      man: true,
      flavour: "",
      appendixRef: "",
      maxCharacters: 350,

      manDisplay: true,
      manDisplayChangeable: false,
      manDefaultOwner: "",
      manColor: "#659AD2",
      manMaxRisks: 5,

      tecDisplay: true,
      tecDisplayChangeable: false,
      tecDefaultOwner: "",
      tecColor: "#B3C78F",
      tecMaxRisks: 5,

      comDisplay: true,
      comDisplayChangeable: false,
      comDefaultOwner: "",
      comColor: "#C28B9A",
      comMaxRisks: 5,

      legDisplay: true,
      legDisplayChangeable: true,
      legDefaultOwner: "",
      legColor: "#9697CB",
      legMaxRisks: 5,

      envDisplay: true,
      envDisplayChangeable: true,
      envDefaultOwner: "",
      envColor: "#B6DEC2",
      envMaxRisks: 5,
    },
    {
      email: "casper@wax-rdc.com",
      password: bcrypt.hashSync("1234", 10),
      company: "Wax-RCD",
      admin: true,
      useTemplates: true,
      exportSpreadsheet: true,
      fontSize: 8,

      nature: "",
      type: "",
      project: "",
      application: "",
      selected: "",

      ai: true,
      dlt: true,
      man: true,
      flavour: "",
      appendixRef: "",
      maxCharacters: 350,

      manDisplay: true,
      manDisplayChangeable: false,
      manDefaultOwner: "",
      manColor: "#659AD2",
      manMaxRisks: 5,

      tecDisplay: true,
      tecDisplayChangeable: false,
      tecDefaultOwner: "",
      tecColor: "#B3C78F",
      tecMaxRisks: 5,

      comDisplay: true,
      comDisplayChangeable: false,
      comDefaultOwner: "",
      comColor: "#C28B9A",
      comMaxRisks: 5,

      legDisplay: true,
      legDisplayChangeable: true,
      legDefaultOwner: "",
      legColor: "#9697CB",
      legMaxRisks: 5,

      envDisplay: true,
      envDisplayChangeable: true,
      envDefaultOwner: "",
      envColor: "#B6DEC2",
      envMaxRisks: 5,
    },
  ]);
  // });
};
