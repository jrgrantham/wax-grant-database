const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    projectId: Joi.string(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(user);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  projectId: {
    type: String,
    maxlength: 256,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    personId: this.id,
    isAdmin: this.isAdmin,
    projectId: this.projectId,
    email: this.email,
  };
  // const secret = process.env.SECRET;
  const secret = config.get("jwtPrivateKey");
  // let options;
  // if (publicComputer) options = { expiresIn: "3h" };
  // else options = { expiresIn: "30d" };

  const options = { expiresIn: "30d" };
  const result = jwt.sign(payload, secret, options);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validate = validateUser;