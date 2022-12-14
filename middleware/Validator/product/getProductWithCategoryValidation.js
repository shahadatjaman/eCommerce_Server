const { check, validationResult, param } = require("express-validator");

const productCategoryValidator = [
  check("category_id")
    .optional()
    .notEmpty()
    .withMessage("category_id must be provid!")
    .isMongoId()
    .withMessage("category_id must be valid"),
  check("minPrice")
    .optional()
    .notEmpty()
    .withMessage("min price is required!")
    .isNumeric()
    .withMessage("minPrice must be number"),
  check("maxPrice")
    .optional()
    .notEmpty()
    .withMessage("max price is required!")
    .isNumeric()
    .withMessage("maxPrice must be number"),
  param("from")
    .notEmpty()
    .withMessage("from(skip) must be provid!")
    .isNumeric()
    .withMessage("from must be number"),
  param("to")
    .notEmpty()
    .withMessage("to(size) must be provid!")
    .isNumeric()
    .withMessage("to(size) must be number"),
];

const productCategoryValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    return next();
  } else {
    return res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { productCategoryValidator, productCategoryValidatorHandler };
