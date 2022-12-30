const { check, validationResult, param } = require("express-validator");

// Express validation
const usernameValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email  must be provid!")
    .isString()
    .withMessage("Email must be string!"),
];

const usernameValidatorHandler = (req, res, next) => {
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
  usernameValidator,
  usernameValidatorHandler,
};
