const { Schema, model } = require("mongoose");

const securitySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  isChangeAblePass: {
    type: Boolean,
    required: true,
  },
  jwtCode: {
    type: String,
    required: true,
  },
});

module.exports = Security = model("SECURITIE", securitySchema);
