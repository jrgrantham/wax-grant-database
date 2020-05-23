const router = require("express").Router();
const Users = require("./users-models");
const bcrypt = require("bcryptjs");

// ----- USER ----- //

router.get("/user", (req, res) => {
  Users.findUserById(req.decodedToken.id)
    .then((settings) => {
      settings.password = "";
      res.json(settings);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "could not get user data. " + error.message });
    });
});

router.put("/user", (req, res) => {
  if (req.body.key === "admin") {
    res.json({ message: "cheeky fucker" });
  } else if (
    (req.body.key === "useTemplates" || req.body.key === "exportSpreadsheet") &&
    !req.body.key === "admin"
  ) {
    res.json({ message: "cheeky fucker" });
  } else {
    const userID = req.body.id;
    if (req.body.key === "password") {
      const newPassword = bcrypt.hashSync(req.body.value, 10);
      req.body.value = newPassword;
    }
    const changes = {
      [req.body.key]: req.body.value,
    };

    Users.updateUserSettings(userID, changes)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "could not get risks " + error.message });
      });
  }
});

// ----- ADMIN ----- //

router.get("/clients", (req, res) => {
  if (req.decodedToken.admin) {
    Users.getClients()
      .then((clients) => {
        res.json(clients);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "could not get clients. " + error.message });
      });
  } else {
    res.json({ message: "access denied" });
  }
});

// use params here for admin.
// check if admin first.
router.get("/client/:id", (req, res) => {
  if (req.decodedToken.admin) {
    Users.findUserById(req.params.id)
      .then((settings) => {
        settings.password = "";
        settings.admin = true;
        res.json(settings);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "could not get user data. " + error.message });
      });
  } else {
    res.json({ message: "access denied" });
  }
});
router.post("/client", (req, res) => {
  const newClient = {
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
    company: req.body.company,
    nature: req.body.nature,
    type: req.body.type,
    project: req.body.project,
    application: req.body.application,
    selected: req.body.selected,

    ai: req.body.ai,
    dlt: req.body.dlt,
    man: req.body.man,
    useTemplates: req.body.useTemplates,
    exportSpreadsheet: req.body.exportSpreadsheet,
    flavour: req.body.flavour,
    appendixRef: req.body.appendixRef,
    maxCharacters: req.body.maxCharacters,

    manDisplay: req.body.manDisplay,
    manDisplayChangeable: req.body.manDisplayChangeable,
    manDefaultOwner: req.body.manDefaultOwner,
    manColor: req.body.manColor,
    manMaxLength: req.body.manMaxLength,
    manMaxRisks: req.body.manMaxRisks,

    tecDisplay: req.body.tecDisplay,
    tecDisplayChangeable: req.body.tecDisplayChangeable,
    tecDefaultOwner: req.body.tecDefaultOwner,
    tecColor: req.body.tecColor,
    tecMaxLength: req.body.tecMaxLength,
    tecMaxRisks: req.body.tecMaxRisks,

    comDisplay: req.body.comDisplay,
    comDisplayChangeable: req.body.comDisplayChangeable,
    comDefaultOwner: req.body.comDefaultOwner,
    comColor: req.body.comColor,
    comMaxLength: req.body.comMaxLength,
    comMaxRisks: req.body.comMaxRisks,

    legDisplay: req.body.legDisplay,
    legDisplayChangeable: req.body.legDisplayChangeable,
    legDefaultOwner: req.body.legDefaultOwner,
    legColor: req.body.legColor,
    legMaxLength: req.body.legMaxLength,
    legMaxRisks: req.body.legMaxRisks,

    envDisplay: req.body.envDisplay,
    envDisplayChangeable: req.body.envDisplayChangeable,
    envDefaultOwner: req.body.envDefaultOwner,
    envColor: req.body.envColor,
    envMaxLength: req.body.envMaxLength,
    envMaxRisks: req.body.envMaxRisks,
  };
  Users.addClient(newClient)
    .then((client) => {
      res.json(client);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "could not get cleint " + error.message });
    });
});
router.delete("/client", (req, res) => {
  const id = req.body.id;
  Users.delClient(id)
    .then(() => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(500).json({
        message: `error deleting ${error.message}`,
      });
    });
});

// ----- RISKS ----- //

router.get("/risks/:id", (req, res) => {
  Users.findRisksByUserId(req.params.id)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "could not get risks. " + error.message });
    });
});

router.delete("/risks", (req, res) => {
  const id = req.body.id;
  Users.delRisk(id)
    .then(() => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(500).json({
        message: `error deleting ${error.message}`,
      });
    });
});

router.post("/risks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newRow = {
    projectId: id,
    type: req.body.type,
    description: req.body.description,
    probability: req.body.probability,
    consequence: req.body.consequence,
    risk: req.body.risk,
    owner: req.body.owner,
    mitigation: req.body.mitigation,
  };
  Users.addRisk(newRow)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res.status(500).json({ message: "could not get risks " + error.message });
    });
});
router.put("/risks", (req, res) => {
  const id = req.body.id;
  const changes = {
    // projectId: req.decodedToken.id,
    type: req.body.type,
    description: req.body.description,
    probability: req.body.probability,
    risk: req.body.risk,
    consequence: req.body.consequence,
    owner: req.body.owner,
    mitigation: req.body.mitigation,
  };

  Users.updateRisk(id, changes)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res.status(500).json({ message: "could not get risks " + error.message });
    });
});

// ----- TEMPLATES ----- //

router.get("/templates", (req, res) => {
  console.log(req.decodedToken.useTemplates);

  if (req.decodedToken.useTemplates || req.decodedToken.admin) {
    Users.getTemplates()
      .then((templates) => {
        console.log(templates);
        res.json(templates);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "could not get templates. " + error.message });
      });
  } else {
    res.json({ message: "access denied" });
  }
});

router.delete("/templates", (req, res) => {
  const id = req.body.id;
  Users.delTemplate(id)
    .then(() => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(500).json({
        message: `error deleting ${error.message}`,
      });
    });
});

router.post("/templates", (req, res) => {
  const newRow = {
    type: req.body.type,
    description: req.body.description,
    probability: req.body.probability,
    consequence: req.body.consequence,
    risk: req.body.risk,
    mitigation: req.body.mitigation,
  };
  Users.addTemplate(newRow)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res.status(500).json({ message: "could not get risks " + error.message });
    });
});

router.put("/templates", (req, res) => {
  const id = req.body.id;
  const changes = {
    type: req.body.type,
    description: req.body.description,
    probability: req.body.probability,
    consequence: req.body.consequence,
    risk: req.body.risk,
    mitigation: req.body.mitigation,
    ai: req.body.ai,
    dlt: req.body.dlt,
    man: req.body.man,
  };

  Users.updateTemplate(id, changes)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res.status(500).json({ message: "could not get risks " + error.message });
    });
});

module.exports = router;
