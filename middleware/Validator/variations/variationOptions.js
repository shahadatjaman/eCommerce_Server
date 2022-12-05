const { check, validationResult } = require("express-validator");

const variationOptionsValidator = [
  check("product_id")
    .isMongoId()
    .withMessage("Product id should be valid!")
    .trim(),
  check("product_variations_id")
    .isMongoId()
    .withMessage("Product variations id should be valid!")
    .trim(),
  check("variation_type")
    .isLength({ min: 1 })
    .withMessage("Variation options name is required!")
    .trim(),
  check("value")
    .isLength({ min: 1 })
    .withMessage("Variation value is required!")
    .trim(),
];

const variationOptionsValidatorHandler = (req, res, next) => {
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
  variationOptionsValidator,
  variationOptionsValidatorHandler,
};
