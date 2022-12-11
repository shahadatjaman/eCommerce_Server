const { check, validationResult, param } = require("express-validator");

const getProductsValidator = [
  param("from")
    .notEmpty()
    .withMessage("from(skip) must be provid!")
    .isNumeric()
    .withMessage("from must be number"),
  param("to")
    .notEmpty()
    .withMessage("to(size) must be provid!")
    .isNumeric()
    .withMessage("to(size) must be number"),
];

const getProductsValidatorHandler = (req, res, next) => {
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

module.exports = { getProductsValidator, getProductsValidatorHandler };
