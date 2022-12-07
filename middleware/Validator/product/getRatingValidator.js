const { param, validationResult } = require("express-validator");

const getRatingValidator = [
  param("product_id")
    .trim()
    .isMongoId()
    .withMessage("product_id should be valid!"),
];

const getRatingValidatorHandler = (req, res, next) => {
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
  getRatingValidator,
  getRatingValidatorHandler,
};
