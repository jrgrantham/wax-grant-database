const mongoose = require("mongoose");
// const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// function validateUser(user) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(50).required(),
//     email: Joi.string().min(3).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required(),
//     projectId: Joi.string(),
//     admin: Joi.boolean().required(),
//   });
//   return schema.validate(user);
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  userId: {
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
  projects: {
    type: Array,
  },
  admin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function (rememberMe) {
  const payload = {
    userId: this.userId,
    admin: this.admin,
    projectId: this.projectId,
    email: this.email,
    rememberMe,
  };
  const secret = config.get("jwtPrivateKey");
  const time = rememberMe ? "30d" : "1h";
  const options = { expiresIn: time };
  const result = jwt.sign(payload, secret, options);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
// module.exports.validate = validateUser;
