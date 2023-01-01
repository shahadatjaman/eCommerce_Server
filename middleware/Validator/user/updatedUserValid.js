const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const updatedUserValidator = [
  check("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name is required!"),
  check("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name is required!"),
  check("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Invalid email address!"),
];

const updatedValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  updatedUserValidator,
  updatedValidatorHandler,
};
