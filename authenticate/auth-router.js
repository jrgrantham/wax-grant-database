const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-models");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findUserBy({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // await db request for risks and templates, if allowed
        delete user.password;
        res.status(200).json({
          user: user.email,
          message: `Welcome back ${user.email}!!`,
          token: token,
          settings: user
        });
      } else {
        res.status(401).json({ message: "incorrect username or password" });
      }
    })
    .catch((error) => {
      res.status(500).json("verification error" + error.message);
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    admin: user.admin,
    useTemplates: user.useTemplates,
    exportSpreadsheet: user.exportSpreadsheet,
  };
  const options = {
    expiresIn: "30d",
  };
  const secret = process.env.SECRET;
  const result = jwt.sign(payload, secret, options);
  return result;
}

module.exports = router;