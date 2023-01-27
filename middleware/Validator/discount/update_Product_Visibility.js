const { check, validationResult, param } = require("express-validator");

const updateProductVisibility = [
  check("products_id")
    .optional()
    .notEmpty()
    .withMessage("Products id (products_id) is required!")
    .isArray()
    .withMessage("Product id must be array!")
    .isMongoId()
    .withMessage("Product id must be valid mongo id!"),
  check("product_id")
    .optional()
    .notEmpty()
    .withMessage("Product id (product_id) is required!")
    .isMongoId()
    .withMessage("Product id must be valid mongo id!"),
  check("product_status")
    .notEmpty()
    .withMessage("Product visibility (product_status) is required!")
    .trim(),
];

const updateProductVisibilityValidatorHandler = (req, res, next) => {
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
  updateProductVisibility,
  updateProductVisibilityValidatorHandler,
};
