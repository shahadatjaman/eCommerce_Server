const { check, validationResult } = require("express-validator");

const orderValidation = [
  check("total")
    .trim()
    .isNumeric()
    .withMessage("Total price must be a integer number"),
  check("paid")
    .trim()
    .not()
    .isEmpty()
    .isBoolean()
    .withMessage("piad must be boolean required!"),
  check("currency")
    .trim()
    .not()
    .isEmpty()
    .isString()
    .withMessage("Currency must be string required!"),
];

const orderValidatorHandler = (req, res, next) => {
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
  orderValidation,
  orderValidatorHandler,
};
