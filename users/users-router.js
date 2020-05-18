const router = require("express").Router();
const Users = require("./users-models");

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

router.get("/risks", (req, res) => {
  Users.findRisksByUserId(req.decodedToken.id)
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
  console.log(req);
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
    owner: req.body.owner,
    mitigation: req.body.mitigation,
  };
  // console.log(newRow);
  Users.addRisk(newRow)
    .then((risks) => {
      res.json(risks);
    })
    .catch((error) => {
      res.status(500).json({ message: "could not get risks " + error.message });
    });
});

router.get("/templates", (req, res) => {
  if (req.decodedToken.useTemplates) {
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

module.exports = router;
