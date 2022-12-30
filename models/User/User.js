const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager", "staff"],
    default: "user",
  },
  code: {
    type: String,
  },
  createdAt: String,
});

module.exports = User = model("User", userSchema);
