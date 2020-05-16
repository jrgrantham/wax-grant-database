const router = require("express").Router();
const Users = require("./users-models");

router.get("/risks", (req, res) => {
  console.log("working");

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
    res.json({message: 'access denied'})
  }
});

module.exports = router;
