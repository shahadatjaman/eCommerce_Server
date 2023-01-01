const { check, validationResult } = require("express-validator");

const ProductidValidator = [
  check("product_id")
    .isMongoId()
    .withMessage("Product id should be valid!")
    .trim(),
];

const productIDvalidationHandler = (req, res, next) => {
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
  ProductidValidator,
  productIDvalidationHandler,
};
