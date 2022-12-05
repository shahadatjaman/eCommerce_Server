const jwt = require("jsonwebtoken");

module.exports = (obj) => {
  const token = jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: "500h" });

  return token;
};
