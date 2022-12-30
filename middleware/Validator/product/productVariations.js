const { check, validationResult } = require("express-validator");

const variationValidator = [
  check("product_id")
    .notEmpty()
    .withMessage("Poroduct id must be provide")
    .isMongoId()
    .withMessage("Product id should be valid!")
    .trim(),
  check("variation_img")
    .notEmpty()
    .withMessage("Variation img is required!")
    .trim(),
];

const variationValidatorHandler = (req, res, next) => {
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
  variationValidator,
  variationValidatorHandler,
};
