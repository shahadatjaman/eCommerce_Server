const { check, validationResult } = require("express-validator");

const quantityValidation = [
  check("quantity")
    .isLength({ min: 1 })
    .withMessage(" Product Quantity is required!")
    .trim(),
  check("weight")
    .isLength({ min: 1 })
    .withMessage(" Product weight is required!")
    .trim(),
];

const quantityValidatorHandler = (req, res, next) => {
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
  quantityValidation,
  quantityValidatorHandler,
};
