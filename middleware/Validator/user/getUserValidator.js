const { check, validationResult, param } = require("express-validator");

// Express validation
const getUserValidator = [
  param("user_id")
    .trim()
    .notEmpty()
    .withMessage("user id must be provid!")
    .isMongoId()
    .withMessage("user_id must be valid!"),
];

const getUserValidatorHandler = (req, res, next) => {
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
  getUserValidator,
  getUserValidatorHandler,
};
