const { check, validationResult } = require("express-validator");

const discountValidation = [
  check("discount_percent")
    .optional()
    .notEmpty()
    .withMessage("Discount percent is required!")
    .trim(),
];

const discountValidatorHandler = (req, res, next) => {
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
  discountValidation,
  discountValidatorHandler,
};
