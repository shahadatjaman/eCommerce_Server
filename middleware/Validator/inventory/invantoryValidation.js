const { check, validationResult, param } = require("express-validator");

const quantityValidation = [
  param("product_id")
    .notEmpty()
    .withMessage("Prouct id is required!")
    .isMongoId()
    .withMessage("Product id must be valid"),
  check("quantity")
    .optional()
    .notEmpty()
    .withMessage(" Product Quantity is required!")
    .trim(),
  check("weight")
    .optional()
    .notEmpty()
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
