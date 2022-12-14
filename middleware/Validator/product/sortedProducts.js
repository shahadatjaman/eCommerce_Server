const { validationResult, param } = require("express-validator");

const getSortedValidator = [
  param("key")
    .notEmpty()
    .withMessage("key(product key) must be provid!")
    .isString()
    .withMessage("Key must be String!"),
  param("value")
    .notEmpty()
    .withMessage("value(sorted by -1 or 1) must be provid!")
    .isNumeric()
    .withMessage("value must be Number!"),
  param("from")
    .notEmpty()
    .withMessage("'from'(skip) must be provid!")
    .isNumeric()
    .withMessage("'from' must be Number!"),
  param("to")
    .notEmpty()
    .withMessage("'to' (limit) must be provid!")
    .isNumeric()
    .withMessage("'to' must be Number!"),
];

const getSortedValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    return next();
  } else {
    return res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  getSortedValidator,
  getSortedValidatorHandler,
};
