const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const loginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Enter a valid email!"),

  check("password").notEmpty().withMessage("Password is required!"),
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
