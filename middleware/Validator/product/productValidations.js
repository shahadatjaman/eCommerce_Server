const { check, validationResult } = require("express-validator");

const productValidator = [
  check("product_id")
    .isLength({ min: 1 })
    .withMessage("product_id is required!")
    .trim(),
  check("name")
    .isLength({ min: 4 })
    .withMessage("Product name is required!")
    .trim(),
  check("short_desc")
    .isLength({ min: 1 })
    .withMessage("short_desc is required!")
    .trim(),
  // check("long_desc")
  //   .isLength({ min: 1 })
  //   .withMessage("long_desc is required!")
  //   .trim(),
];

const productValidatorHandler = (req, res, next) => {
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
  productValidatorHandler,
  productValidator,
};
