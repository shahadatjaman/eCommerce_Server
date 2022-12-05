const { check, validationResult } = require("express-validator");

const delProductValidator = [
  check("product_id")
    .isMongoId()
    .withMessage("product_id should be valid!")
    .trim(),
];

const delPorductValidatorHandler = (req, res, next) => {
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
  delProductValidator,
  delPorductValidatorHandler,
};
