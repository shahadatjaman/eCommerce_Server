const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
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
  createdAt: String,
});

module.exports = User = model("User", userSchema);
