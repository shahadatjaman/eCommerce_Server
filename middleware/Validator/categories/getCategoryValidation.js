const { check, validationResult, param } = require("express-validator");

const getCategoryValidator = [
  param("product_id")
    .trim()
    .notEmpty()
    .withMessage("Product id is required!")
    .isMongoId()
    .withMessage("Product id must be valid!"),
];

const getCategoriesValidatorHandler = (req, res, next) => {
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
  getCategoryValidator,
  getCategoriesValidatorHandler,
};
