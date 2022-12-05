const { check, validationResult } = require("express-validator");

const tagValidator = [
  check("tag_name")
    .isLength({ min: 1 })
    .withMessage("Tag name is required!")
    .trim(),
  check("product_id")
    .isMongoId()
    .withMessage("Product id should be valid!")
    .trim(),
];

const tagValidatorHandler = (req, res, next) => {
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
  tagValidator,
  tagValidatorHandler,
};
