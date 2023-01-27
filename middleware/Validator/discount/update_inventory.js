const { check, validationResult, param } = require("express-validator");

const updateProductInventory = [
  check("products_id")
    .notEmpty()
    .withMessage("Products id (products_id) is required!")
    .isArray()
    .withMessage("Product id must be array!")
    .isMongoId()
    .withMessage("Product id must be valid mongo id!"),
  check("amount_type")
    .optional()
    .notEmpty()
    .withMessage("Amount type (amount_type) is required!")
    .trim(),
  check("price")
    .optional()
    .notEmpty()
    .withMessage("Price percent is required!")
    .trim(),
];

const updateProductInventoryValidatorHandler = (req, res, next) => {
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
  updateProductInventory,
  updateProductInventoryValidatorHandler,
};
