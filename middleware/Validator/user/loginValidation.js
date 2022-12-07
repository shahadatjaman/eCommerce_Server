const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const loginValidator = [
  check("username").trim().isEmpty().withMessage("must contain a number"),

  check("password").isEmpty().withMessage("Password is required!"),
];

const loginValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: {
        errors: mappedErrors,
      },
    });
  }
};

module.exports = {
  loginValidator,
  loginValidatorHandler,
};
