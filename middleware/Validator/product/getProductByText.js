const { validationResult, param } = require("express-validator");

const getProductsByTextValidator = [
  param("name").notEmpty().withMessage("name(product name) must be provid!"),
];

const getProductsByTextValidatorHandler = (req, res, next) => {
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

module.exports = {
  getProductsByTextValidator,
  getProductsByTextValidatorHandler,
};
