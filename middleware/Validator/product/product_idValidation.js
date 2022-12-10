const { param, validationResult } = require("express-validator");

const productIdValidator = [
  param("product_id")
    .trim()
    .notEmpty()
    .withMessage("Product id must provid!")
    .isMongoId()
    .withMessage("product_id should be valid!"),
];

const productIdValidatorHandler = (req, res, next) => {
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
  productIdValidator,
  productIdValidatorHandler,
};
