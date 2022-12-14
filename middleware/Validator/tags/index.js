const { param, validationResult } = require("express-validator");

const getTagsValidation = [
  param("from")
    .notEmpty()
    .withMessage("'from' is required!")
    .isNumeric()
    .withMessage("'from' must be number type"),
  param("to")
    .notEmpty()
    .withMessage("'to' is required!")
    .isNumeric()
    .withMessage("'to' must be number type"),
];

const getTagsValidatorHandler = (req, res, next) => {
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
  getTagsValidation,
  getTagsValidatorHandler,
};
