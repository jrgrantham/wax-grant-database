const router = require("express").Router();
const Users = require("./users-models");

// ----- USER ----- //

router.get("/user", (req, res) => {
  Users.findUserById(req.decodedToken.id)
    .then((settings) => {
      delete settings.password;
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
    const userID = req.decodedToken.id;
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

router.get("/admin", (req, res) => {
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

// ----- RISKS ----- //

router.get("/risks", (req, res) => {
  Users.findRisksByUserId(req.decodedToken.id)
    .then((risks) => {
      console.log(risks);

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

router.post("/risks", (req, res) => {
  const newRow = {
    projectId: req.decodedToken.id,
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
    projectId: req.decodedToken.id,
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
