const { check, validationResult } = require("express-validator");

const ratingValidator = [
  check("product_id")
    .notEmpty()
    .withMessage("product_id must be provid!")
    .isMongoId()
    .withMessage("product_id must be valid"),
  check("rating")
    .notEmpty()
    .withMessage("rating must be provide!")
    .isNumeric()
    .withMessage("rating must be number!"),
  check("text")
    .notEmpty()
    .withMessage("text must be provide!")
    .isString()
    .withMessage("text must be string!"),
];

const ratingValidatorHandler = (req, res, next) => {
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

module.exports = { ratingValidator, ratingValidatorHandler };
